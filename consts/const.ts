import type { WeponType, WeponListItem, Stage, UdemaeType } from "~/types/type";

export const RuleTypes = {
  NAWABARI: 0,
  AREA: 1,
  YAGURA: 2,
  HOKO: 3,
  ASARI: 4,
} as const satisfies {
  [key: string]: number;
};

export const WeaponTypes = {
  SHOOTER: 0,
  ROLLER: 1,
  CHARGER: 2,
  SLOSHER: 3,
  SPINNER: 4,
  BLASTER: 5,
  BRUSH: 6,
  MANEUVER: 7,
  SHELTER: 8,
  STRINGER: 9,
  WIPER: 10,
} as const satisfies {
  [key: string]: number;
};

export const WeaponTypesList = {
  [WeaponTypes.SHOOTER]: "シューター",
  [WeaponTypes.ROLLER]: "ローラー",
  [WeaponTypes.CHARGER]: "チャージャー",
  [WeaponTypes.SLOSHER]: "スロッシャー",
  [WeaponTypes.SPINNER]: "スピナー",
  [WeaponTypes.BLASTER]: "ブラスター",
  [WeaponTypes.BRUSH]: "フデ",
  [WeaponTypes.MANEUVER]: "マニューバー",
  [WeaponTypes.SHELTER]: "シェルター",
  [WeaponTypes.STRINGER]: "ストリンガー",
  [WeaponTypes.WIPER]: "ワイパー",
} as const satisfies {
  [key: number]: string;
};

// TODO:ここはDBに値を持たせる
export const WeaponListByType: { [key: number]: WeponListItem[] } = {
  [WeaponTypes.SHOOTER]: [
    { id: 1, name: "スプラシューター" },
    { id: 2, name: "わかばシューター" },
    // 他のシューター系武器
  ],
  [WeaponTypes.ROLLER]: [
    { id: 3, name: "スプラローラー" },
    { id: 4, name: "カーボンローラー" },
    // 他のローラー系武器
  ],
  [WeaponTypes.CHARGER]: [
    { id: 5, name: "スプラチャージャー" },
    { id: 6, name: "スプラスコープ" },
    // 他のチャージャー系武器
  ],
  [WeaponTypes.SLOSHER]: [
    { id: 7, name: "ホットブラスター" },
    { id: 8, name: "ノヴァブラスター" },
    // 他のスロッシャー系武器
  ],
  [WeaponTypes.SPINNER]: [
    { id: 9, name: "スプラスピナー" },
    { id: 10, name: "バレルスピナー" },
    // 他のスピナー系武器
  ],
  [WeaponTypes.BLASTER]: [
    { id: 11, name: "Blaster" },
    { id: 12, name: "Range Blaster" },
    // 他のブラスター系武器
  ],
  [WeaponTypes.BRUSH]: [
    { id: 13, name: "Inkbrush" },
    { id: 14, name: "Octobrush" },
    // 他のフデ系武器
  ],
  [WeaponTypes.MANEUVER]: [
    { id: 15, name: "Splat Dualies" },
    { id: 16, name: "Dualie Squelchers" },
    // 他のマニューバー系武器
  ],
  [WeaponTypes.SHELTER]: [
    { id: 17, name: "Splat Brella" },
    { id: 18, name: "Tenta Brella" },
    // 他のシェルター系武器
  ],
  [WeaponTypes.STRINGER]: [
    { id: 19, name: "Stringer" },
    { id: 20, name: "Heavy Stringer" },
    // 他のストリンガー系武器
  ],
  [WeaponTypes.WIPER]: [
    { id: 21, name: "Wiper" },
    { id: 22, name: "Heavy Wiper" },
    // 他のワイパー系武器
  ],
};

// TODO: DBからとる
export const StageList: Stage[] = [
  { id: 1, name: "ユノハナ" },
  { id: 2, name: "キンメダイ" },
];

export const UdemaeList = [
  "X",
  "S+",
  "S",
  "A",
  "B",
  "C",
] as const satisfies UdemaeType[];
