export type PlayerData = {
  orderNumber: number;
  passed: boolean;
  bid: number;
  lastBidProperty?: number;
  lastBidMoney?: number;
  isCurrentTurn: boolean;

  score?: number;
};

export type OpponentData = {
  nickname: string;
} & PlayerData;

export type Hand = {
  coins: number;
  properties: number[];
  money: number[];
  bidProperty?: number;
};

export type Table = {
  properties?: number[];
  money?: number[];
};

export type GamePhase = 'property' | 'money' | 'end';
export type CardType = 'property' | 'money';
