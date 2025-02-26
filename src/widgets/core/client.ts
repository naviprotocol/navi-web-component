import { Transaction } from '@mysten/sui/transactions';
import { isBrowser, getWidget } from '../../tools.js';
import * as api from './api.js';
import { serviceOrigin } from '../../config.js';

let callbackIndex = 0;

export class WidgetClient<T extends HTMLElement> {
  protected readonly name: string;

  protected readyPromise: Promise<boolean>;

  public async onSignTransaction(tx: Transaction): Promise<{
    signature: string;
    bytes: string;
  }> {
    console.log('onSignTransaction tx', tx);
    throw new Error(`${this.name}: onSignTransaction not implemented`);
  }

  constructor(name: string) {
    this.name = name;
    this.callbacks = {};
    this.readyPromise = new Promise(resolve => {
      this.callbacks.readyPromise = () => {
        resolve(true);
      };
    });
    if (!isBrowser()) {
      return;
    }
    this.init();
  }

  public onReady(cb: () => void) {
    this.callbacks.ready = cb;
  }

  protected widget?: T;

  protected iframe?: HTMLIFrameElement;

  protected callbacks: Record<string, (error: string, data: any) => void>;

  protected createWidget() {
    const widget = document.createElement(this.name);
    document.body.appendChild(widget);
    return widget as T;
  }

  protected sendMessage(message: any) {
    if (!this.iframe) {
      return;
    }
    this.iframe.contentWindow!.postMessage(message, serviceOrigin);
  }

  protected newCallback(cb: (error: string, data: any) => void) {
    callbackIndex += 1;
    const callbackId = `${this.name}-${callbackIndex}`;
    this.callbacks[callbackId] = cb;
    return callbackId;
  }

  protected callApi(method: string, data: any) {
    return this.readyPromise.then(
      () =>
        new Promise((resolve, reject) => {
          const callbackId = this.newCallback((error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
          this.sendMessage({
            type: 'api',
            method,
            data,
            callbackId,
          });
        }),
    );
  }

  private init() {
    let widget = getWidget(this.name) as T;
    if (!widget) {
      widget = this.createWidget();
    }
    this.widget = widget;

    setTimeout(() => {
      const iframe = widget.shadowRoot!.querySelector('iframe')!;
      this.iframe = iframe as any;
    }, 0);
    this.handleMessage = this.handleMessage.bind(this);

    window.addEventListener('message', this.handleMessage);
  }

  protected callbackResponse(callbackId: string, data: any, error: any) {
    if (!callbackId) {
      return;
    }
    if (error) {
      this.sendMessage({
        type: 'callback_resp',
        callbackId,
        error,
      });
    } else {
      this.sendMessage({
        type: 'callback_resp',
        callbackId,
        data,
      });
    }
  }

  protected async handleMessage(event: MessageEvent<any>) {
    if (event.origin !== serviceOrigin) {
      return;
    }
    const { type, callbackId, error, data, method } = event.data;
    if (type === 'callback_resp' && callbackId && this.callbacks[callbackId]) {
      this.callbacks[callbackId](error || '', data);
      delete this.callbacks[callbackId];
    } else if (type === 'navi-ready') {
      this.callbacks?.ready?.('', undefined);
      this.callbacks?.readyPromise?.('', undefined);
    } else if (type === 'api') {
      try {
        if (!(api as any)[method]) {
          throw new Error(`${method} not support`);
        }
        const result = await (api as any)[method](data, {
          client: this,
        });
        if (callbackId) {
          this.callbackResponse(callbackId, result, undefined);
        }
      } catch (e: any) {
        console.error(e);
        this.callbackResponse(callbackId, undefined, e.message);
      }
    }
  }
}
