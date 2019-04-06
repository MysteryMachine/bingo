import React, { useState } from "react";
import _ from "lodash";

import {
  createInitialGameState,
  pull,
  checkWinner,
  unrandAllValues,
  letters
} from "../lib/bingo";

export default function GameRunner() {
  const [gameState, updateGameState] = useState(createInitialGameState());
  const [text, updateText] = useState("");
  const [popped, updatePopped] = useState(false);
  const lastCalled = _.last(gameState.used);
  const lastCalledText = lastCalled ? lastCalled.value : "None";
  const lastThree = _.takeRight(gameState.used, 3).map(i => i.value);
  console.log(lastThree);
  const valuesLeft = gameState.left.length;
  const winner = gameState.winner;

  const button = () =>
    valuesLeft !== 0 && !winner ? (
      <button onClick={() => updateGameState(pull(gameState))}>
        New Number
      </button>
    ) : (
      <button onClick={() => updateGameState(createInitialGameState())}>
        Restart
      </button>
    );

  const renderCall = letter => {
    return (
      <tr>
        <td className="letter">{letter}</td>
        {unrandAllValues[letter].map(o => (
          <td
            className={
              _.find(gameState.used, used => used.value === o.value) && "called"
            }
          >
            {o.num}
          </td>
        ))}
      </tr>
    );
  };
  return (
    <div className="mainContainer">
      <head>
        <title>BINGO</title>
      </head>
      <style jsx global>{`
        body {
          font-family: Helvetica;
          padding: 0 10%;
          margin: 0;
          text-align: center;
          background-color: #290;
        }

        .mainContainer {
          padding: 20px;
          height: 100vh;
          background-color: white;
        }

        .lastCalled {
          color: #484;
        }

        .ui {
          display: flex;
          width: 600px;
          max-width: 100%;
          margin: auto;
          padding-bottom: 20px;
        }

        .ui > * {
          width: 46%;
          margin: 0 2%;
        }

        input {
          margin-right: 6px;
          padding: 6px;
          border-radius: 6px;
        }
        button {
          padding: 6px;
          border-radius: 6px;
        }
        table {
          width: 600px;
          margin: auto;
        }
        td {
          width: 50px;
          height: 30px;
          border: solid;
          border-width: 1px;
          border-color: black;
          border-radius: 6px;
        }
        td.called {
          background-color: #903035;
          color: white;
        }

        td.letter {
          background-color: #372;
          color: white;
        }
        .popup {
          padding-top: 20px;
        }

        .popup > div:first-child {
          padding-bottom: 20px;
        }

        .lastCalledBody {
          background-color: white;
          padding: 8px;
          text-align: center;
          display: flex;
        }

        .lastCalledBody > span {
          padding: 8px;
        }

        .lastCalledBody > span:not(:last-child) {
          border: 0;
          border-right: 1px;
          border-style: solid;
        }

        .lastCalledWindow {
          padding: 5px;
        }

        .lastCalledWindowHeader {
          padding: 10px 0;
          font-size: 1.2em;
          color: white;
          font-weight: 600;
        }
      `}</style>
      <h1>BINGO</h1>
      <div className="ui">
        <h2> Seed: {gameState.seed} </h2>
        <h2> Values Left: {valuesLeft} </h2>
      </div>
      <div className="ui">
        <input
          placeholder="Twitch Username"
          onChange={e => {
            updateText(e.target.value);
          }}
          value={text}
        />
        <button onClick={e => updateGameState(checkWinner(gameState, text))}>
          Check Winner
        </button>
      </div>
      {winner ? (
        <div className="ui">
          <h2> BINGO! {text} wins! </h2>
          {button()}
        </div>
      ) : (
        <div className="ui">
          <h2> Last Called </h2>
          <h1 className="lastCalled">{lastCalledText}</h1>
          {button()}
        </div>
      )}
      <table>
        <tbody>{letters.map(letter => renderCall(letter))}</tbody>
      </table>
    </div>
  );
}
