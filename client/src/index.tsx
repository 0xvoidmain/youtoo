import React from 'react'
import config from 'configurations'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import { ThemeProvider } from '@mui/material/styles'
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { Coin98WalletAdapter, PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'

import theme from './theme/theme'
import App from './App'
import reportWebVitals from './reportWebVitals'

import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <ConnectionProvider endpoint={config.rpcEndpoint}>
          <WalletProvider wallets={[new PhantomWalletAdapter(), new Coin98WalletAdapter()]} autoConnect>
            <WalletDialogProvider>
              <App />
            </WalletDialogProvider>
          </WalletProvider>
        </ConnectionProvider>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
