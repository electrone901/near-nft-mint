import * as React from 'react'
import { BOATLOAD_OF_GAS, ONE_YOCTO_NEAR } from './utils'
import Big from 'big.js'

export default function TransferPage({ accountId, contract }) {
  const [nearAddress, setNearAddress] = React.useState('')
  const [amount, setAmount] = React.useState(0)
  const [userBalance, setUserBalance] = React.useState(0)
  const [storageBalance, setStorageBalance] = React.useState(null)
  React.useEffect(() => {
    const getStorageDeposit = async () => {
      const storage = await contract.storage_balance_of({
        account_id: accountId,
      })
      setStorageBalance(storage)
    }
    const getBalance = async () => {
      const balance = await contract.ft_balance_of({
        account_id: accountId,
      })
      setUserBalance(balance)
    }
    console.log(contract)
    getBalance()
    getStorageDeposit()
  }, [accountId, setUserBalance, contract])

  async function depositStorage(to) {
    if (storageBalance == null) {
      await contract.storage_deposit(
        { account_id: to },
        '200000000000000',
        Big(0.00125)
          .times(10 ** 24)
          .add(ONE_YOCTO_NEAR)
          .toFixed(),
      )
    }
  }
  async function transferDino(to, amount) {
    if (storageBalance == null) {
      await depositStorage(to)
    } else {
      await contract.send_tokens(
        {
          receiver_id: to,
          amount,
        },
        '200000000000000',
        Big(0.00125)
          .times(10 ** 24)
          .add(ONE_YOCTO_NEAR)
          .toFixed(),
      )
    }
  }

  function onSubmit(e) {
    e.preventDefault()
    transferDino(nearAddress, amount)
  }

  async function buyDino(to) {
    if (storageBalance == null) {
      await depositStorage(to)
    } else {
      await contract.buy_tokens(
        {
          account_id: accountId,
          amount: amount,
        },
        BOATLOAD_OF_GAS,
        ONE_YOCTO_NEAR,
      )
    }
  }
  async function onBuySubmit(e) {
    e.preventDefault()
    await buyDino(accountId)
  }

  function onAddressChange(e) {
    setNearAddress(e.target.value)
  }

  function onAmountChange(e) {
    setAmount(e.target.value)
  }

  return (
    <main className="container">
      <div className="jumbotron-mg pt-3">
        <div className="container push-spaces">
          Transfer Kittens tokens to you friends and make their day better.
        </div>
      </div>
      <div className="transfer-main text-center">
        <div className="transfer-card">
          <h1>Transfer Kittens Tokens </h1>
          <h6>Your balance: {userBalance} Kittens</h6>
          <form onSubmit={onSubmit} className="transfer-form">
            <div className="row">
              <label htmlFor="exampleEmailInput">Enter receiver address.</label>
              <input
                onChange={onAddressChange}
                className="u-full-width"
                name="amount"
                type="text"
                placeholder="username.near"
              />
            </div>
            <div className="row">
              <label htmlFor="exampleEmailInput">
                Kittens tokens transfer amount:
              </label>
              <input
                onChange={onAmountChange}
                className="u-full-width"
                name="amount"
                type="number"
                placeholder="1"
              />
            </div>
            <br />
            <div className="row center-row">
              <input
                className="button-primary"
                type="submit"
                value="Transfer"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
