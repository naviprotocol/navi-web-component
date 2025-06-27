import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import styles from './style.js';
import { serviceOrigin } from '../../config.js';

export class SwapPanel extends LitElement {
  @property({ type: String }) openState = 'off';

  @property({ type: String })
  theme = 'dark';

  @state() iframeLoaded = false;

  _iframe?: HTMLIFrameElement;

  firstUpdated() {
    this._iframe = this.shadowRoot?.getElementById(
      '#navi-swap-panel-iframe',
    ) as HTMLIFrameElement;
  }

  private _onIframeLoad() {
    this.iframeLoaded = true;
  }

  private _onClose() {
    const options = {
      detail: {},
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('navi-swap-panel-close', options));
  }

  static styles = styles;

  render() {
    return html`
      <div
        class="navi-swap-panel ${this.theme} ${this.openState === 'on'
          ? 'open'
          : ''}"
      >
        <div
          class="navi-swap-panel-sidebar"
          @click=${this._onClose}
          @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this._onClose()}
          tabindex="0"
        ></div>
        <div class="navi-swap-panel-content">
          <div class="navi-swap-panel-header">
            <div class="navi-swap-panel-header-title">Astros Swap</div>
            <svg
              width="30"
              height="30"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              tabindex="0"
              stroke="white"
              @click=${this._onClose}
              @keydown=${(e: KeyboardEvent) =>
                e.key === 'Enter' && this._onClose()}
              class="navi-swap-panel-header-close"
            >
              <rect
                x="1"
                y="1"
                width="38"
                height="38"
                rx="19"
                stroke="${this.theme === 'light' ? '#000' : '#fff'}"
                stroke-opacity="0.2"
                stroke-width="2"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                fill="${this.theme === 'light' ? '#000' : '#fff'}"
              />
            </svg>
          </div>
          <iframe
            @load=${this._onIframeLoad}
            id="navi-swap-panel-iframe"
            src="${serviceOrigin}/widget/swap"
            title="Swap"
            allow="clipboard-write self ${serviceOrigin}"
            class=${this.iframeLoaded ? 'loaded' : ''}
          ></iframe>
        </div>
      </div>
    `;
  }
}
