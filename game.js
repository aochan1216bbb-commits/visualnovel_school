
let S=null,Q=[],CB=null; const $=x=>document.getElementById(x);
const BG_MAP={"料理部室":"cooking_room.webp","教室":"classroom.webp","図書室":"library.webp","食堂":"cafeteria.webp","料理部":"cooking_room.webp","公園":"park.webp","カフェ":"cafe.webp","本屋":"bookstore.webp","ショッピング":"mall.webp","映画":"movie.webp","自宅":"home.webp","カレンダー":"calendar.webp"};

// Image cache: once a file is checked, later sprite/expression changes reuse the browser cache
// instead of creating a fresh image probe every time.
const IMAGE_CACHE=new Map();
let spriteRequestToken=0,displayedSpriteChar=null;
const EXPRESSIONS=["normal","smile","angry","embarrassed","surprised"];

function exists(src,yes,no){
  const cached=IMAGE_CACHE.get(src);
  if(cached?.state==="ok"){yes&&yes(src);return}
  if(cached?.state==="ng"){no&&no();return}
  if(cached?.state==="loading"){
    cached.waiters.push([yes,no]);return;
  }
  const entry={state:"loading",waiters:[[yes,no]]};
  IMAGE_CACHE.set(src,entry);
  const i=new Image();
  i.decoding="async";
  i.onload=()=>{
    entry.state="ok";
    const waiters=entry.waiters.splice(0);
    waiters.forEach(([y])=>y&&y(src));
  };
  i.onerror=()=>{
    entry.state="ng";
    const waiters=entry.waiters.splice(0);
    waiters.forEach(([,n])=>n&&n());
  };
  i.src=src;
}
function isCached(src){return IMAGE_CACHE.get(src)?.state==="ok"}
function spriteSrc(id,lv,exp){return `assets/characters/${id}/lv${lv}/${exp}.webp`}
function preloadSpriteSet(id,lv){
  if(!S?.chars?.[id])return;
  EXPRESSIONS.forEach(exp=>exists(spriteSrc(id,lv,exp),()=>{},()=>{}));
}
function preloadVisibleSprites(){
  if(!S)return;
  ["misaki","yuina","hina","chisa","rin","kaori"].forEach(id=>preloadSpriteSet(id,S.chars[id].body_level));
  if(S.chars.mirei?.visible)preloadSpriteSet("mirei",S.chars.mirei.body_level);
}
function scheduleSpritePreload(){
  const run=()=>preloadVisibleSprites();
  if("requestIdleCallback" in window)requestIdleCallback(run,{timeout:1200});
  else setTimeout(run,80);
}

function bg(label){
  $("bg").textContent=label;
  let f=BG_MAP[label],im=$("bgimg");
  if(!f){im.classList.add("hidden");return}
  const src=`assets/backgrounds/${f}`;
  if(isCached(src)){im.src=src;im.classList.remove("hidden");return}
  exists(src,s=>{im.src=s;im.classList.remove("hidden")},()=>im.classList.add("hidden"));
}
function char(id,exp="normal"){
  let sp=$("sprite"),ph=$("placeholder");
  ph.classList.add("hidden");
  const token=++spriteRequestToken;
  if(!id){sp.classList.add("hidden");displayedSpriteChar=null;return}
  let c=S.chars[id],a=spriteSrc(id,c.body_level,exp),n=spriteSrc(id,c.body_level,"normal");
  const render=s=>{if(token!==spriteRequestToken)return;sp.src=s;sp.classList.remove("hidden");ph.classList.add("hidden");displayedSpriteChar=id};
  const fallback=()=>{if(token!==spriteRequestToken)return;sp.classList.add("hidden");ph.classList.remove("hidden");$("avatar").textContent=c.short;$("cname").textContent=c.name;$("cstate").textContent=`Lv${c.body_level} / ${exp}`;displayedSpriteChar=id};

  // Instant path for already-preloaded expressions.
  if(isCached(a)){render(a);return}
  // While a new expression is loading, keep the same character's previous sprite on-screen.
  if(displayedSpriteChar!==id)sp.classList.add("hidden");
  // If normal is already cached, show it immediately and replace it when the requested expression arrives.
  if(exp!=="normal"&&isCached(n))render(n);
  exists(a,render,()=>{
    if(exp!=="normal")exists(n,render,fallback);else fallback();
  });
}

