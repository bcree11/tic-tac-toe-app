import React, {Component} from 'react'
import './App.css'
import Scoreboard from './Scoreboard'


export default class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      gameBoard: ['','','','','','','','',''],
      icon: 'X',
      player1Icon: 'X',
      player1Score: 0,
      player2Score: 0,
      player2Icon: 'O',
      winner: null,
      turn: 9,
      winningArray: '',
      color: `#990000`,
      gameCount: 1,
    }
  }

  checkBoard(){
    for(let i = 0; i < winArrays.length; i++){
      let [a,b,c] = winArrays[i]
      let {gameBoard, icon, player1Icon, player2Icon, player1Score, player2Score} = this.state
      if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]){
        if(icon===player1Icon){
        this.setState({
          winner: player1Icon,
          winningArray: [a,b,c],
          player1Score: player1Score+1,
        })
      } else if(icon===player2Icon){
        this.setState({
          winner: player2Icon,
          winningArray: [a,b,c],
          player2Score: player2Score+1,
        })
      }
        document.getElementById(a).style.color="black"
        document.getElementById(b).style.color="black"
        document.getElementById(c).style.color="black"
      }
    }
  }

  declareWinner(){
    let {winner, turn, player1Icon}=this.state
    if(winner){
      if(winner===player1Icon){
        return 'Player 1 Wins!'
      } else {
        return 'Player 2 Wins!'
      }
    } else if(turn === 0){
      return 'Draw'
    } else if(turn === 9){
      return 'Start New Game!'
    }else {
      return `${turn} Turns Left!`
    }
  }

  playerTurn(){
    let {turn,gameCount}=this.state
    if(turn===9 && gameCount%2===0){
      return 'Player 2\'s Up 1st'
    } else if(turn===9 && gameCount%2!==0){
      return 'Player 1\'s Up 1st'
    } else {
      return ''
    }
  }

  handleChange(i){
    let {icon, gameBoard, turn, player1Icon, player2Icon} =this.state
    //gameBoard array only fills if value of index is empty. Prevents value in array from changing everytime it's clicked
    if(this.state.gameBoard[i]==='' && !this.state.winner){
      gameBoard[i] = icon
      this.setState({
        icon: this.state.icon === player1Icon ? player2Icon : player1Icon,
        gameBoard: gameBoard,
        turn: turn-1
      })
      this.checkBoard()
    }
    console.log(icon);
    console.log(gameBoard);
    console.log('Winner:'+this.state.winner);
    console.log('Score',this.state.player1Score);
    console.log('Score2',this.state.player2Score);
  }

  newGameReset(){
    this.setState({
      gameBoard: ['','','','','','','','',''],
      icon: 'X',
      player1Icon: 'X',
      player1Score: 0,
      player2Score: 0,
      player2Icon: 'O',
      winner: null,
      turn: 9,
      winningArray: '',
      color: `#990000`,
      gameCount: 1,
    })
    if(this.state.winningArray.length > 0){
      for(let value of this.state.winningArray){
        document.getElementById(value).style.color=`#990000`
      }
    }
  }

  reset(){
    let {gameCount} = this.state
    if(gameCount%2!==0){
    this.setState({
      gameBoard: ['','','','','','','','',''],
      icon: 'X',
      winner: null,
      turn: 9,
      winningArray: '',
      gameCount: gameCount+1,
      player1Icon: '0',
      player2Icon: 'X',
    })
  } else{
    this.setState({
      gameBoard: ['','','','','','','','',''],
      icon: 'X',
      winner: null,
      turn: 9,
      winningArray: '',
      gameCount: gameCount+1,
      player1Icon: 'X',
      player2Icon: 'O',
    })
  }
    if(this.state.winningArray.length > 0){
      for(let value of this.state.winningArray){
        document.getElementById(value).style.color=`#990000`
      }
    }
  }

  render() {
    const style = {
      color: this.state.color
    }
    let squares = this.state.gameBoard.map((val, i) => {
        return (<div className="Squares" id={i} key={i} onClick={() => this.handleChange(i)}>{val}</div>)
      })
    return (
      <div>
        <Scoreboard player1Score={this.state.player1Score} player2Score={this.state.player2Score} player1Icon={this.state.player1Icon} player2Icon={this.state.player2Icon}/>
        <div className='Game'>
          <div className='FirstPlayer'>
            {this.playerTurn()}
          </div>
          <div className='Turns'>
            {this.declareWinner()}
          </div>
          <div className="Board">
            {squares}
          </div>
          <div className='ResetButtons'>
            <div className='Button'>
            <p className='ResetStatement'>Continue VS</p>
            <button type="button" className="Reset btn btn-primary" onClick={() => this.reset()}>Refresh Board</button>
            </div>
            <div className='Button'>
            <p className='ResetStatement'>New Game</p>
            <button type="button" className="Reset btn btn-danger" onClick={() => this.newGameReset()}>Reset Game</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const winArrays= [[0, 1, 2],
                  [3, 4, 5],
                  [6, 7, 8],
                  [0, 3, 6],
                  [1, 4, 7],
                  [2, 5, 8],
                  [0, 4, 8],
                  [2, 4, 6]]
