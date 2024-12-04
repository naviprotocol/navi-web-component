# Navi Web Component


## Installation

```bash
npm i navi-web-component
```

## Usage

```javascript
import { SwapPanelClient } from 'navi-web-component'

const swapPanelClient = SwapPanelClient.getInstance()

// Developers need to register the onSignTransaction method for transaction signing
swapPanelClient.onSignTransaction = async (txb) => {
  // run sign transaction logic in your app
  // after signed, return the signature and bytes
  const resp = await signTransaction({
    transaction: txb,
  })
  return {
    signature: resp.signature,
    bytes: resp.bytes,
  }
}

// set user address
swapPanelClient.setUserAddress('0x1234567890123456789012345678901234567890')

// show swap panel
swapPanelClient.show()

// set token swap from
swapPanelClient.setTokenFrom(
'0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX')

// set token swap to
swapPanelClient.setTokenTo('0x02::sui::SUI')

// set token swap from amount
swapPanelClient.setTokenFromAmount('1000')

// listen ready event
// this event will be triggered when the swap panel is ready
swapPanelClient.events.on('ready', () => {
  console.log('ready')
})

// listen click connect event
// this event will be triggered when the connect button is clicked
swapPanelClient.events.on('clickConnect', () => {
  // run connect wallet logic in your app
  // after connected, set user address in swap panel
  swapPanelClient.setUserAddress('0x1234567890123456789012345678901234567890')
})

// listen swap success event
// this event will be triggered when the swap is successful
swapPanelClient.events.on('swapSuccess', (data) => {
  console.log(data)
})

// listen hide event
// this event will be triggered when the swap panel is hidden
swapPanelClient.events.on('hide', () => {
  console.log('hide')
})

// listen show event
// this event will be triggered when the swap panel is shown
swapPanelClient.events.on('show', () => {
  console.log('show')
})

// hide swap panel
swapPanelClient.hide()

// change theme
swapPanelClient.changeTheme('dark')
swapPanelClient.changeTheme('light')

// set service fee
// max fee is 0.01
swapPanelClient.setServiceFee({ fee: 0.01, receiverAddress: '0x1234567890123456789012345678901234567890' })

```
