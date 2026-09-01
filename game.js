
const $ = (id)=>document.getElementById(id);

let state = null;
let dialogueQueue = [];
let afterDialogue = null;

function freshState(){
  const chars = JSON.parse(JSON.stringify(GAME_DATA.characters));
  return {
    version:"0.1",
    year_week:1,
    month:4,
    week:1,
    partIndex:0,
    tutorialDone:false,
    characters:chars,
    viewed_events:[],
    flags:{},
    repeat_count:{}
  };
}

const parts = ["平日①","平日②","休日①","休日②"];

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  $(id).classList.add("active");
}

function saveGame(){
  localStorage.setItem("vn_v01_save",JSON.stringify(state));
  alert("セーブしました。");
}

function loadGame(){
  const raw = localStorage.getItem("vn_v01_save");
  if(!raw){ alert("セーブデータがありません。"); return; }
  state = JSON.parse(raw);
  showScreen("game-screen");
  refreshHeader();
  beginCurrentStep();
}

function refreshHeader(){
  $("date-label").textContent = `${state.month}月 第${state.week}週`;
  $("part-label").textContent = parts[state.partIndex] || "週末処理";
}

function setCharacter(id, expression="normal"){
  if(!id){
    $("character-card").classList.add("hidden");
    return;
  }
  const c = state.characters[id];
  $("character-card").classList.remove("hidden");
  $("character-avatar").textContent = c.short;
  $("character-name").textContent = c.name;
  $("character-state").textContent = `Lv${c.body_level} / ${expression}`;
}

function setBG(label){ $("background-label").textContent = label || ""; }

function queueDialogue(lines, callback){
  dialogueQueue = [...lines];
  afterDialogue = callback || null;
  $("choice-panel").classList.add("hidden");
  $("dialogue-box").classList.remove("hidden");
  nextDialogue();
}

function nextDialogue(){
  if(dialogueQueue.length===0){
    $("dialogue-box").classList.add("hidden");
    setCharacter(null);
    const cb = afterDialogue;
    afterDialogue = null;
    if(cb) cb();
    return;
  }
  const line = dialogueQueue.shift();
  $("speaker").textContent = line.speaker || "";
  $("dialogue-text").textContent = line.text || "";
  if(line.bg) setBG(line.bg);
  setCharacter(line.char || null, line.expression || "normal");
}

function showChoices(title, options){
  $("dialogue-box").classList.add("hidden");
  const panel = $("choice-panel");
  panel.innerHTML = "";
  panel.classList.remove("hidden");
  if(title){
    const div=document.createElement("div");
    div.style.gridColumn="1/-1";
    div.style.color="#cbd5e1";
    div.style.padding="4px 2px";
    div.textContent=title;
    panel.appendChild(div);
  }
  options.forEach(o=>{
    const b=document.createElement("button");
    b.textContent=o.label;
    b.onclick=()=>{ panel.classList.add("hidden"); o.action(); };
    panel.appendChild(b);
  });
}

function applyEffect(id, effect){
  const c=state.characters[id];
  if(!c) return;
  if(effect.affection) c.affection = Math.max(0,Math.min(100,c.affection + effect.affection));
  if(effect.body) c.body_points = Math.max(0,Math.min(100,c.body_points + effect.body));
  if(effect.food) c.food_habit = Math.max(0,Math.min(100,c.food_habit + effect.food));
  checkBodyLevel(id);
}

function levelFromPoints(p){
  if(p>=80) return 5;
  if(p>=60) return 4;
  if(p>=40) return 3;
  if(p>=20) return 2;
  return 1;
}

function checkBodyLevel(id){
  const c=state.characters[id];
  const lv=levelFromPoints(c.body_points);
  if(lv>c.max_body_level){
    c.body_level=lv;
    c.max_body_level=lv;
    if(lv===3){ c.diet_mode=true; c.diet_progress=Math.max(c.diet_progress,10); }
  } else {
    c.body_level=c.max_body_level;
  }
}

function markViewed(id){
  if(!state.viewed_events.includes(id)) state.viewed_events.push(id);
}

