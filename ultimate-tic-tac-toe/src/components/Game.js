import React, { Component } from 'react'
import Board from './Board'
import { getRandomInt } from '../helpers'

import './css/Game.css'
class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board:  [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            activeBoard: [0, 0],
            nextActiveBoard: [null, null],
            xIsNext: true
        }
    }

    componentDidMount() {
        this.updateBoards()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.activeBoard !== prevState.activeBoard) {
            this.updateBoards()
        }
    }

    updateBoards = () => {
        let boards = [[], [], []];

        new Array(9).fill(0).forEach((n, i) => {
            const row = i % 3
            const position = [row, boards[row].length]

            boards[row].push(<Board id={i}
                player={this.state.xIsNext ? 'X' : 'O'}
                position={position} 
                activeBoard={this.state.activeBoard}
                onGameEnded={winner => this.microGameEnded(winner, position)} 
                onMovePlayed={this.setActiveBoard}
                onCellHovered={position => {
                    this.showNextActiveBoard(position)
                }}
            />)
        })

        this.setState({ board: boards })
    }

    setActiveBoard = (row, col) => {
        this.setState({ 
            activeBoard: [row, col],
            xIsNext: !this.state.xIsNext
        })
    }

    showNextActiveBoard = position => {
        const nextActiveBoard = [position[0], position[1]]
        this.setState({ nextActiveBoard })
    }

    microGameEnded = (winner, position) => {
        console.log('microGameEnded: ', [winner, position])

        let board = [ ...this.state.board ]
        board[position[0]][position[1]] = winner

        this.setState({ board })
    }

    render() {
        return (
            <div>
                <p id='title'>Ultimate TicTacToe</p>
                <div className='board'>
                    {this.state.board.map((row, i) => 
                        <div className='board-row'>
                            {row.map((cell, j) => (
                                <div className='board-cell'>
                                    {cell}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Game