export const castorice = {
    id: 'castorice',
    name: 'キャストリス',
    type: 'HP依存召喚アタッカー',
    element: '量子',
    path: '記憶',
    rarity: 5,
    voiceActor: '斎藤千和',
    stats: {
      '速度': { 
        value: '103以下', 
        priority: 'high', 
        note: '詩人4セット効果の発動条件' 
      },
      'HP': { 
        value: '8,000～9,000', 
        priority: 'high', 
        note: '死竜の攻撃力に直接影響' 
      },
      '会心率': { 
        value: '58%以上', 
        priority: 'high', 
        note: 'バフ込みで会心率100%到達が目標' 
      },
      '会心ダメージ': { 
        value: '200%以上', 
        priority: 'medium', 
        note: 'ダメージの最大化' 
      },
      '攻撃力': { 
        value: '不要', 
        priority: 'low', 
        note: 'HPを参照するため無関係' 
      },
      '防御力': { 
        value: '任意', 
        priority: 'low', 
        note: '生存性確保程度' 
      }
    },
    equipment: {
      '遺物セット': {
        recommended: '亡国の悲哀を詠う詩人 4セット',
        effect: '速度-10、会心率+8%、記憶の精霊強化',
        alternatives: ['HP系遺物との混合も検討可能']
      },
      'オーナメント': {
        recommended: '静謐な拾骨地 2セット',
        effect: 'HP+12%、速度+6%'
      },
      '光円錐': {
        signature: '永訣よ美しくあれ（モチーフ）',
        alternatives: ['過去と未来（配布選択肢）', '朝露にて（4星選択肢）']
      },
      'メインステータス': {
        '胴体': '会心ダメージ%',
        '脚部': 'HP%',
        'オーブ': 'HP%',
        '縄': 'HP%'
      }
    },
    team: {
      core: [
        { name: 'キャストリス', role: 'メインDPS', note: 'HP依存の召喚アタッカー', required: true },
        { name: '記憶主人公', role: 'サポート', note: '記憶キャラクター専用サポート', required: true }
      ],
      supports: [
        { name: 'ギャラガー', role: 'ヒーラー', note: 'HP管理とデバフ付与' },
        { name: 'ペラ', role: 'デバッファー', note: '防御力ダウンで死竜の火力上昇' }
      ]
    },
    specialMechanics: {
      '新蕾システム': '味方がHPを失うとチャージ、100%で死竜召喚',
      '死竜（記憶の精霊）': '圧倒的火力の召喚獣、全体攻撃4回→自爆',
      '月の繭': '所持しているだけで味方の戦闘不能を1回防ぐ'
    },
    playstyle: {
      rotation: [
        'HP調整でパーティ全体のHP管理',
        '意図的にHPを削って新蕾チャージ',
        '新蕾100%で死竜召喚',
        '死竜の4連撃→自爆で大ダメージ'
      ],
      tips: [
        '速度103以下の維持が最重要',
        'HPは高いほど死竜が強力に',
        '会心率58%以上でバフ込み100%を目指す',
        'HP管理が勝負の鍵、計画的にダメージを受ける'
      ]
    }
  };