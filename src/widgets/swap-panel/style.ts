import { css } from 'lit';

export default css`
  :host {
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
  .light .navi-swap-panel-content {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
    background-color: #f5f5f5;
    box-shadow:
      rgba(245, 245, 245, 0.24) 12px 16px 24px 0px,
      rgba(245, 245, 245, 0.24) 12px 8px 12px 0px,
      rgba(245, 245, 245, 0.32) 4px 4px 8px 0px;
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
  .light .navi-swap-panel-header-title {
    color: #000;
  }
  .navi-swap-panel-header-close {
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .navi-swap-panel-header-close:hover {
    opacity: 0.7;
  }
  .navi-swap-panel-sidebar {
    width: calc(100vw - 400px);
    height: 100vh;
    position: absolute;
    right: 400px;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: none;
  }
  .navi-swap-panel.open .navi-swap-panel-sidebar {
    display: block;
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

  @media (max-width: 590px) {
    .navi-swap-panel {
      width: 100vw;
    }
    .navi-swap-panel-sidebar {
      display: none;
    }
  }
`;
