import { WidgetClient } from '../core/client.js';
import { SwapPanel } from './component.js';
import { isBrowser } from '../../tools.js';
import eventsFactory from './events.js';

if (isBrowser()) {
  window.customElements.define('navi-swap-panel', SwapPanel);
}

export class SwapPanelClient extends WidgetClient<SwapPanel> {
  // show the swap panel
  public show() {
    if (!this.widget) {
      return;
    }
    this.widget.openState = 'on';
    this.events.emit('show', {});
  }

  // hide the swap panel
  public hide() {
    if (!this.widget) {
      return;
    }
    this.widget.openState = 'off';
    this.events.emit('hide', {});
  }

  // remove event listeners
  public destroy() {
    if (!this.widget) {
      return;
    }
    this.widget.removeEventListener('navi-swap-panel-close', this.onClose);
    this.widget.removeEventListener(
      'navi-swap-panel-click-connect',
      this.onClickConnect,
    );
    this.widget.removeEventListener(
      'navi-swap-panel-swap-success',
      this.onSwapSuccess,
    );
  }

  public async changeTheme(theme: string) {
    const res = await this.callApi('changeTheme', { theme });
    if (res) {
      this.widget?.setAttribute('theme', theme);
    }
    return res;
  }

  // set the user address
  public async setUserAddress(address: string) {
    const res = await this.callApi('setUserAddress', { address });
    return res as boolean;
  }

  // set the token swap from
  public async setTokenFrom(coinType: string) {
    const res = await this.callApi('setTokenFrom', { coinType });
    return res as boolean;
  }

  // set the token swap to
  public async setTokenTo(coinType: string) {
    const res = await this.callApi('setTokenTo', { coinType });
    return res as boolean;
  }

  // set the token amount
  public async setTokenFromAmount(amount: string) {
    const res = await this.callApi('setTokenFromAmount', { amount });
    return res as boolean;
  }

  public events: ReturnType<typeof eventsFactory>;

  private static instance: any = null;

  static getInstance(): SwapPanelClient {
    if (!SwapPanelClient.instance) {
      SwapPanelClient.instance = new SwapPanelClient();
    }
    return SwapPanelClient.instance;
  }

  private constructor() {
    super('navi-swap-panel');
    this.onClose = this.onClose.bind(this);
    this.onClickConnect = this.onClickConnect.bind(this);
    this.onSwapSuccess = this.onSwapSuccess.bind(this);
    this.events = eventsFactory();
    if (!this.widget) {
      return;
    }
    this.widget.addEventListener('navi-swap-panel-close', this.onClose);
    this.widget.addEventListener(
      'navi-swap-panel-click-connect',
      this.onClickConnect,
    );
    this.widget.addEventListener(
      'navi-swap-panel-swap-success',
      this.onSwapSuccess,
    );
    this.readyPromise.then(() => {
      this.events.emit('ready', {});
    });
  }

  private onClose() {
    this.hide();
  }

  private onClickConnect() {
    this.events.emit('clickConnect', {});
  }

  private onSwapSuccess(event: any) {
    this.events.emit('swapSuccess', event.detail);
  }
}
