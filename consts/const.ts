export const RuleTypes = {
  NAWABARI: 0,
  AREA: 1,
  YAGURA: 2,
  HOKO: 3,
  ASARI: 4,
} as const satisfies {
  [key: string]: number;
};
