import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { ThemeProvider } from '@mui/material/styles'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { Coin98WalletAdapter, PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'

import config from '~/configurations'
import { store } from '~/state'

import theme from './theme/theme'
import App from './App'
import reportWebVitals from './reportWebVitals'

import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <HashRouter>
            <ConnectionProvider endpoint={config.rpcEndpoint}>
              <WalletProvider wallets={[new PhantomWalletAdapter(), new Coin98WalletAdapter()]} autoConnect>
                <WalletDialogProvider>
                  <App />
                </WalletDialogProvider>
              </WalletProvider>
            </ConnectionProvider>
          </HashRouter>
        </Provider>
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
