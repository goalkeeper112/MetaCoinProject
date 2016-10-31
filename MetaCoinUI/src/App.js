import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
let MetaCoinAbi = [{"constant":true,"inputs":[],"name":"mainAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"initialSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getBalanceInEth","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}];
let MetaCoinAddress = '0x585e9e9aab6e35677ebfbc030d3ee4073307b9b5';
let MetaCoin = web3.eth.contract(MetaCoinAbi).at(MetaCoinAddress);
let initialSupply = MetaCoin.initialSupply();
let mainAddress = MetaCoin.mainAddress();

class App extends Component {
  componentWillMount () {
    console.log(web3);
  }

  getBalance(){
    let address = document.getElementById('addressBalance');
    let balance = MetaCoin.getBalance.call(address.value);
    let amountDisplay = document.getElementById('balanceAmount');
    amountDisplay.value = balance.toNumber();
  }

  fundAddress(){
    let address = document.getElementById('addressFund');
    let txID = document.getElementById('txID');

    let id = MetaCoin.sendCoin(address.value, 10, {from: mainAddress.toString()});
    txID.value = id;
  }

  sendMetaCoin(){
    let addressFrom = document.getElementById('addressFrom');
    let addressTo = document.getElementById('addressTo');
    let amount = document.getElementById('amount');
    let txSendID = document.getElementById('txSendID');

    if(addressFrom.value === mainAddress.toString()){
        alert("Cannot send MetaCoin from this address");
    }else{
      let id = MetaCoin.sendCoin(addressTo.value, parseInt(amount.value), {from: addressFrom.value});
      txSendID.value = id;
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>MetaCoin UI</h2>
        </div>
        <p className="App-intro">
          Main Account Address: <big>{mainAddress.toString()} </big>
          <hr />

          <br />

          <h2 className="text-center">MetaCoin Amount: {initialSupply.toString()}</h2>

          <div className="form">
            <h2 className="text-center">Balances</h2>
            <div className="input">
              <input id="addressBalance" className="button email" type="text" />
              <button onClick={this.getBalance} className="button" id="submit">Ver balance </button>
            </div>
            <br />
            <label>MetaCoins: </label>
            <input id="balanceAmount" className="button email" type="number" step="0.01" disabled />
          </div>

          <div className="form">
            <h2 className="text-center">Fondear</h2>
            <div className="input">
              <input id="addressFund" className="button email" type="text" />
              <button onClick={this.fundAddress} className="button" id="submit">Fondear </button>
            </div>
            <br />
            <label>ID TX: </label>
            <input id="txID" className="button email" type="text" disabled />
          </div>

          <div className="form">
            <h2 className="text-center">Enviar</h2>
            <div className="input">
              Address From: <input id="addressFrom" className="button email" type="text" />
              Amount: <input id="amount" className="button email" type="number" />
              Address To: <input id="addressTo" className="button email" type="text" />
            </div>
            <br />
            <label>ID TX: </label> <input id="txSendID" className="button email" type="text" disabled />
            <br /><br />
            <button onClick={this.sendMetaCoin} className="button" id="submit">Enviar</button>
          </div>
        </p>
      </div>
    );
  }
}

export default App;
