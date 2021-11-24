import * as React from 'react'
import logo from './assets/logo.png'

export default function Header({
  login,
  logout,
  accountId,
  isSignedIn,
  childern,
}) {
  return (
    <>
      <header className="header">
        <div className="center-row row">
          <div className="six columns ">
            <div className="center-column">
              <img src={logo} width="64px" height="64px" alt="my logo" />
            </div>
          </div>

          <div className="three columns">
            <h4>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://explorer.testnet.near.org/accounts/${accountId}`}
              >
                {accountId}
              </a>
            </h4>
          </div>

          <div className="three columns text-end">
            {isSignedIn ? (
              <button className="button button-secondary" onClick={logout}>
                Logout
              </button>
            ) : (
              <button className="button" onClick={login}>
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {childern}
    </>
  )
}