function beginCurrentStep(){
  refreshHeader();

  if(!state.tutorialDone){
    queueDialogue(GAME_DATA.tutorial,()=>{
      state.tutorialDone=true;
      markViewed("tutorial_start");
      chooseActionForPart();
    });
    return;
  }
  chooseActionForPart();
}

function chooseActionForPart(){
  if(state.partIndex<=1) showWeekdayMenu();
  else if(state.partIndex<=3) showHolidayMenu();
  else runWeekEnd();
}

function showWeekdayMenu(){
  setBG("放課後");
  showChoices("どこへ行く？",[
    {label:"教室",action:()=>visitLocation("classroom")},
    {label:"図書室",action:()=>visitLocation("library")},
    {label:"食堂",action:()=>visitLocation("cafeteria")},
    {label:"料理部",action:()=>visitLocation("cooking")}
  ]);
}

function visitLocation(key){
  const loc=GAME_DATA.locations[key];
  setBG(loc.label);
  const candidates=loc.candidates.filter(id=>id!=="kaori" || key==="cooking");
  showChoices(`${loc.label}：誰と過ごす？`,
    candidates.map(id=>({label:state.characters[id].name,action:()=>normalInteraction(id,key)}))
    .concat([{label:"一人で過ごす",action:()=>queueDialogue([{speaker:"主人公",text:`今日は${loc.label}で一人で過ごした。`,bg:loc.label}],finishPart)}])
  );
}

function normalInteraction(id,key){
  const c=state.characters[id];
  const base = [
    {speaker:c.name,char:id,expression:"normal",text:`${GAME_DATA.locations[key].label}で主人公と少し話すことになった。`,bg:GAME_DATA.locations[key].label},
    {speaker:"主人公",text:"せっかくだし、少し付き合うか。"}
  ];
  queueDialogue(base,()=>{
    showChoices("どうする？",[
      {label:"普通に一緒に過ごす",action:()=>{
        applyEffect(id,{affection:2,body:1,food:1});
        queueDialogue([{speaker:c.name,char:id,expression:"smile",text:"「まあ、悪くなかったかも」"}],finishPart);
      }},
      {label:"食べ物を勧める",action:()=>{
        applyEffect(id,{affection:3,body:3,food:2});
        queueDialogue([{speaker:c.name,char:id,expression:"surprised",text:"「え、まだ食べるの？」"},{speaker:"主人公",text:"たまにはいいだろ。"}],finishPart);
      }},
      {label:"早めに切り上げる",action:()=>{
        queueDialogue([{speaker:"主人公",text:"今日はこの辺で戻ることにした。"}],finishPart);
      }}
    ]);
  });
}

function showHolidayMenu(){
  setBG("休日");
  showChoices("休日をどう過ごす？",[
    {label:"誰かを誘う",action:showInviteMenu},
    {label:"一人で出かける",action:showSoloMenu},
    {label:"家で過ごす",action:()=>queueDialogue([{speaker:"主人公",text:"今日は家でゆっくり過ごした。",bg:"自宅"}],finishPart)}
  ]);
}

function showInviteMenu(){
  const ids=["misaki","yuina","hina","chisa","rin"];
  showChoices("誰を誘う？",ids.map(id=>({
    label:state.characters[id].name,
    action:()=>showDateLocation(id)
  })));
}

function showDateLocation(id){
  const dests=["公園","カフェ","ショッピング","映画"];
  showChoices("どこへ行く？",dests.map(dest=>({
    label:dest,
    action:()=>dateEvent(id,dest)
  })));
}

function dateEvent(id,dest){
  const c=state.characters[id];
  queueDialogue([
    {speaker:c.name,char:id,expression:"smile",text:`「${dest}、いいね。行こっか」`,bg:dest},
    {speaker:"主人公",text:`二人で${dest}へ出かけた。`}
  ],()=>{
    showChoices("デート中、どうする？",[
      {label:"会話を楽しむ",action:()=>{
        applyEffect(id,{affection:3,body:1});
        queueDialogue([{speaker:c.name,char:id,expression:"smile",text:"「今日は楽しかった。また行こうね」"}],finishPart);
      }},
      {label:"食べ歩きもする",action:()=>{
        applyEffect(id,{affection:4,body:4,food:3});
        queueDialogue([{speaker:c.name,char:id,expression:"surprised",text:"「結構食べたね……」"}],finishPart);
      }}
    ]);
  });
}

