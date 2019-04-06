import React, { useState } from "react";
import _ from "lodash";

import { createBoard, letters } from "../lib/bingo";

export default function Board() {
  const [board, updateBoard] = useState(false);
  const [seed, updateSeed] = useState("");
  const [username, updateUsername] = useState("");

  return (
    <div className="mainContainer">
      <head>
        <title>BINGO</title>
      </head>
      <style jsx global>{`
        body {
          font-family: Helvetica;
          text-align: center;
          padding: 0 10%;
          margin: 0;
          text-align: center;
          background-color: #290;
        }

        .header {
          margin-bottom: 30px;
        }

        .mainContainer {
          padding: 20px;
          min-height: 100vh;
          background-color: white;
        }

        table {
          width: 360px;
          margin: auto;
        }
        tr {
          width: 100%;
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
        td {
          width: 60px;
          height: 60px;
          border: solid;
          border-width: 1px;
          border-color: black;
          border-radius: 6px;
        }

        tr:first-child {
          background-color: #372;
          color: white;
        }

        tr:first-child > td:hover {
          background-color: #372;
          color: white;
          cursor: default;
        }

        td:hover {
          background-color: #327;
          color: white;
          cursor: pointer;
        }

        td.clicked {
          background-color: #903035;
          color: white;
          cursor: pointer;
        }

        td.clicked:hover {
          background-color: #723;
          color: white;
          cursor: pointer;
        }
      `}</style>
      <div className="header">
        <h1>BINGO</h1>
        <input
          placeholder="Input Seed"
          onChange={e => {
            updateSeed(e.target.value);
          }}
          value={seed}
        />
        <input
          placeholder="Twitch Username"
          onChange={e => {
            updateUsername(e.target.value);
          }}
          value={username}
        />
        <button onClick={() => updateBoard(createBoard(username, seed))}>
          Start Game
        </button>
      </div>
      {board &&
        (() => {
          const click = (letter, number) => {
            const { B, I, N, G, O } = _.update(
              board,
              [letter, number, "clicked"],
              i => !i
            );
            updateBoard({ B, I, N, G, O });
          };
          const data = (letter, number) => {
            return (
              <td
                key={letter.concat(number)}
                onClick={() => click(letter, number)}
                className={
                  board[letter][number].clicked ? "clicked" : "notClicked"
                }
              >
                {board[letter][number].num}
              </td>
            );
          };
          const draw = i => letters.map(letter => data(letter, i));
          return (
            <table>
              <tbody>
                <tr>
                  <td>B</td>
                  <td>I</td>
                  <td>N</td>
                  <td>G</td>
                  <td>O</td>
                </tr>
                {_.range(0, 5).map(n => (
                  <tr key={n}>{draw(n)}</tr>
                ))}
              </tbody>
            </table>
          );
        })()}
    </div>
  );
}
