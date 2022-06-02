import React, { Component, useState } from 'react';
import WORDS_TARGET from '../wordBank';


var answerList = ["money", "three", "aegis", "cower", "shove", "tiles", "eight", "whale", "guild"]

const GuessForm = () => {
  const [guess, setGuess] = useState("")
  const [guessList, updateGuessList] = useState([])
  const [turnCount, updateTurnCount] = useState(1)
  const [board, updateBoard] = useState([[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (guessList.includes(guess)) {
      alert('${guess} has already been attempted before. Please try another word.')
    } else {
      alert(`The guess you entered was: ${guess}`)
      updateGuessList(arr => [...arr, guess]);
      
      var loc = answerList.indexOf(guess)
      if (loc > -1) {
        var x = Math.floor(loc / 3)
        var y = loc % 3
        var player = turnCount % 2
        const tempBoard = board
        tempBoard[x][y] = player
        updateBoard(tempBoard)
        
        //check col
        for (var i = 0; i < 3; i++) {
          if (board[x][i] != player)
            break;
          if (i == 3 - 1) {
            alert(`Player ${player} won!`)
          }
        }

        //check row
        for (var i = 0; i < 3; i++) {
          if (board[i][y] != player)
            break;
          if (i == 3 - 1) {
            alert(`Player ${player} won!`)
          }
        }

        //check diag
        if (x == y) {
          //we're on a diagonal
          for (var i = 0; i < 3; i++) {
            if (board[i][i] != player)
              break;
            if (i == 3 - 1) {
              alert(`Player ${player} won!`)
            }
          }
        }

        //check anti diag
        if (x + y == 3 - 1) {
          for (var i = 0; i < 3; i++) {
            if (board[i][(3 - 1) - i] != player)
              break;
            if (i == 3 - 1) {
              alert(`Player ${player} won!`)
            }
          }
        }
        
      }
      setGuess("")
      updateTurnCount(turnCount + 1);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your guess:
        <input 
          type="text" 
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  )
}

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Hello, world!</h1>
        <p>Welcome to your new single-page application, built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p>To help you get started, we have also set up:</p>
        <ul>
          <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
          <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
          <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
        </ul>
        <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
        <GuessForm />
      </div>
    );
  }
}
