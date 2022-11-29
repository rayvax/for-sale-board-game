import { runProcedure } from '..';
import {
  GamePhase,
  Hand,
  OpponentData,
  PlayerData,
  Table,
} from '../../models/game';
import { GameStoreState } from '../../store/game/reducer';

export function startGame(token: string, roomCode: string): Promise<void> {
  return runProcedure<void>('startGame', {
    param1: token,
    param2: roomCode,
  });
}

type GameStateResponse = {
  RESULTS: [
    {
      nickname: [string];
      orderNumber: [number];
      passed: [number];
      bid: [number];
      lastBidProperty: [number | null];
      lastBidMoney: [number | null];
      turnEndsIn: [number | null];
    },
    {
      nickname: string[];
      orderNumber: number[];
      passed: number[];
      bid: number[];
      lastBidProperty: (number | null)[];
      lastBidMoney: (number | null)[];
      turnEndsIn: (number | null)[];
    },
    {
      handProperty: number[];
    },
    {
      handCoins: [number];
    },
    {
      bidProperty: [number];
    },
    {
      handValue: number[];
    },
    {
      tableProperty?: number[];
      tableMoney?: number[];
      nickname?: string[];
      score?: number[];
    },
    {},
  ];
};

function toGameStoreState(resp: GameStateResponse): GameStoreState {
  const { nickname: winnerNickname, score } = resp.RESULTS[6];

  const playerResp = resp.RESULTS[0];
  const playerWinnerIndex =
    winnerNickname?.findIndex((p) => p === playerResp.nickname[0]) ?? 0;
  const player: PlayerData = {
    orderNumber: playerResp.orderNumber[0],
    passed: playerResp.passed[0] === 1,
    bid: playerResp.bid[0],
    lastBidProperty: playerResp.lastBidProperty[0] ?? undefined,
    lastBidMoney: playerResp.lastBidMoney[0] ?? undefined,
    isCurrentTurn: playerResp.turnEndsIn[0] !== null,
    score: score && score[playerWinnerIndex],
  };

  const {
    nickname,
    orderNumber,
    passed,
    bid,
    lastBidProperty,
    lastBidMoney,
    turnEndsIn: apponentTurnEndsIn,
  } = resp.RESULTS[1];
  const opponents: OpponentData[] = nickname.map((nickname, i) => {
    const winnerIndex = winnerNickname?.findIndex((p) => p === nickname) ?? 0;
    return {
      nickname,
      orderNumber: orderNumber[i],
      passed: passed[i] === 1,
      bid: bid[i],
      lastBidProperty: lastBidProperty[i] ?? undefined,
      lastBidMoney: lastBidMoney[i] ?? undefined,
      isCurrentTurn: apponentTurnEndsIn[i] !== null,
      score: score && score[winnerIndex],
    };
  });

  const hand: Hand = {
    properties: resp.RESULTS[2].handProperty,
    coins: resp.RESULTS[3].handCoins[0],
    bidProperty: resp.RESULTS[4].bidProperty[0],
    money: resp.RESULTS[5].handValue,
  };

  const table: Table = {
    properties: resp.RESULTS[6].tableProperty,
    money: resp.RESULTS[6].tableMoney,
  };

  let gamePhase: GamePhase;
  if (table.properties) gamePhase = 'property';
  else if (table.money) gamePhase = 'money';
  else gamePhase = 'end';

  return {
    player,
    opponents,
    turnEndsIn:
      apponentTurnEndsIn.find((p) => p !== null) ?? playerResp.turnEndsIn[0],
    hand,
    table,
    gamePhase,
  };
}

export async function getGameState(
  token: string,
  roomCode: string,
): Promise<GameStoreState> {
  const resp = await runProcedure<GameStateResponse>('getGameState', {
    param1: token,
    param2: roomCode,
  });

  return toGameStoreState(resp);
}

export async function pass(token: string, roomCode: string): Promise<void> {
  return runProcedure<void>('pass', { param1: token, param2: roomCode });
}

export async function bidCoins(
  token: string,
  roomCode: string,
  bid: string,
): Promise<void> {
  return runProcedure<void>('bidCoins', {
    param1: token,
    param2: roomCode,
    param3: bid,
  });
}
