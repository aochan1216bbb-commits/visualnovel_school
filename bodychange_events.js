const BODYCHANGE_SCRIPTS_V031 = {
  "misaki_bodychange_02": {
    "title": "引退後の違和感",
    "char": "misaki",
    "level": 2,
    "lines": [
      {
        "s": "神谷 美咲",
        "c": "misaki",
        "e": "surprised",
        "t": "「ねえ。これ、ちょっと縮んでない？」"
      },
      {
        "s": "主人公",
        "t": "美咲は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "神谷 美咲",
        "c": "misaki",
        "e": "surprised",
        "t": "「引退してからまだそんな経ってないんだけどな……」"
      }
    ],
    "choices": [
      {
        "text": "気のせいじゃないか？",
        "effects": {
          "affection": 1,
          "diet_progress": 0
        }
      },
      {
        "text": "運動量が減ったからかもな",
        "effects": {
          "affection": 2,
          "diet_progress": 2
        }
      },
      {
        "text": "もう少し気をつけた方がいいかもな",
        "effects": {
          "affection": 0,
          "diet_progress": 3
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "misaki_bodychange_03": {
    "title": "数字が笑えない",
    "char": "misaki",
    "level": 3,
    "lines": [
      {
        "s": "神谷 美咲",
        "c": "misaki",
        "e": "embarrassed",
        "t": "「……え、待って。これはさすがに笑えない」"
      },
      {
        "s": "主人公",
        "t": "美咲は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "神谷 美咲",
        "c": "misaki",
        "e": "embarrassed",
        "t": "「明日から走る。絶対戻す」"
      }
    ],
    "choices": [
      {
        "text": "まだ戻せるだろ",
        "effects": {
          "affection": 2,
          "diet_progress": 5
        }
      },
      {
        "text": "一緒に走るか？",
        "effects": {
          "affection": 3,
          "diet_progress": 8
        }
      },
      {
        "text": "やっと自覚したか",
        "effects": {
          "affection": -1,
          "diet_progress": 4
        }
      }
    ],
    "post": {
      "diet_mode": true
    }
  },
  "misaki_bodychange_04": {
    "title": "昔の写真",
    "char": "misaki",
    "level": 4,
    "lines": [
      {
        "s": "神谷 美咲",
        "c": "misaki",
        "e": "embarrassed",
        "t": "「これ去年の写真なんだけどさ」"
      },
      {
        "s": "主人公",
        "t": "美咲は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "神谷 美咲",
        "c": "misaki",
        "e": "embarrassed",
        "t": "「……並べると、結構違うな。今ちょっとへこんでる」"
      }
    ],
    "choices": [
      {
        "text": "今の美咲も悪くない",
        "effects": {
          "affection": 3,
          "diet_progress": 2
        }
      },
      {
        "text": "写真ほど気にしすぎるな",
        "effects": {
          "affection": 2,
          "diet_progress": 1
        }
      },
      {
        "text": "確かに結構変わったな",
        "effects": {
          "affection": -1,
          "diet_progress": 5
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "misaki_bodychange_05": {
    "title": "幼なじみに弱音",
    "char": "misaki",
    "level": 5,
    "lines": [
      {
        "s": "神谷 美咲",
        "c": "misaki",
        "e": "embarrassed",
        "t": "「……ちょっとだけ聞いて」"
      },
      {
        "s": "主人公",
        "t": "美咲は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "神谷 美咲",
        "c": "misaki",
        "e": "embarrassed",
        "t": "「戻すつもりだったんだけどさ。思ったより全然うまくいかなくて」"
      }
    ],
    "choices": [
      {
        "text": "無理しなくていい",
        "effects": {
          "affection": 4,
          "diet_progress": 2
        }
      },
      {
        "text": "一緒にできること考えるか",
        "effects": {
          "affection": 3,
          "diet_progress": 6
        }
      },
      {
        "text": "今さら焦っても仕方ないだろ",
        "effects": {
          "affection": -2,
          "diet_progress": 3
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "yuina_bodychange_02": {
    "title": "数字は正直",
    "char": "yuina",
    "level": 2,
    "lines": [
      {
        "s": "白石 結菜",
        "c": "yuina",
        "e": "surprised",
        "t": "「一応、毎週記録してるの」"
      },
      {
        "s": "主人公",
        "t": "結菜は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "白石 結菜",
        "c": "yuina",
        "e": "surprised",
        "t": "「……増えてる。誤差の範囲とは言いにくいわね」"
      }
    ],
    "choices": [
      {
        "text": "まだ誤差だろ",
        "effects": {
          "affection": 1,
          "diet_progress": 0
        }
      },
      {
        "text": "記録してるの偉いな",
        "effects": {
          "affection": 2,
          "diet_progress": 2
        }
      },
      {
        "text": "数字は正直だな",
        "effects": {
          "affection": 0,
          "diet_progress": 3
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "yuina_bodychange_03": {
    "title": "管理計画",
    "char": "yuina",
    "level": 3,
    "lines": [
      {
        "s": "白石 結菜",
        "c": "yuina",
        "e": "embarrassed",
        "t": "「食事、運動、睡眠時間。全部記録することにしたわ」"
      },
      {
        "s": "主人公",
        "t": "結菜は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "白石 結菜",
        "c": "yuina",
        "e": "embarrassed",
        "t": "「今までの管理が甘かったってことだから。今度は計画通りに戻す」"
      }
    ],
    "choices": [
      {
        "text": "一人で抱え込みすぎるな",
        "effects": {
          "affection": 3,
          "diet_progress": 5
        }
      },
      {
        "text": "計画、手伝おうか",
        "effects": {
          "affection": 4,
          "diet_progress": 7
        }
      },
      {
        "text": "そこまでやる必要あるか？",
        "effects": {
          "affection": -1,
          "diet_progress": 2
        }
      }
    ],
    "post": {
      "diet_mode": true
    }
  },
  "yuina_bodychange_04": {
    "title": "計画との差",
    "char": "yuina",
    "level": 4,
    "lines": [
      {
        "s": "白石 結菜",
        "c": "yuina",
        "e": "embarrassed",
        "t": "「おかしい……計画通りなら、もう少し戻っているはずなのに」"
      },
      {
        "s": "主人公",
        "t": "結菜は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "白石 結菜",
        "c": "yuina",
        "e": "embarrassed",
        "t": "「数字通りにいかないの、思ったより堪えるわね」"
      }
    ],
    "choices": [
      {
        "text": "完璧じゃなくていいだろ",
        "effects": {
          "affection": 4,
          "diet_progress": 2
        }
      },
      {
        "text": "やり方を変えてみるか",
        "effects": {
          "affection": 3,
          "diet_progress": 5
        }
      },
      {
        "text": "計画倒れだな",
        "effects": {
          "affection": -2,
          "diet_progress": 3
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "yuina_bodychange_05": {
    "title": "完璧じゃなくても",
    "char": "yuina",
    "level": 5,
    "lines": [
      {
        "s": "白石 結菜",
        "c": "yuina",
        "e": "smile",
        "t": "「前みたいに戻すことばかり考えてた」"
      },
      {
        "s": "主人公",
        "t": "結菜は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "白石 結菜",
        "c": "yuina",
        "e": "smile",
        "t": "「全部完璧に戻せないと駄目って考え方も違うのかもしれない」"
      }
    ],
    "choices": [
      {
        "text": "そのままでも十分だ",
        "effects": {
          "affection": 5,
          "diet_progress": 0
        }
      },
      {
        "text": "無理ない範囲で続けよう",
        "effects": {
          "affection": 3,
          "diet_progress": 4
        }
      },
      {
        "text": "まだ諦めるには早い",
        "effects": {
          "affection": 1,
          "diet_progress": 5
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "hina_bodychange_02": {
    "title": "写真で発覚",
    "char": "hina",
    "level": 2,
    "lines": [
      {
        "s": "夏目 陽菜",
        "c": "hina",
        "e": "surprised",
        "t": "「え、ちょっと待って。この写真なんか丸くない？」"
      },
      {
        "s": "主人公",
        "t": "陽菜は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "夏目 陽菜",
        "c": "hina",
        "e": "surprised",
        "t": "「いやいや、これは角度。絶対角度だから！」"
      }
    ],
    "choices": [
      {
        "text": "角度の問題だろ",
        "effects": {
          "affection": 1,
          "diet_progress": 0
        }
      },
      {
        "text": "ちょっとだけ丸くなったかもな",
        "effects": {
          "affection": 2,
          "diet_progress": 2
        }
      },
      {
        "text": "前よりはふっくらしたな",
        "effects": {
          "affection": 0,
          "diet_progress": 3
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "hina_bodychange_03": {
    "title": "さすがにヤバい",
    "char": "hina",
    "level": 3,
    "lines": [
      {
        "s": "夏目 陽菜",
        "c": "hina",
        "e": "embarrassed",
        "t": "「……え？ これ、前普通に着てたんだけど」"
      },
      {
        "s": "主人公",
        "t": "陽菜は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "夏目 陽菜",
        "c": "hina",
        "e": "embarrassed",
        "t": "「ちょっと待って。さすがにヤバいかも」"
      }
    ],
    "choices": [
      {
        "text": "まだ全然大丈夫だろ",
        "effects": {
          "affection": 2,
          "diet_progress": 2
        }
      },
      {
        "text": "少し気をつけるか",
        "effects": {
          "affection": 3,
          "diet_progress": 5
        }
      },
      {
        "text": "言っただろ",
        "effects": {
          "affection": -1,
          "diet_progress": 4
        }
      }
    ],
    "post": {
      "diet_mode": true
    }
  },
  "hina_bodychange_04": {
    "title": "笑ってたけど",
    "char": "hina",
    "level": 4,
    "lines": [
      {
        "s": "夏目 陽菜",
        "c": "hina",
        "e": "embarrassed",
        "t": "「前は凛のこと笑ってたんだけどなあ……」"
      },
      {
        "s": "主人公",
        "t": "陽菜は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "夏目 陽菜",
        "c": "hina",
        "e": "embarrassed",
        "t": "「最近、人のこと本当に言えなくなってきた」"
      }
    ],
    "choices": [
      {
        "text": "陽菜らしくていいけどな",
        "effects": {
          "affection": 3,
          "diet_progress": 1
        }
      },
      {
        "text": "一緒に頑張るか？",
        "effects": {
          "affection": 4,
          "diet_progress": 5
        }
      },
      {
        "text": "完全にブーメランだな",
        "effects": {
          "affection": -1,
          "diet_progress": 3
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "hina_bodychange_05": {
    "title": "写真比較",
    "char": "hina",
    "level": 5,
    "lines": [
      {
        "s": "夏目 陽菜",
        "c": "hina",
        "e": "embarrassed",
        "t": "「これ去年。で、こっちが今月」"
      },
      {
        "s": "主人公",
        "t": "陽菜は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "夏目 陽菜",
        "c": "hina",
        "e": "embarrassed",
        "t": "「……思ったより違うね。まあ、落ち込んでても仕方ないんだけどさ」"
      }
    ],
    "choices": [
      {
        "text": "今も十分可愛い",
        "effects": {
          "affection": 5,
          "diet_progress": 0
        }
      },
      {
        "text": "次どうするか考えよう",
        "effects": {
          "affection": 2,
          "diet_progress": 4
        }
      },
      {
        "text": "これは結構差があるな",
        "effects": {
          "affection": -2,
          "diet_progress": 4
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "chisa_bodychange_02": {
    "title": "小さな違和感",
    "char": "chisa",
    "level": 2,
    "lines": [
      {
        "s": "小宮 千紗",
        "c": "chisa",
        "e": "embarrassed",
        "t": "「……あれ」"
      },
      {
        "s": "主人公",
        "t": "千紗は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "小宮 千紗",
        "c": "chisa",
        "e": "embarrassed",
        "t": "「前より、少しだけ感じが違うかも」"
      }
    ],
    "choices": [
      {
        "text": "気にしすぎじゃないか",
        "effects": {
          "affection": 1,
          "diet_progress": 0
        }
      },
      {
        "text": "少しだけ変わったかもな",
        "effects": {
          "affection": 2,
          "diet_progress": 2
        }
      },
      {
        "text": "お菓子の影響かもな",
        "effects": {
          "affection": 0,
          "diet_progress": 3
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "chisa_bodychange_03": {
    "title": "お菓子封印",
    "char": "chisa",
    "level": 3,
    "lines": [
      {
        "s": "小宮 千紗",
        "c": "chisa",
        "e": "embarrassed",
        "t": "「これ、しばらく預かってて」"
      },
      {
        "s": "主人公",
        "t": "千紗は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "小宮 千紗",
        "c": "chisa",
        "e": "embarrassed",
        "t": "「家にあると食べちゃうから……しばらく封印する」"
      }
    ],
    "choices": [
      {
        "text": "無理しすぎるなよ",
        "effects": {
          "affection": 3,
          "diet_progress": 4
        }
      },
      {
        "text": "一緒に我慢するか",
        "effects": {
          "affection": 4,
          "diet_progress": 6
        }
      },
      {
        "text": "続かない気がする",
        "effects": {
          "affection": -1,
          "diet_progress": 2
        }
      }
    ],
    "post": {
      "diet_mode": true
    }
  },
  "chisa_bodychange_04": {
    "title": "鏡の前",
    "char": "chisa",
    "level": 4,
    "lines": [
      {
        "s": "小宮 千紗",
        "c": "chisa",
        "e": "embarrassed",
        "t": "「……鏡って、ちゃんと見ると分かるね」"
      },
      {
        "s": "主人公",
        "t": "千紗は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "小宮 千紗",
        "c": "chisa",
        "e": "embarrassed",
        "t": "「思ってたより、変わってた」"
      }
    ],
    "choices": [
      {
        "text": "見た目だけが全部じゃない",
        "effects": {
          "affection": 3,
          "diet_progress": 1
        }
      },
      {
        "text": "必要なら相談に乗る",
        "effects": {
          "affection": 4,
          "diet_progress": 5
        }
      },
      {
        "text": "思ったより変わってたな",
        "effects": {
          "affection": -1,
          "diet_progress": 4
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "chisa_bodychange_05": {
    "title": "相談",
    "char": "chisa",
    "level": 5,
    "lines": [
      {
        "s": "小宮 千紗",
        "c": "chisa",
        "e": "embarrassed",
        "t": "「……少し相談してもいい？」"
      },
      {
        "s": "主人公",
        "t": "千紗は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "小宮 千紗",
        "c": "chisa",
        "e": "embarrassed",
        "t": "「自分では気をつけてるつもりなんだけど、うまくいかなくて」"
      }
    ],
    "choices": [
      {
        "text": "話してくれてありがとう",
        "effects": {
          "affection": 5,
          "diet_progress": 2
        }
      },
      {
        "text": "一緒に少しずつやろう",
        "effects": {
          "affection": 4,
          "diet_progress": 5
        }
      },
      {
        "text": "気にしないのも手だろ",
        "effects": {
          "affection": 1,
          "diet_progress": 0
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "rin_bodychange_02": {
    "title": "誤差でしょ",
    "char": "rin",
    "level": 2,
    "lines": [
      {
        "s": "黒瀬 凛",
        "c": "rin",
        "e": "angry",
        "t": "「誤差でしょ」"
      },
      {
        "s": "主人公",
        "t": "凛は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "黒瀬 凛",
        "c": "rin",
        "e": "angry",
        "t": "「もう一回測れば戻るから」"
      }
    ],
    "choices": [
      {
        "text": "まあ誤差だろ",
        "effects": {
          "affection": 1,
          "diet_progress": 0
        }
      },
      {
        "text": "少し気にした方がいいんじゃないか",
        "effects": {
          "affection": 2,
          "diet_progress": 3
        }
      },
      {
        "text": "現実見ろよ",
        "effects": {
          "affection": -1,
          "diet_progress": 4
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "rin_bodychange_03": {
    "title": "練習着",
    "char": "rin",
    "level": 3,
    "lines": [
      {
        "s": "黒瀬 凛",
        "c": "rin",
        "e": "embarrassed",
        "t": "「……何これ。こんなにきつかった？」"
      },
      {
        "s": "主人公",
        "t": "凛は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "黒瀬 凛",
        "c": "rin",
        "e": "embarrassed",
        "t": "「見るな。今日から走るから」"
      }
    ],
    "choices": [
      {
        "text": "まだ戻せる",
        "effects": {
          "affection": 2,
          "diet_progress": 5
        }
      },
      {
        "text": "走るの付き合うぞ",
        "effects": {
          "affection": 3,
          "diet_progress": 8
        }
      },
      {
        "text": "さすがに無理あるな",
        "effects": {
          "affection": -1,
          "diet_progress": 4
        }
      }
    ],
    "post": {
      "diet_mode": true
    }
  },
  "rin_bodychange_04": {
    "title": "戻らないタイム",
    "char": "rin",
    "level": 4,
    "lines": [
      {
        "s": "黒瀬 凛",
        "c": "rin",
        "e": "angry",
        "t": "「……遅い」"
      },
      {
        "s": "主人公",
        "t": "凛は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "黒瀬 凛",
        "c": "rin",
        "e": "angry",
        "t": "「走ってるのに、前のタイムに全然戻らない。なんでこんなに動けなくなってんの」"
      }
    ],
    "choices": [
      {
        "text": "焦るほど空回りするぞ",
        "effects": {
          "affection": 3,
          "diet_progress": 3
        }
      },
      {
        "text": "やり方変えてみよう",
        "effects": {
          "affection": 4,
          "diet_progress": 6
        }
      },
      {
        "text": "前とは違うって認めろ",
        "effects": {
          "affection": -1,
          "diet_progress": 5
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "rin_bodychange_05": {
    "title": "認めたくなかった",
    "char": "rin",
    "level": 5,
    "lines": [
      {
        "s": "黒瀬 凛",
        "c": "rin",
        "e": "embarrassed",
        "t": "「……分かってた」"
      },
      {
        "s": "主人公",
        "t": "凛は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "黒瀬 凛",
        "c": "rin",
        "e": "embarrassed",
        "t": "「前みたいじゃないって。服も、走った感じも、全部。ただ認めたくなかっただけ」"
      }
    ],
    "choices": [
      {
        "text": "言えてよかったな",
        "effects": {
          "affection": 5,
          "diet_progress": 2
        }
      },
      {
        "text": "ここから立て直せばいい",
        "effects": {
          "affection": 4,
          "diet_progress": 5
        }
      },
      {
        "text": "もっと早く認めればよかったのに",
        "effects": {
          "affection": -2,
          "diet_progress": 3
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "kaori_bodychange_02": {
    "title": "ジャケット",
    "char": "kaori",
    "level": 2,
    "lines": [
      {
        "s": "月島 香織",
        "c": "kaori",
        "e": "smile",
        "t": "「あら？ クリーニングで縮んだのかしら」"
      },
      {
        "s": "主人公",
        "t": "香織は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "月島 香織",
        "c": "kaori",
        "e": "smile",
        "t": "「……なんて。さすがにそれは都合が良すぎるわね」"
      }
    ],
    "choices": [
      {
        "text": "仕事疲れじゃないですか",
        "effects": {
          "affection": 1,
          "diet_progress": 0
        }
      },
      {
        "text": "少しだけきつそうですね",
        "effects": {
          "affection": 2,
          "diet_progress": 2
        }
      },
      {
        "text": "食べすぎでは？",
        "effects": {
          "affection": 0,
          "diet_progress": 3
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "kaori_bodychange_03": {
    "title": "健康診断",
    "char": "kaori",
    "level": 3,
    "lines": [
      {
        "s": "月島 香織",
        "c": "kaori",
        "e": "embarrassed",
        "t": "「健康診断って、数字で現実を見せてくるのが嫌よね」"
      },
      {
        "s": "主人公",
        "t": "香織は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "月島 香織",
        "c": "kaori",
        "e": "embarrassed",
        "t": "「ちょっと生活見直さないと駄目かも」"
      }
    ],
    "choices": [
      {
        "text": "まだ大丈夫ですよ",
        "effects": {
          "affection": 2,
          "diet_progress": 2
        }
      },
      {
        "text": "少し生活見直しますか",
        "effects": {
          "affection": 3,
          "diet_progress": 5
        }
      },
      {
        "text": "先生でもショックなんですね",
        "effects": {
          "affection": 1,
          "diet_progress": 3
        }
      }
    ],
    "post": {
      "diet_mode": true
    }
  },
  "kaori_bodychange_04": {
    "title": "買い替え",
    "char": "kaori",
    "level": 4,
    "lines": [
      {
        "s": "月島 香織",
        "c": "kaori",
        "e": "embarrassed",
        "t": "「このジャケット、そろそろ限界かしら」"
      },
      {
        "s": "主人公",
        "t": "香織は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "月島 香織",
        "c": "kaori",
        "e": "embarrassed",
        "t": "「サイズを上げるのって、思ったより心理的に来るのね」"
      }
    ],
    "choices": [
      {
        "text": "似合う服探しましょう",
        "effects": {
          "affection": 4,
          "diet_progress": 1
        }
      },
      {
        "text": "無理せずサイズ変えるのも大事です",
        "effects": {
          "affection": 3,
          "diet_progress": 3
        }
      },
      {
        "text": "前の服は厳しそうですね",
        "effects": {
          "affection": 1,
          "diet_progress": 4
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "kaori_bodychange_05": {
    "title": "生活そのもの",
    "char": "kaori",
    "level": 5,
    "lines": [
      {
        "s": "月島 香織",
        "c": "kaori",
        "e": "embarrassed",
        "t": "「結局、服だけの問題じゃないのよね」"
      },
      {
        "s": "主人公",
        "t": "香織は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "月島 香織",
        "c": "kaori",
        "e": "embarrassed",
        "t": "「忙しいからって適当に済ませてた積み重ねかな。生活そのものを変えないと駄目ね」"
      }
    ],
    "choices": [
      {
        "text": "先生、頑張りすぎです",
        "effects": {
          "affection": 4,
          "diet_progress": 3
        }
      },
      {
        "text": "俺にできることあれば言ってください",
        "effects": {
          "affection": 5,
          "diet_progress": 5
        }
      },
      {
        "text": "今まで放置しすぎましたね",
        "effects": {
          "affection": -1,
          "diet_progress": 4
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "mirei_bodychange_02": {
    "title": "パンツの違和感",
    "char": "mirei",
    "level": 2,
    "lines": [
      {
        "s": "黒瀬 美玲",
        "c": "mirei",
        "e": "smile",
        "t": "「最近このパンツ、少しだけきついのよね」"
      },
      {
        "s": "主人公",
        "t": "美玲は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "黒瀬 美玲",
        "c": "mirei",
        "e": "smile",
        "t": "「座り仕事って怖いわ」"
      }
    ],
    "choices": [
      {
        "text": "気のせいかもしれませんよ",
        "effects": {
          "affection": 1,
          "diet_progress": 0
        }
      },
      {
        "text": "少しだけ変わったかも",
        "effects": {
          "affection": 2,
          "diet_progress": 2
        }
      },
      {
        "text": "外食多いんじゃないですか",
        "effects": {
          "affection": 0,
          "diet_progress": 3
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "mirei_bodychange_03": {
    "title": "ジム入会",
    "char": "mirei",
    "level": 3,
    "lines": [
      {
        "s": "黒瀬 美玲",
        "c": "mirei",
        "e": "embarrassed",
        "t": "「ジム、入ることにした」"
      },
      {
        "s": "主人公",
        "t": "美玲は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "黒瀬 美玲",
        "c": "mirei",
        "e": "embarrassed",
        "t": "「さすがに何もしないのはまずいかなって」"
      }
    ],
    "choices": [
      {
        "text": "続けられそうですか？",
        "effects": {
          "affection": 2,
          "diet_progress": 3
        }
      },
      {
        "text": "一歩踏み出すの偉いです",
        "effects": {
          "affection": 4,
          "diet_progress": 6
        }
      },
      {
        "text": "今さら感ありますね",
        "effects": {
          "affection": -1,
          "diet_progress": 2
        }
      }
    ],
    "post": {
      "diet_mode": true
    }
  },
  "mirei_bodychange_04": {
    "title": "幽霊会員",
    "char": "mirei",
    "level": 4,
    "lines": [
      {
        "s": "黒瀬 美玲",
        "c": "mirei",
        "e": "embarrassed",
        "t": "「ジム？ 入ってるわよ、一応」"
      },
      {
        "s": "主人公",
        "t": "美玲は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "黒瀬 美玲",
        "c": "mirei",
        "e": "embarrassed",
        "t": "「……今月まだ一回しか行ってないけど。仕事終わりって、思ったより無理ね」"
      }
    ],
    "choices": [
      {
        "text": "忙しいなら仕方ないです",
        "effects": {
          "affection": 2,
          "diet_progress": 1
        }
      },
      {
        "text": "無理ない方法に変えましょう",
        "effects": {
          "affection": 4,
          "diet_progress": 5
        }
      },
      {
        "text": "それはまずいですね",
        "effects": {
          "affection": 0,
          "diet_progress": 4
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  },
  "mirei_bodychange_05": {
    "title": "冗談では済まない",
    "char": "mirei",
    "level": 5,
    "lines": [
      {
        "s": "黒瀬 美玲",
        "c": "mirei",
        "e": "embarrassed",
        "t": "「前までは笑い話にしてたんだけどね」"
      },
      {
        "s": "主人公",
        "t": "美玲は自分の変化を意識しながら、こちらの反応をうかがっている。"
      },
      {
        "s": "黒瀬 美玲",
        "c": "mirei",
        "e": "embarrassed",
        "t": "「さすがに、そろそろ本気で考えないと駄目みたい。冗談で済ませてたら、ここまで来ちゃった」"
      }
    ],
    "choices": [
      {
        "text": "本気で向き合いましょう",
        "effects": {
          "affection": 4,
          "diet_progress": 6
        }
      },
      {
        "text": "一人でやらない方がいいです",
        "effects": {
          "affection": 5,
          "diet_progress": 4
        }
      },
      {
        "text": "やっと冗談じゃなくなりましたね",
        "effects": {
          "affection": -1,
          "diet_progress": 3
        }
      }
    ],
    "post": {
      "diet_mode": false
    }
  }
};
