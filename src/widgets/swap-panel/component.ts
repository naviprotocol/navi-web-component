import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

export class SwapPanel extends LitElement {
  @property({ type: String }) openState = 'off';

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

  static styles = css`
    :host {
      /* display: block;
      padding: 25px;
      color: var(--navi-aggregator-text-color, #000); */
    }
    .navi-swap-panel {
      position: fixed;
      z-index: 9999;
      width: 400px;
      height: 100vh;
      right: 0;
      top: 0;
      transform: translateX(500px);
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .navi-swap-panel.open {
      transform: translateX(0);
    }
    .navi-swap-panel-content {
      height: 100%;
      position: relative;
      z-index: 20;
      padding: 20px 0px;
      display: flex;
      flex-direction: column;
      background-color: #000;
      border-left: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow:
        rgba(0, 0, 0, 0.24) 12px 16px 24px 0px,
        rgba(0, 0, 0, 0.24) 12px 8px 12px 0px,
        rgba(0, 0, 0, 0.32) 4px 4px 8px 0px;
    }
    .navi-swap-panel-header {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      padding: 0px 25px;
    }
    .navi-swap-panel-header-title {
      font-size: 26px;
      font-weight: 600;
      color: #fff;
    }
    .navi-swap-panel-header-close {
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .navi-swap-panel-header-close:hover {
      opacity: 0.7;
    }
    .navi-swap-panel-sidebar {
      padding-top: 90px;
      padding-right: 46px;
      padding-left: 16px;
      background-color: transparent;
      position: absolute;
      height: 100%;
      left: -64px;
      top: 0px;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      z-index: 10;
      border-radius: 30px 0px 0px 30px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .navi-swap-panel-sidebar:hover {
      cursor: pointer;
      transform: translateX(4px);
      background-color: rgba(0, 0, 0, 0.6);
    }
    #navi-swap-panel-iframe {
      width: 100%;
      border: 0;
      margin: 0;
      padding: 0;
      flex: 1 1 auto;
      opacity: 0;
    }
    #navi-swap-panel-iframe.loaded {
      opacity: 1;
    }

    @media (max-width: 400px) {
      .navi-swap-panel {
        width: 100vw;
      }
      .navi-swap-panel-sidebar {
        display: none;
      }
    }
  `;

  render() {
    return html`
      <div class="navi-swap-panel ${this.openState === 'on' ? 'open' : ''}">
        <div
          class="navi-swap-panel-sidebar"
          @click=${this._onClose}
          @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this._onClose()}
          tabindex="0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M13 17L18 12L13 7"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M6 17L11 12L6 7"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
        <div class="navi-swap-panel-content">
          <div class="navi-swap-panel-header">
            <div class="navi-swap-panel-header-title">NAVI Aggregator</div>
            <svg
              width="30"
              height="30"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              tabindex="0"
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
                stroke="white"
                stroke-opacity="0.2"
                stroke-width="2"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                fill="white"
              />
            </svg>
          </div>
          <iframe
            @load=${this._onIframeLoad}
            id="navi-swap-panel-iframe"
            src="https://dex-aggregator-next-q997xdz2u-chillso.vercel.app/widget/swap"
            title="Swap"
            class=${this.iframeLoaded ? 'loaded' : ''}
          ></iframe>
        </div>
      </div>
    `;
  }
}
