export type Wepon = {
  id: number;
  name: string;
  type: WeponType;
};

export type WeponListItem = {
  id: number;
  name: string;
};

export type WeponType = {
  id: number;
  name: string;
};

export type Stage = {
  id: number;
  name: string;
};

export type UdemaeType = "X" | "S+" | "S" | "A" | "B" | "C";