function hideCG(){
  const im=$("cgimg");
  im.classList.add("hidden");
  im.onclick=null;
  im.removeAttribute("data-persistent");
}
// persistent=true: show the CG and immediately start the event; the caller hides it when the event ends.
// persistent=false: debug/preview mode; tap the CG itself to close it.
function showCG(eventId,cb,persistent=false){
  let im=$("cgimg"),src=`assets/cg/${eventId}.webp`;
  hideCG();
  exists(src,s=>{
    im.src=s;
    im.classList.remove("hidden");
    if(persistent){
      im.dataset.persistent="1";
      im.onclick=null;
      cb&&cb(true);
    }else{
      im.onclick=()=>{hideCG();cb&&cb(true)};
    }
  },()=>cb&&cb(false));
}
function fresh(){return{year_week:1,part:0,chars:JSON.parse(JSON.stringify(CHARACTERS)),viewed:[],event_repeat_count:{},event_last_week:{},flags:{},event_queue:[],daily_last_week:{}}}
function W(){return CALENDAR[S.year_week-1]} function ui(){$("date").textContent=`${W().month}月 第${W().week}週`;$("part").textContent=W().parts[S.part]||"週末"}
function show(id){$("title").classList.add("hidden");$("game").classList.add("hidden");$(id).classList.remove("hidden")}
function newGame(){S=fresh();show("game");ui();scheduleSpritePreload();talk([{s:"",t:"高校最後の一年が始まった。",bg:"料理部室"},{s:"神谷 美咲",c:"misaki",e:"normal",t:"「部長、材料そっち運んどいて」"},{s:"主人公",t:"会って一発目から俺にやらせんな。"}],menu)}
function save(){localStorage.setItem("vn021",JSON.stringify(S));alert("セーブしました")}
function continueGame(){let x=localStorage.getItem("vn021");if(!x)return alert("セーブなし");S=JSON.parse(x);ensureStateV04();show("game");ui();scheduleSpritePreload();menu()}
function talk(lines,cb){Q=[...lines];CB=cb;$("choices").innerHTML="";$("dialog").classList.remove("hidden");next()}
function next(){if(!Q.length){$("dialog").classList.add("hidden");char(null);let c=CB;CB=null;if(c)c();return}let x=Q.shift();$("speaker").textContent=x.s||"";$("text").textContent=x.t||"";if(x.bg)bg(x.bg);char(x.c,x.e)}
function choices(title,arr){$("dialog").classList.add("hidden");$("choices").innerHTML=`<div style="grid-column:1/-1">${title}</div>`;arr.forEach(o=>{let b=document.createElement("button");b.textContent=o[0];b.onclick=o[1];$("choices").appendChild(b)})}
function effect(id,a=0,b=0,f=0){let c=S.chars[id];c.affection=Math.min(100,c.affection+a);c.body_points=Math.min(100,c.body_points+b);c.food_habit=Math.min(100,c.food_habit+f);{const n=c.body_points>=80?5:c.body_points>=60?4:c.body_points>=40?3:c.body_points>=20?2:1,old=c.body_level;c.body_level=c.max_body_level=Math.max(c.max_body_level,n);if(c.body_level>old){preloadSpriteSet(id,c.body_level);bodyEvent(id)}}}
const locs={"教室":["misaki","yuina","rin"],"図書室":["yuina","chisa"],"食堂":["misaki","hina","rin"],"料理部":["misaki","yuina","hina","chisa","rin","kaori"]};
function menu(){ui();if(S.part>=W().parts.length)return weekend();evalPre();drainV03(()=>{W().parts[S.part].startsWith('平日')?weekday():holiday()})}
function weekday(){choices("どこへ行く？",Object.keys(locs).map(l=>[l,()=>visit(l)]))}
function visit(l){bg(l);choices(`${l}：誰と過ごす？`,locs[l].map(id=>[S.chars[id].name,()=>interact(id,l)]))}
function interact(id,l){let c=S.chars[id];talk([{s:c.name,c:id,e:"normal",t:`${l}で少し話すことになった。`,bg:l}],()=>choices("どうする？",[["普通に過ごす",()=>{effect(id,2,1,1);talk([{s:c.name,c:id,e:'smile',t:'「まあ、悪くなかったかも」'}],()=>{evalPost();drainV03(finish)})}],["食べ物を勧める",()=>{effect(id,3,3,2);talk([{s:c.name,c:id,e:'surprised',t:'「え、まだ食べるの？」'}],()=>{evalPost();drainV03(finish)})}]]))}
function holiday(){choices("休日をどう過ごす？",[["誰かを誘う",invite],["一人で出かける",solo],["家で過ごす",()=>talk([{t:"今日は家で過ごした。",bg:"自宅"}],finish)]])}
function invite(){choices("誰を誘う？",["misaki","yuina","hina","chisa","rin"].map(id=>[S.chars[id].name,()=>choices("行き先",["公園","カフェ","ショッピング","映画"].map(d=>[d,()=>talk([{s:S.chars[id].name,c:id,e:"smile",t:`「${d}、いいね」`,bg:d}],()=>{effect(id,3,2,1);finish()})]))]))}
function solo(){choices("一人でどこへ行く？",["カフェ","本屋","ショッピング","公園"].map(d=>[d,()=>talk([{t:`今日は${d}を一人で回った。`,bg:d}],finish)]))}
function finish(){S.part++;localStorage.setItem("vn021",JSON.stringify(S));menu()}
function weekend(){evalWeek();drainV03(()=>{if(S.year_week>=48)return showCG('graduation_ending',()=>talk([{t:'卒業式の日を迎えた。Ver0.4終了。',bg:'カレンダー'}],()=>{hideCG();show('title')}),true);S.year_week++;S.part=0;localStorage.setItem('vn021',JSON.stringify(S));talk([{t:`――${W().month}月 第${W().week}週へ進みます。`,bg:'カレンダー'}],menu)})}
function status(){let ids=["misaki","yuina","hina","chisa","rin","kaori"].concat(S.chars.mirei.visible?["mirei"]:[]);$("stats").innerHTML=ids.map(id=>{let c=S.chars[id];return `<div class=row><b>${c.name}</b>　好感度${c.affection} / Body${Math.round(c.body_points)} / Lv${c.body_level} / Diet${c.diet_progress||0}</div>`}).join("");$("modal").classList.remove("hidden")}
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
  debugEventOptions();
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
MireiVisible: ${S.chars.mirei.visible ? "true":"false"}
ViewedEvents: ${S.viewed.length}`;
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
  preloadSpriteSet(debugSelected(),lv);
  refreshDebugInfo();
}
function debugUnlockMirei(){
  S.chars.mirei.visible=true;
  preloadSpriteSet("mirei",S.chars.mirei.body_level);
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


function evMeta(id){return EVENT_MASTER_V03.find(e=>e.id===id)}
function evSeen(id){return S.viewed.includes(id)}
function evCan(id){const m=evMeta(id);if(!m)return false;const n=S.event_repeat_count[id]||0;if(m.once&&evSeen(id))return false;if(!m.once&&n>=(m.max_repeat||3))return false;const last=S.event_last_week[id]??-999;if(!m.once&&S.year_week-last<4)return false;return true}
function qEvent(id){if(evCan(id)&&!S.event_queue.includes(id))S.event_queue.push(id)}
function evMark(id){const m=evMeta(id);S.event_repeat_count[id]=(S.event_repeat_count[id]||0)+1;S.event_last_week[id]=S.year_week;if(m?.once&&!S.viewed.includes(id))S.viewed.push(id)}
function bodyEvent(id){let c=S.chars[id],eid=`${id}_bodychange_${String(c.body_level).padStart(2,'0')}`;if(evMeta(eid))qEvent(eid)}
function evalPre(){
  let h=S.chars.hina,r=S.chars.rin,m=S.chars.misaki,y=S.chars.yuina,ch=S.chars.chisa,k=S.chars.kaori,mi=S.chars.mirei;
  if(r.body_level>=3&&h.body_level<=2)qEvent('pair_hina_rin_01');
  if(evSeen('pair_hina_rin_01')&&h.body_level>=3&&r.body_level>=3)qEvent('pair_hina_rin_02');
  if(evSeen('pair_hina_rin_02')&&h.body_level>=4&&r.body_level>=4)qEvent('pair_hina_rin_03');

  if(m.body_level>=3&&r.body_level>=3)qEvent('pair_misaki_rin_01');
  if(evSeen('pair_misaki_rin_01')&&m.body_level>=3&&r.body_level>=3)qEvent('pair_misaki_rin_02');
  if(evSeen('pair_misaki_rin_02')&&m.body_level>=3&&r.body_level>=3)qEvent('pair_misaki_rin_03');
  if(evSeen('pair_misaki_rin_03')&&m.body_level>=4&&r.body_level>=4)qEvent('pair_misaki_rin_04');

  if(h.food_habit>=40)qEvent('pair_hina_yuina_01');
  if(evSeen('pair_hina_yuina_01')&&y.body_level>=3)qEvent('pair_hina_yuina_02');
  if(ch.body_level>=3&&h.body_level<=2)qEvent('pair_hina_chisa_01');
  if(evSeen('pair_hina_chisa_01')&&h.body_level>=3&&ch.body_level>=3)qEvent('pair_hina_chisa_02');
  if(y.body_level>=3&&ch.body_level>=3)qEvent('pair_yuina_chisa_01');
  if(r.body_level>=3&&ch.body_level>=3)qEvent('pair_rin_chisa_01');
  if(m.body_level>=2&&h.body_level>=2)qEvent('pair_misaki_hina_01');

  if(mi.visible&&r.body_level>=2&&mi.body_level<=2)qEvent('pair_rin_mirei_01');
  if(mi.visible&&evSeen('pair_rin_mirei_01')&&r.body_level>=3&&mi.body_level>=3)qEvent('pair_rin_mirei_02');
  if(mi.visible&&r.body_level>=4&&mi.body_level>=4)qEvent('pair_rin_mirei_03');

  if(k.body_level>=3&&[m,y,h,ch,r].some(c=>c.body_level>=3))qEvent('pair_kaori_students_01');
  if(k.body_level>=4)qEvent('pair_kaori_students_02');
}
function ensureStateV04(){
  if(!S.event_repeat_count)S.event_repeat_count={};
  if(!S.event_last_week)S.event_last_week={};
  if(!S.flags)S.flags={};
  if(!S.event_queue)S.event_queue=[];
  if(!S.daily_last_week)S.daily_last_week={};
}
function evalPost(){
  ensureStateV04();
  let eligible=EVENT_MASTER_V03.filter(e=>e.category==='body_daily').filter(m=>{
    let c=S.chars[m.char];
    if(!c||c.body_level<m.min_level||!evCan(m.id))return false;
    if(S.daily_last_week[m.char]===S.year_week)return false;
    if((m.id.includes('midnight')||m.id.includes('snack'))&&c.food_habit<50)return false;
    return true;
  });
  if(eligible.length&&Math.random()<.30){
    const picked=eligible[Math.floor(Math.random()*eligible.length)];
    qEvent(picked.id);
  }else if(Math.random()<.08){
    qEvent('special_09');
  }
}
function evalWeek(){
  let ss=['misaki','yuina','hina','chisa','rin'].map(id=>S.chars[id]),l2=ss.filter(c=>c.body_level>=2).length,l3=ss.filter(c=>c.body_level>=3).length;
  let yhcLv3=S.chars.yuina.body_level>=3&&S.chars.hina.body_level>=3&&S.chars.chisa.body_level>=3;
  let yhcLv4=S.chars.yuina.body_level>=4&&S.chars.hina.body_level>=4&&S.chars.chisa.body_level>=4;
  if(l2>=3)qEvent('group_body_01');
  if(yhcLv3)qEvent('group_body_02');
  if(evSeen('group_body_02')&&yhcLv3)qEvent('group_body_03');
  if(S.flags.diet_club)qEvent('group_body_04');
  if(evSeen('group_body_04')&&yhcLv4)qEvent('group_body_05');
  if(S.year_week>=33&&l3>=3)qEvent('group_body_06');
}
function evScript(id){
  const m=evMeta(id),c=m?.char?S.chars[m.char]:null;
  const custom={
    'pair_misaki_rin_02':[{t:'美咲と凛は、どちらが先に結果を出せるか張り合い始めた。'}],
    'pair_misaki_rin_03':[{t:'二人とも人目のない場所で、こっそりつまみ食いしていたことが発覚した。'}],
    'pair_misaki_rin_04':[{t:'ダイエット前より体型が変わってしまい、美咲と凛の間に気まずい空気が流れた。'}],
    'group_body_02':[{t:'陽菜、結菜、千紗の三人が、ダイエット同盟を結成した。'}],
    'pair_rin_mirei_02':[{t:'凛と美玲は、お互いの体型の変化を指摘し合って言い争いになった。'}]
  };
  if(custom[id])return custom[id];
  if(m?.category==='body_change')return[{s:c.name,c:m.char,e:m.min_level>=3?'embarrassed':'surprised',t:`「……Lv${m.min_level}になったの、さすがに分かる」`}];
  if(m?.category==='body_daily')return[{s:c.name,c:m.char,e:'embarrassed',t:`${m.title}。体型の変化を意識する出来事が起きた。`}];
  return[{t:`イベント「${m?.title||id}」が発生した。`}]
}

function applyDailyEffects(id,e){
  let c=S.chars[id];ensureDiet(c);
  let oldLv=c.body_level;
  c.affection=Math.max(0,Math.min(100,c.affection+(e.affection||0)));
  c.food_habit=Math.max(0,Math.min(100,c.food_habit+(e.food||0)));
  c.body_points=Math.max(0,Math.min(100,c.body_points+(e.body||0)));
  c.diet_progress=Math.max(0,Math.min(100,c.diet_progress+(e.diet_progress||0)));
  const n=c.body_points>=80?5:c.body_points>=60?4:c.body_points>=40?3:c.body_points>=20?2:1;
  if(n>c.max_body_level)c.max_body_level=n;
  c.body_level=Math.max(c.body_level,n);
  if(c.body_level>oldLv){preloadSpriteSet(id,c.body_level);bodyEvent(id)}
}
function runDailyEvent(id,cb){
  let ev=DAILY_EVENT_SCRIPTS_V04[id];
  if(!ev)return cb&&cb();
  ensureStateV04();
  S.daily_last_week[ev.char]=S.year_week;
  let finishEvent=()=>{localStorage.setItem('vn021',JSON.stringify(S));finishEventSafely(cb)};
  let afterLines=()=>{
    applyDailyEffects(ev.char,ev.effects||{});
    talk([{s:'',t:ev.result||'日常イベントが終了した。'}],finishEvent);
  };
  let m=evMeta(id);
  if(m?.cg)showCG(id,()=>talk(ev.lines,afterLines),true);
  else talk(ev.lines,afterLines);
}

function playV03(id,cb){let m=evMeta(id);if(!m){if(typeof cb==='function')cb();else if(S)menu();return;}evMark(id);if(id==='special_07'){S.chars.mirei.visible=true;preloadSpriteSet('mirei',S.chars.mirei.body_level)}if(id==='group_body_02')S.flags.diet_club=true;if(typeof BODYCHANGE_SCRIPTS_V031!=='undefined'&&BODYCHANGE_SCRIPTS_V031[id])return runBodyChange(id,cb);if(typeof DAILY_EVENT_SCRIPTS_V04!=='undefined'&&DAILY_EVENT_SCRIPTS_V04[id])return runDailyEvent(id,cb);let finishEvent=()=>finishEventSafely(cb),run=()=>talk(evScript(id),finishEvent);if(m.cg)showCG(id,run,true);else run()}
function drainV03(cb){if(!S.event_queue.length)return cb();let ids=[...new Set(S.event_queue)];S.event_queue=[];ids.sort((a,b)=>(evMeta(b)?.priority||0)-(evMeta(a)?.priority||0));let go=()=>ids.length?playV03(ids.shift(),go):cb();go()}
function resumeAfterDebugEvent(){
  hideCG();
  if(!S)return;
  // DEBUGからイベントを直接再生した場合も、現在のパートの選択画面へ必ず戻す。
  menu();
}
function finishEventSafely(cb){
  hideCG();
  if(typeof cb==='function')cb();
  else if(S)menu();
}
function debugEventOptions(){let d=$('debugEventId');if(!d)return;d.innerHTML='';EVENT_MASTER_V03.forEach(e=>{let o=document.createElement('option');o.value=e.id;o.textContent=`${e.id} | ${e.title}`;d.appendChild(o)})}
function debugFireEvent(){let id=$('debugEventId').value;closeDebug();if(typeof BODYCHANGE_SCRIPTS_V031!=='undefined'&&BODYCHANGE_SCRIPTS_V031[id]){if(!evSeen(id))evMark(id);runBodyChange(id,resumeAfterDebugEvent)}else if(typeof DAILY_EVENT_SCRIPTS_V04!=='undefined'&&DAILY_EVENT_SCRIPTS_V04[id]){if(!evSeen(id))evMark(id);runDailyEvent(id,resumeAfterDebugEvent)}else playV03(id,resumeAfterDebugEvent)}


function ensureDiet(c){if(typeof c.diet_mode!=="boolean")c.diet_mode=false;if(typeof c.diet_progress!=="number")c.diet_progress=0}
function applyBodyChoice(id,e){let c=S.chars[id];ensureDiet(c);c.affection=Math.max(0,Math.min(100,c.affection+(e.affection||0)));c.diet_progress=Math.max(0,Math.min(100,c.diet_progress+(e.diet_progress||0)))}
function runBodyChange(id,cb){let ev=BODYCHANGE_SCRIPTS_V031[id];if(!ev)return cb&&cb();let c=S.chars[ev.char];ensureDiet(c);let finishEvent=()=>finishEventSafely(cb);let after=()=>choices('どう返す？',ev.choices.map(ch=>[ch.text,()=>{applyBodyChoice(ev.char,ch.effects);if(ev.post?.diet_mode)c.diet_mode=true;localStorage.setItem('vn021',JSON.stringify(S));talk([{s:'',t:`${c.name}：好感度 ${c.affection} / Diet ${c.diet_progress}${c.diet_mode?' / ダイエット中':''}`}],finishEvent)}]));let m=evMeta(id);if(m?.cg)showCG(id,()=>talk(ev.lines,after),true);else talk(ev.lines,after)}


function debugMarkUnread(){
  const id=$('debugEventId').value;
  if(!id)return;
  S.viewed=S.viewed.filter(x=>x!==id);
  delete S.event_repeat_count[id];
  delete S.event_last_week[id];
  const m=evMeta(id);
  if(m?.category==='body_daily'&&m.char&&S.daily_last_week)delete S.daily_last_week[m.char];
  localStorage.setItem('vn021',JSON.stringify(S));
  alert(`${id} を未読状態に戻しました`);
  refreshDebugInfo();
}
function debugResetViewed(){
  if(!confirm('全イベントの既読・反復履歴をリセットしますか？'))return;
  S.viewed=[];S.event_repeat_count={};S.event_last_week={};S.event_queue=[];S.daily_last_week={};
  localStorage.setItem('vn021',JSON.stringify(S));
  alert('イベント既読履歴をリセットしました');
  refreshDebugInfo();
}
function debugCheckSelectedCG(){
  const id=$('debugEventId').value,m=evMeta(id);
  if(!id)return;
  if(!m?.cg){alert(`${id}\nEventMaster上はCGなしです`);return;}
  const src=`assets/cg/${id}.webp`;
  exists(src,()=>alert(`${id}\nCGファイルあり`),()=>alert(`${id}\nCG指定あり / ファイル未検出`));
}
async function debugCheckAllCG(){
  const list=EVENT_MASTER_V03.filter(e=>e.cg);
  let present=[],missing=[];
  await Promise.all(list.map(e=>new Promise(resolve=>{
    exists(`assets/cg/${e.id}.webp`,()=>{present.push(e.id);resolve()},()=>{missing.push(e.id);resolve()});
  })));
  alert(`CGチェック完了\nあり: ${present.length}\n未検出: ${missing.length}\n\n未検出:\n${missing.slice(0,30).join('\n')}${missing.length>30?'\n...':''}`);
}