function showSoloMenu(){
  const entries=Object.entries(GAME_DATA.soloLocations);
  showChoices("一人でどこへ行く？",entries.map(([key,v])=>({
    label:v.label,
    action:()=>soloOuting(key)
  })));
}

function weightedPick(weights){
  const entries=Object.entries(weights);
  const total=entries.reduce((s,[,w])=>s+w,0);
  let r=Math.random()*total;
  for(const [id,w] of entries){ r-=w; if(r<=0) return id; }
  return entries[entries.length-1][0];
}

function soloOuting(key){
  const loc=GAME_DATA.soloLocations[key];
  setBG(loc.label);
  if(Math.random()<0.30){
    const id=weightedPick(loc.weights);
    const c=state.characters[id];
    applyEffect(id,{affection:1});
    queueDialogue([
      {speaker:"主人公",text:`一人で${loc.label}に来たところ――。`,bg:loc.label},
      {speaker:c.name,char:id,expression:"surprised",text:"「あれ？　こんなところで何してるの？」"},
      {speaker:"主人公",text:"偶然だな。少し一緒に回るか。"},
      {speaker:c.name,char:id,expression:"smile",text:"「うん、いいよ」"}
    ],finishPart);
  }else{
    queueDialogue([{speaker:"主人公",text:`今日は${loc.label}を一人で回った。`,bg:loc.label}],finishPart);
  }
}

function finishPart(){
  state.partIndex++;
  saveSilent();
  if(state.partIndex>=4){
    runWeekEnd();
  }else{
    refreshHeader();
    queueDialogue([{speaker:"",text:`次の行動へ進みます。` }],beginCurrentStep);
  }
}

function saveSilent(){ localStorage.setItem("vn_v01_save",JSON.stringify(state)); }

function runWeekEnd(){
  refreshHeader();
  // Tiny automatic weekly adjustment to prove the week-end system works.
  Object.entries(state.characters).forEach(([id,c])=>{
    if(id==="mirei") return;
    if(c.diet_mode && c.diet_progress>=60){
      c.body_points=Math.min(100,c.body_points+1);
    }
    checkBodyLevel(id);
  });

  queueDialogue([
    {speaker:"",text:"――今週の行動がすべて終了した。",bg:"週末"},
    {speaker:"",text:"週末処理：ステータス・体型Lv・イベント履歴を保存します。"},
    {speaker:"",text:"4月第2週へ進みます。"}
  ],()=>{
    state.year_week=2;
    state.week=2;
    state.partIndex=0;
    saveSilent();
    showScreen("ending-screen");
  });
}

function openStatus(){
  const ids=["misaki","yuina","hina","chisa","rin","kaori"];
  const rows = [
    `<div class="status-row header"><div>キャラ</div><div>好感度</div><div>Body</div><div>Lv</div><div>食習慣</div></div>`,
    ...ids.map(id=>{
      const c=state.characters[id];
      return `<div class="status-row"><div>${c.name}</div><div>${c.affection}</div><div>${c.body_points}</div><div>Lv${c.body_level}</div><div>${c.food_habit}</div></div>`;
    })
  ];
  $("status-table").innerHTML=rows.join("");
  $("status-screen").classList.add("active");
}

$("new-game-btn").onclick=()=>{
  state=freshState();
  showScreen("game-screen");
  refreshHeader();
  beginCurrentStep();
};
$("continue-btn").onclick=loadGame;
$("next-btn").onclick=nextDialogue;
$("save-btn").onclick=saveGame;
$("status-btn").onclick=openStatus;
$("close-status-btn").onclick=()=>$("status-screen").classList.remove("active");
$("title-btn").onclick=()=>{ saveSilent(); showScreen("title-screen"); };
$("restart-btn").onclick=()=>{
  localStorage.removeItem("vn_v01_save");
  state=freshState();
  showScreen("game-screen");
  refreshHeader();
  beginCurrentStep();
};
