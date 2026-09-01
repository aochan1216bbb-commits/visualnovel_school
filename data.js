
const GAME_DATA = {
  characters: {
    misaki:{name:"神谷 美咲", short:"美", affection:35, body_points:0, body_level:1, max_body_level:1, food_habit:20, diet_mode:false, diet_progress:0},
    yuina:{name:"白石 結菜", short:"結", affection:20, body_points:0, body_level:1, max_body_level:1, food_habit:15, diet_mode:false, diet_progress:0},
    hina:{name:"夏目 陽菜", short:"陽", affection:25, body_points:0, body_level:1, max_body_level:1, food_habit:30, diet_mode:false, diet_progress:0},
    chisa:{name:"小宮 千紗", short:"千", affection:15, body_points:0, body_level:1, max_body_level:1, food_habit:25, diet_mode:false, diet_progress:0},
    rin:{name:"黒瀬 凛", short:"凛", affection:5, body_points:0, body_level:1, max_body_level:1, food_habit:25, diet_mode:false, diet_progress:0},
    kaori:{name:"月島 香織", short:"香", affection:0, body_points:0, body_level:1, max_body_level:1, food_habit:30, diet_mode:false, diet_progress:0, route_unlocked:false},
    mirei:{name:"黒瀬 美玲", short:"玲", affection:0, body_points:0, body_level:1, max_body_level:1, food_habit:35, diet_mode:false, diet_progress:0, visible:false, route_unlocked:false}
  },

  tutorial: [
    {speaker:"主人公", text:"三年になって最初の放課後。料理部の部長として、今年も部室へ向かう。", bg:"廊下"},
    {speaker:"神谷 美咲", char:"misaki", expression:"normal", text:"あ、部長。材料そっち運んどいて。", bg:"料理部室"},
    {speaker:"主人公", text:"会って一発目から俺にやらせんな。"},
    {speaker:"夏目 陽菜", char:"hina", expression:"smile", text:"でも部長じゃん？　こういう時こそ働かないと。"},
    {speaker:"主人公", text:"部長って雑用係じゃねえからな？"},
    {speaker:"白石 結菜", char:"yuina", expression:"normal", text:"口論している時間が一番もったいないと思うけど。"},
    {speaker:"小宮 千紗", char:"chisa", expression:"smile", text:"……手伝うよ。半分持つ。"},
    {speaker:"黒瀬 凛", char:"rin", expression:"angry", text:"部長のくせに手際悪い。"},
    {speaker:"主人公", text:"毎回一言多いんだよ、お前。"},
    {speaker:"月島 香織", char:"kaori", expression:"smile", text:"じゃあお願いね、部長。私はちゃんと見守ってるから。"},
    {speaker:"主人公", text:"先生まで乗っかるなよ！"},
    {speaker:"", text:"――こうして、高校最後の一年が始まった。"}
  ],

  locations: {
    classroom:{
      label:"教室",
      candidates:["misaki","yuina","rin"],
      encounter:[
        {id:"misaki", text:"美咲が机に頬杖をついている。"},
        {id:"yuina", text:"結菜がノートを整理している。"},
        {id:"rin", text:"凛が窓際で参考書を読んでいる。"}
      ]
    },
    library:{
      label:"図書室",
      candidates:["yuina","chisa"],
      encounter:[
        {id:"yuina", text:"結菜が参考書を何冊も積んでいる。"},
        {id:"chisa", text:"千紗が静かに本を読んでいる。"}
      ]
    },
    cafeteria:{
      label:"食堂",
      candidates:["misaki","hina","rin"],
      encounter:[
        {id:"misaki", text:"美咲が唐揚げ定食の列に並んでいる。"},
        {id:"hina", text:"陽菜が新作デザートのポスターを見ている。"},
        {id:"rin", text:"凛が高たんぱくメニューを選んでいる。"}
      ]
    },
    cooking:{
      label:"料理部",
      candidates:["misaki","yuina","hina","chisa","rin","kaori"],
      encounter:[
        {id:"hina", text:"陽菜が試作品をつまみ食いしようとしている。"},
        {id:"chisa", text:"千紗がレシピ本を見比べている。"},
        {id:"rin", text:"凛が包丁を握って主人公を急かしている。"}
      ]
    }
  },

  soloLocations:{
    cafe:{label:"カフェ", weights:{hina:35,yuina:25,chisa:25,misaki:10,rin:5}},
    bookstore:{label:"本屋", weights:{chisa:45,yuina:30,hina:10,misaki:5,rin:10}},
    mall:{label:"ショッピングモール", weights:{hina:30,misaki:25,yuina:15,chisa:15,rin:15}},
    park:{label:"公園", weights:{misaki:30,rin:30,hina:20,yuina:10,chisa:10}}
  }
};
