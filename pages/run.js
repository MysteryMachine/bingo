import React, { useState } from "react";
import _ from "lodash";

import { createInitialGameState, pull, checkWinner } from "../lib/bingo";

export default function GameRunner() {
  const [gameState, updateGameState] = useState(createInitialGameState());
  const [text, updateText] = useState("");
  const lastCalled = _.last(gameState.used);
  const lastCalledText = lastCalled ? lastCalled.value : "None";
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

        .callList {
          width: 600px;
          max-width: 100%;
          margin: auto;
        }

        .callList > span {
          padding: 10px;
          font-size: 1.25em;
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
      <div className="callList">
        {gameState.used.map(i => (
          <span key={i.value}>{i.value} </span>
        ))}
      </div>
    </div>
  );
}
