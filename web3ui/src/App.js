import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { rouletteContract, userAccounts } from './config';

const App = () => {
  const [prevGames, setPrevGames] = useState([]);
  const [currentGame, setCurrentGame] = useState([]);
  const [errorState, setErrorState] = useState("");
  const [successState, setSuccessState] = useState("");
  const [selectedAcc, setSelectedAcc] = useState(userAccounts[0]);
  const [currentGameBetters, setCurrentGameBetters] = useState({});
  const [selectedNum, setSelectedNum] = useState(0);
  const [loading, setLoading] = useState(true);
  // bet you've never seen this many state hooks in once area
  const betAmount = useRef(null);
  const prod = "not production";
  const debug = (s) => {if (prod !== "production") console.log(`[DEBUG] ${s}`)}; 

  const getWinners = async () => {
    return await rouletteContract.methods.getHistory().call({from: selectedAcc});
  }

  const getCurrentGame = async () => {
    return await rouletteContract.methods.getCurrentGamePot().call({from: selectedAcc});
  }

  const getCurrentGameBetters = async () => {
    return await rouletteContract.methods.getCurrentGameBetters().call({from: selectedAcc});
  }

  const placeBet = async (x) => {
    if (!Number.isInteger(parseInt(betAmount.current.value))) {
      setErrorState("Must enter a number");
      return;
    }
    rouletteContract.methods.bet(selectedNum).send({from: selectedAcc, value: betAmount.current.value, gas: 1000000})
    .on("transactionHash", (hash) => {
      debug(hash);
      setSuccessState("bet placed woo");
    })
    .on("error", (e) => {
      setErrorState(e.message);
    })
  }

  const handleSelectChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSelectedAcc(value);
    if (debug) console.log(`Now sending bets from ${value}`);
  }

  useEffect(() => {
    checkOnStuff();
    setInterval(checkOnStuff, 3000);
    // eslint-disable-next-line
  }, [])

  const checkOnStuff = () => {
    getWinners().then((r) => {
      setPrevGames(r);
    })
    getCurrentGame().then((r) => {
      setCurrentGame(r);
    })
    getCurrentGameBetters().then((r) => {
      setCurrentGameBetters(r);
    })
    setLoading(false);
    if(debug) console.log("Updated with most recent values");
  }

  const selectedNumHandler = (n) => {
    setSelectedNum(n);

  }

  let nums = [];
  for (let i = 1; i <= 6; i++) {
    nums.push(<div key={i} className={`num-circle ${selectedNum === i ? "active" : ""}`} onClick={() => selectedNumHandler(i)}>{i}</div>)
  }

  return (
    <div className="App">
      <div className="gameplay-options">
        <select className="acc-select" name="account" placeholder='select an account to gamble wit' onChange={handleSelectChange}>
          {userAccounts.map((a, i) => <option value={a} key={i}>Account {i + 1}</option>)}
        </select>
        <input className="bet-amount" name="betAmount" ref={betAmount} placeholder="Bet Amount" />
        <button className="bet-submit" onClick={placeBet}><span>Bet</span></button>
      </div>
      <div className="nums-container">
        {nums}
      </div>
      {successState.length > 0 ? <div className="success-state"><p>{successState}</p><button onClick={() => setSuccessState("")}>Clear</button></div> : null}
      {errorState.length > 0 ? <div className="error-state"><p>{errorState}</p><button onClick={() => setErrorState("")}>Clear</button></div> : null}
      <div className="current-game">
        Current Pot: {currentGame}
        <div className="betters">
          <div className="betters-column">
            {currentGameBetters[0]?.length > 0 ? currentGameBetters[0].map((a, i) => <p key={i}>{a}</p>) : <p>No bets yet</p>}
          </div>
          <div className="betters-column">
            {currentGameBetters[1]?.length > 0 ? currentGameBetters[1]?.map((a, i) => <p key={i}>{a} <i>WEI</i></p>) : <></>}
          </div>
        </div>
      </div>
      <ul className="winners">
        <div className="white-hr" />
        {prevGames.map((g, i) => <li className="winner-item" key={i}>{g}</li>)}
      </ul>
    </div>
  )
}

export default App;
