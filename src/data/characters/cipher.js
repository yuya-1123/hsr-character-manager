export const cipher = {
  id: 'cipher',
  name: 'サフェル',
  element: '量子',
  path: '虚無',
  rarity: 5,
  type: 'デバッファー・サブアタッカー',
  voiceActor: '伊藤彩沙',
  description: '「詭術」の火種を持つ黄金裔。味方のダメージを記録し確定ダメージで放出するサポーター',

  // HoYoWiki検証済み基礎ステータス（Lv80昇格完了）
  baseStats: {
    level80: {
      hp: 931,
      atk: 640,
      def: 509,
      speed: 106
    }
  },

  // 推奨ステータス
  recommendedStats: {
    priority: ['速度170+', '効果命中', '攻撃力'],
    description: '速度170でダメージ記録値2倍。確定ダメージは攻撃力・会心無関係だが、デバフ命中率重要。',
    targets: {
      speed: 170, // 金のボテス発動条件
      hitRate: 67, // デバフ命中用
      atk: '適度に（サブ火力用）',
      critRate: '不要（確定ダメージ）',
      critDamage: '不要（確定ダメージ）'
    }
  },

  // 特殊システム
  specialMechanics: {
    customerState: {
      name: 'お得意様',
      description: '指定敵へのダメージを記録。味方攻撃時にサフェルの追加攻撃発動'
    },
    damageRecord: {
      description: 'お得意様への非確定ダメージの15%を記録。必殺技で確定ダメージとして放出'
    },
    goldBootes: {
      condition: '速度170以上',
      effect: 'ダメージ記録値が100%増加（実質2倍）'
    },
    constantDebuff: {
      name: '常時被ダメージ増加',
      value: '40%',
      description: '追加能力により戦闘開始時から敵全体に付与'
    }
  },

  // スキル概要
  skills: {
    basic: {
      name: 'あらら、見逃しちゃったね',
      description: '単体攻撃（攻撃力参照）'
    },
    skill: {
      name: 'へへっ！お宝いただき～！',
      description: '拡散攻撃＋虚弱デバフ＋お得意様変更'
    },
    ultimate: {
      name: 'そーれ、プレゼント！',
      description: '記録値に応じた確定ダメージ（3体まで分散）'
    },
    talent: {
      name: '常連さんいらっしゃい！',
      description: 'お得意様設定・ダメージ記録・追加攻撃'
    }
  },

  // 推奨装備
  recommendedEquipment: {
    lightCone: {
      best: '風に揺蕩う虚言（モチーフ）',
      alternatives: ['決意は汗のように輝く', 'また明日会おう']
    },
    relics: {
      main: '死水に潜る先駆者 4セット',
      alternatives: ['速度2セット×2（速度重視）']
    },
    ornament: {
      main: '海に沈んだルサカ',
      alternatives: ['タリア：王国の興亡史']
    }
  },

  // 運用方法
  usage: {
    role: 'デバッファー・記録型サブアタッカー',
    priority: '速度170確保 > 効果命中 > 攻撃力',
    playstyle: [
      '戦闘開始：自動でお得意様設定',
      'スキルでお得意様変更（強敵優先）',
      '通常攻撃中心（SP効率良好）',
      '記録値蓄積後に必殺技で一気放出'
    ]
  },

  // チーム編成例
  teamComposition: {
    bestPartners: [
      '黄泉（虚無シナジー）',
      '飛霄（単体高火力）',
      'キャストリス（高ダメージ記録）',
      '椒丘（デバフサポート）'
    ],
    roleInTeam: '汎用デバッファー・火力増幅',
    synergy: '高火力アタッカーの一定割合を確定ダメージ化。常時被ダメバフで全体火力底上げ'
  },

  // 育成優先度
  buildPriority: {
    '1': '速度170到達（記録値2倍）',
    '2': '効果命中67%（デバフ安定）',
    '3': '攻撃力（サブ火力用）',
    '4': '会心系は不要（確定ダメージ）'
  },

  // 凸効果
  eidolonPriority: {
    '1': 'ダメージ記録値1.5倍（大幅火力増）',
    '2': '被ダメージ増加30%追加',
    '6': '追加攻撃強化・記録値還元'
  },

  // 特記事項
  notes: [
    '確定ダメージのため防御無視・被ダメ軽減無視',
    '必殺技は敵数に関係なくダメージ無駄なし',
    'オート適性やや低（お得意様切り替え手動推奨）',
    '味方依存度高（アタッカー性能次第）'
  ]
};