import 'regenerator-runtime/runtime'
import React from 'react'
import './App.css'
import './index.css'
import meme from './assets/image.jpg'
import getConfig from './config'
import { initContract } from './utils'
import TransferPage from './Transfer'
import Header from './Header'

const { contractName } = getConfig('development')

export default function App() {
  const [
    { accountId, contract, walletConnection },
    setInitContract,
  ] = React.useState({})
  const [isSignedIn, setIsSignedIn] = React.useState(false)
  React.useEffect(() => {
    async function init() {
      const { accountId, contract, walletConnection } = await initContract()
      setInitContract({ accountId, contract, walletConnection })
      setIsSignedIn(walletConnection.isSignedIn())
    }
    init()
  }, [setInitContract, setIsSignedIn])

  function logout() {
    walletConnection.signOut()
    // reload page
    window.location.replace(window.location.origin + window.location.pathname)
  }

  function login() {
    walletConnection.requestSignIn(contractName)
  }

  // if not signed in, return early with sign-in prompt
  if (!isSignedIn) {
    return (
      <>
        <Header
          isSignedIn={isSignedIn}
          logout={logout}
          login={login}
          accountId={accountId}
        />
        <main>
          <div className="container">
            <div className="row center-column">
              <h2>Kittens Token</h2>
              <p>The coin that makes your date!</p>
              <div className="center-column">
                <p>Login to transfer tokens.</p>
                <button className="button button-primary" onClick={login}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }
  return (
    <>
      <Header
        isSignedIn={isSignedIn}
        logout={logout}
        login={login}
        accountId={accountId}
      />
      <TransferPage contract={contract} accountId={accountId} />
    </>
  )
}
