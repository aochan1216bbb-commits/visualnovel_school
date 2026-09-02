
let S=null,Q=[],CB=null; const $=x=>document.getElementById(x);
const BG_MAP={"料理部室":"cooking_room.webp","教室":"classroom.webp","図書室":"library.webp","食堂":"cafeteria.webp","料理部":"cooking_room.webp","公園":"park.webp","カフェ":"cafe.webp","本屋":"bookstore.webp","ショッピング":"mall.webp","映画":"movie.webp","自宅":"home.webp","カレンダー":"calendar.webp"};
function exists(src,yes,no){let i=new Image();i.onload=()=>yes(src);i.onerror=()=>no&&no();i.src=src}
function bg(label){$("bg").textContent=label;let f=BG_MAP[label],im=$("bgimg");im.classList.add("hidden");if(!f)return;exists(`assets/backgrounds/${f}`,s=>{im.src=s;im.classList.remove("hidden")},()=>{})}
function char(id,exp="normal"){let sp=$("sprite"),ph=$("placeholder");sp.classList.add("hidden");ph.classList.add("hidden");if(!id)return;let c=S.chars[id],a=`assets/characters/${id}/lv${c.body_level}/${exp}.webp`,n=`assets/characters/${id}/lv${c.body_level}/normal.webp`;exists(a,s=>{sp.src=s;sp.classList.remove("hidden")},()=>{if(exp!=="normal")exists(n,s=>{sp.src=s;sp.classList.remove("hidden")},()=>fallback());else fallback();function fallback(){ph.classList.remove("hidden");$("avatar").textContent=c.short;$("cname").textContent=c.name;$("cstate").textContent=`Lv${c.body_level} / ${exp}`}})}
function showCG(eventId,cb){let im=$("cgimg"),src=`assets/cg/${eventId}.webp`;im.classList.add("hidden");exists(src,s=>{im.src=s;im.classList.remove("hidden");im.onclick=()=>{im.classList.add("hidden");im.onclick=null;cb&&cb()}},()=>cb&&cb())}
function fresh(){return{year_week:1,part:0,chars:JSON.parse(JSON.stringify(CHARACTERS)),viewed:[]}}
function W(){return CALENDAR[S.year_week-1]} function ui(){$("date").textContent=`${W().month}月 第${W().week}週`;$("part").textContent=W().parts[S.part]||"週末"}
function show(id){$("title").classList.add("hidden");$("game").classList.add("hidden");$(id).classList.remove("hidden")}
function newGame(){S=fresh();show("game");ui();talk([{s:"",t:"高校最後の一年が始まった。",bg:"料理部室"},{s:"神谷 美咲",c:"misaki",e:"normal",t:"「部長、材料そっち運んどいて」"},{s:"主人公",t:"会って一発目から俺にやらせんな。"}],menu)}
function save(){localStorage.setItem("vn021",JSON.stringify(S));alert("セーブしました")}
function continueGame(){let x=localStorage.getItem("vn021");if(!x)return alert("セーブなし");S=JSON.parse(x);show("game");ui();menu()}
function talk(lines,cb){Q=[...lines];CB=cb;$("choices").innerHTML="";$("dialog").classList.remove("hidden");next()}
function next(){if(!Q.length){$("dialog").classList.add("hidden");char(null);let c=CB;CB=null;if(c)c();return}let x=Q.shift();$("speaker").textContent=x.s||"";$("text").textContent=x.t||"";if(x.bg)bg(x.bg);char(x.c,x.e)}
function choices(title,arr){$("dialog").classList.add("hidden");$("choices").innerHTML=`<div style="grid-column:1/-1">${title}</div>`;arr.forEach(o=>{let b=document.createElement("button");b.textContent=o[0];b.onclick=o[1];$("choices").appendChild(b)})}
function effect(id,a=0,b=0,f=0){let c=S.chars[id];c.affection=Math.min(100,c.affection+a);c.body_points=Math.min(100,c.body_points+b);c.food_habit=Math.min(100,c.food_habit+f);c.body_level=c.max_body_level=Math.max(c.max_body_level,c.body_points>=80?5:c.body_points>=60?4:c.body_points>=40?3:c.body_points>=20?2:1)}
const locs={"教室":["misaki","yuina","rin"],"図書室":["yuina","chisa"],"食堂":["misaki","hina","rin"],"料理部":["misaki","yuina","hina","chisa","rin","kaori"]};
function menu(){ui();if(S.part>=W().parts.length)return weekend();W().parts[S.part].startsWith("平日")?weekday():holiday()}
function weekday(){choices("どこへ行く？",Object.keys(locs).map(l=>[l,()=>visit(l)]))}
function visit(l){bg(l);choices(`${l}：誰と過ごす？`,locs[l].map(id=>[S.chars[id].name,()=>interact(id,l)]))}
function interact(id,l){let c=S.chars[id];talk([{s:c.name,c:id,e:"normal",t:`${l}で少し話すことになった。`,bg:l}],()=>choices("どうする？",[["普通に過ごす",()=>{effect(id,2,1,1);talk([{s:c.name,c:id,e:"smile",t:"「まあ、悪くなかったかも」"}],finish)}],["食べ物を勧める",()=>{effect(id,3,3,2);talk([{s:c.name,c:id,e:"surprised",t:"「え、まだ食べるの？」"}],finish)}]]))}
function holiday(){choices("休日をどう過ごす？",[["誰かを誘う",invite],["一人で出かける",solo],["家で過ごす",()=>talk([{t:"今日は家で過ごした。",bg:"自宅"}],finish)]])}
function invite(){choices("誰を誘う？",["misaki","yuina","hina","chisa","rin"].map(id=>[S.chars[id].name,()=>choices("行き先",["公園","カフェ","ショッピング","映画"].map(d=>[d,()=>talk([{s:S.chars[id].name,c:id,e:"smile",t:`「${d}、いいね」`,bg:d}],()=>{effect(id,3,2,1);finish()})]))]))}
function solo(){choices("一人でどこへ行く？",["カフェ","本屋","ショッピング","公園"].map(d=>[d,()=>talk([{t:`今日は${d}を一人で回った。`,bg:d}],finish)]))}
function finish(){S.part++;localStorage.setItem("vn021",JSON.stringify(S));menu()}
function weekend(){if(S.year_week>=48)return showCG("graduation_ending",()=>talk([{t:"卒業式の日を迎えた。Ver0.2.1終了。",bg:"カレンダー"}],()=>show("title")));S.year_week++;S.part=0;localStorage.setItem("vn021",JSON.stringify(S));talk([{t:`――${W().month}月 第${W().week}週へ進みます。`,bg:"カレンダー"}],menu)}
function status(){let ids=["misaki","yuina","hina","chisa","rin","kaori"].concat(S.chars.mirei.visible?["mirei"]:[]);$("stats").innerHTML=ids.map(id=>{let c=S.chars[id];return `<div class=row><b>${c.name}</b>　好感度${c.affection} / Body${Math.round(c.body_points)} / Lv${c.body_level}</div>`}).join("");$("modal").classList.remove("hidden")}
function closeStatus(){$("modal").classList.add("hidden")}


