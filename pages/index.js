import Link from "next/link";

export default function Home() {
  return (
    <div className="mainContainer">
      <head>
        <title> BINGO </title>
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

        .mainContainer {
          padding: 20px;
          height: 100vh;
          background-color: white;
        }

        .header {
          display: flex;
        }

        .header > h2 {
          width: 50%;
        }
        p {
          width: 80%;
          margin: auto;
          padding-bottom: 20px;
        }
      `}</style>
      <h1> BINGO </h1>
      <div className="header">
        <h2>
          <Link href="/play">Play Game</Link>
        </h2>
        <h2>
          <Link href="/run">Host a Game</Link>
        </h2>
      </div>
      <div>
        <h2> Instructions </h2>
        <p>
          <em> To Play</em>, click "Play Game" and type in your Twitch username
          exactly as it appears in chat, along with the seed value visible at
          the top of the screen of the bingo stream you are watching. Then click
          start game. The streamer will call new values, and as they do, you can
          click on the boxes on your bingo board to mark them. Once you have
          bingo, inform the streamer, and they will confirm your win
        </p>
        <p>
          <em> To Host</em>, click "Host a Game". Livestream your game, and make
          sure the seed value at the top of the screen is visible to your
          players. Click "New Number" to pull out a new bingo ball. Your
          previously called values will also show up on the screen. Once a
          player claims to have bingo, type their username in exactly as it
          appears in chat to verify that they have won. If the app tells you
          they have a bingo, you can click "Restart" to start a new game.
        </p>
      </div>
    </div>
  );
}
