import React, { Component } from 'react'

import './css/Board.css'
class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            winner: '',
        }
    }
   
    checkGameOver = () => {
        let victoryDirection  = ''
        // Horizontal Victory
        this.state.board.forEach(row => {
            if (row[0] && row[0] === row[1] && row[1] === row[2]) {
                victoryDirection = 'Horizontal'
            }
        })
    
        // Vertical Victory
        for (let i = 0; i < this.state.board.length; i++) {
            const top = this.state.board[0][i]
            const mid = this.state.board[1][i]
            const bot = this.state.board[2][i]
    
            if (top && top === mid && top === bot) {
                victoryDirection = 'Vertical'
            }
        }

        // Diagonal Victory
        const top_right_to_bottom_left = this.state.board[0][2] && this.state.board[0][2] === this.state.board[1][1] && this.state.board[0][2] === this.state.board[2][0]
        const top_left_to_bottom_right = this.state.board[0][0] && this.state.board[0][0] === this.state.board[1][1] && this.state.board[0][0] === this.state.board[2][2]
        
        if (top_left_to_bottom_right || top_right_to_bottom_left) {
            victoryDirection = 'Diagonal'
                ? [this.state.board[0][2], this.state.board[1][1], this.state.board[2][0]] 
                :  [this.state.board[0][0], this.state.board[1][1], this.state.board[2][2]]
        }
    
        if (victoryDirection) {
            this.setState({
                winner: this.xIsNext ? 'O' : 'X',
            }, () => {
                this.props.onGameEnded(this.state.winner)
            })
        }
    }

    isActiveBoard = () => {
        const { activeBoard, position } = this.props
        return activeBoard[0] === position[0] && activeBoard[1] === position[1]
    }

    hoverCell = (i, j) => {
        if (this.isActiveBoard() && !this.state.winner) {
            this.props.onCellHovered([i, j])
        }
    }

    playMove = (i, j) =>  {
        if (this.isActiveBoard()) {
            let board = [ ...this.state.board ]

            if (!board[i][j]) {
                board[i][j] = this.props.player
    
                this.setState({ board }, () => {
                    this.checkGameOver()
                })
                this.props.onMovePlayed(i, j)
            } 
        }
    }
    
    render () {
        return (
            <div className={`micro-board ${this.isActiveBoard() ? 'micro-board-active' :  'micro-board-inactive'}`}>
                {this.state.board.map((row, i) => 
                    <div className='micro-board-row'>
                        {row.map((cell, j) => (
                             <div className='micro-board-cell'
                                onMouseEnter={() => this.hoverCell(i, j)}
                                onClick={() => this.playMove(i, j)}
                             >
                                {cell}
                             </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }
}

export default Board