function openDebug(){
  if(!S){ alert("ゲーム開始後に使用できます"); return; }
  const sel=$("debugChar");
  sel.innerHTML="";
  Object.entries(S.chars).forEach(([id,c])=>{
    const o=document.createElement("option");
    o.value=id;
    o.textContent=c.name;
    sel.appendChild(o);
  });
  $("debugModal").classList.remove("hidden");
  refreshDebugInfo();
}
function closeDebug(){$("debugModal").classList.add("hidden")}
function debugSelected(){return $("debugChar").value}
function refreshDebugInfo(){
  if(!S)return;
  const id=debugSelected()||"misaki";
  const c=S.chars[id];
  const w=W();
  $("debugInfo").textContent=
`YearWeek: ${S.year_week}/48
Date: ${w.month}月 第${w.week}週
Part: ${S.part+1}/${w.parts.length}
Character: ${c.name}
Affection: ${c.affection}
BodyPoints: ${Math.round(c.body_points)}
BodyLevel: ${c.body_level}
FoodHabit: ${c.food_habit}
MireiVisible: ${S.chars.mirei.visible ? "true":"false"}`;
}
function debugNextPart(){
  S.part++;
  if(S.part>=W().parts.length){
    if(S.year_week<48){S.year_week++;S.part=0;}
    else S.part=W().parts.length-1;
  }
  localStorage.setItem("vn021",JSON.stringify(S));
  ui();
  refreshDebugInfo();
}
function debugNextWeek(){
  if(S.year_week<48)S.year_week++;
  S.part=0;
  localStorage.setItem("vn021",JSON.stringify(S));
  ui();
  refreshDebugInfo();
}
function debugPrevWeek(){
  if(S.year_week>1)S.year_week--;
  S.part=0;
  localStorage.setItem("vn021",JSON.stringify(S));
  ui();
  refreshDebugInfo();
}
function debugJumpWeek(){
  const v=Number(prompt("1〜48の週番号を入力",S.year_week));
  if(!Number.isInteger(v)||v<1||v>48)return;
  S.year_week=v;
  S.part=0;
  localStorage.setItem("vn021",JSON.stringify(S));
  ui();
  refreshDebugInfo();
}
function debugAffection(delta){
  const c=S.chars[debugSelected()];
  c.affection=Math.max(0,Math.min(100,c.affection+delta));
  refreshDebugInfo();
}
function debugFood(delta){
  const c=S.chars[debugSelected()];
  c.food_habit=Math.max(0,Math.min(100,c.food_habit+delta));
  refreshDebugInfo();
}
function debugSetLevel(lv){
  const c=S.chars[debugSelected()];
  const pts={1:0,2:20,3:40,4:60,5:80}[lv];
  c.body_points=pts;
  c.body_level=lv;
  c.max_body_level=Math.max(c.max_body_level,lv);
  refreshDebugInfo();
}
function debugUnlockMirei(){
  S.chars.mirei.visible=true;
  alert("美玲を解放しました");
  refreshDebugInfo();
}
function debugTestSprite(){
  const id=debugSelected();
  char(id,"normal");
  closeDebug();
}
function debugTestCG(){
  const id=$("debugCgId").value.trim();
  if(!id){alert("event_idを入力してください");return;}
  closeDebug();
  showCG(id,()=>{});
}
function debugSave(){
  localStorage.setItem("vn021",JSON.stringify(S));
  alert("現在状態を保存しました");
}
function debugResetSave(){
  if(!confirm("セーブデータを初期化しますか？"))return;
  localStorage.removeItem("vn021");
  alert("セーブを削除しました");
}
document.addEventListener("change",e=>{
  if(e.target && e.target.id==="debugChar")refreshDebugInfo();
});
