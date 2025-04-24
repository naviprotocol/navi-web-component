import mitt, { Emitter } from 'mitt';

declare type CoinInfo = {
  address: string;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
  isSuggest: boolean;
  isVerify: boolean;
  category: string[];
};

export type SwapSuccessEvent = {
  digest: string;
  slippage: number;
  fromAmount: number;
  toAmount: number;
  fromCoin: CoinInfo;
  toCoin: CoinInfo;
};

export type ReadyEvent = {};

export type HideEvent = {};

export type ShowEvent = {};

export type ClickConnectEvent = {};

export type Events = {
  swapSuccess: SwapSuccessEvent;
  ready: ReadyEvent;
  hide: HideEvent;
  show: ShowEvent;
  clickConnect: ClickConnectEvent;
};

export default function eventsFactory(): Emitter<Events> {
  // @ts-ignore
  return mitt();
}
