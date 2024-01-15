import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'tic-tac-toe-angular';

	player1: string = "X";
	player2: string = "O";
	player1Name: string = "Player 1";
	player2Name: string = "Player 2";
	player1Color: string = "red";
	player2Color: string = "blue";

	stateWinPlayer1: string = "winPlayer1";
	stateWinPlayer2: string = "winPlayer2";
	stateTie: string = "tie";
	stateNotFinished: string = "NotFinished";

	currentPlayer: string = this.player1;
	player1Value: number = 0;
	player2Value: number = 0;
	turn: number = 0;
	message: string = "";
	winner: string = ""


	resetCells(): void {
		let cells: NodeListOf<Element> = document.querySelectorAll(".game__cell");
		for (let i = 0; i < cells.length; i++) {
			cells[i].innerHTML = "";
		}
	}

	cellClicked(event: MouseEvent): void {
		const cell = event.target as HTMLElement;
		let viewTurnValue: HTMLElement | null = document.getElementById("turn_value");
		if (cell.innerHTML === "") {
			cell.innerHTML = `${this.currentPlayer}`;
			if (this.currentPlayer === this.player1) {
				cell.style.color = this.player1Color;
				if (viewTurnValue) {
					viewTurnValue.innerHTML = this.player2Name;
					viewTurnValue.style.color = this.player2Color;
				}
			} else {
				cell.style.color = this.player2Color;
				if (viewTurnValue) {
					viewTurnValue.innerHTML = this.player1Name;
					viewTurnValue.style.color = this.player1Color;
				}
			}
		} else return;
		this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
		++this.turn;
		switch (this.checkWin()) {
			case this.stateWinPlayer1:
				this.winner = this.player1;
				this.message = " wins!";
				this.showDialog();
				++this.player1Value;
				break;
			case this.stateWinPlayer2:
				this.winner = this.player2;
				this.message = " wins!";
				this.showDialog();
				++this.player2Value;
				break;
			case this.stateTie:
				this.winner = ""
				this.message = "It's a tie :)"
				this.showDialog();
				break;
			case this.stateNotFinished:
				{ }
		}
	}

	showDialog(): void {
		let viewDialog: HTMLElement | null = document.getElementById("game__dialog");
		let viewDialogMessage: HTMLElement | null = document.getElementById("dialog__message");
		let viewDialogWinner: HTMLElement | null = document.getElementById("dialog_winner");
		let viewGameBoard: HTMLElement | null = document.getElementById("game__board");
		if (viewDialogMessage) {
			viewDialogMessage.innerHTML = this.message;
		}

		switch (this.winner) {
			case this.player1:
				if (viewDialogWinner) {
					viewDialogWinner.innerHTML = this.player1Name;
					viewDialogWinner.style.color = this.player1Color;
				}
				break;
			case this.player2:
				if (viewDialogWinner) {
					viewDialogWinner.innerHTML = this.player2Name;
					viewDialogWinner.style.color = this.player2Color;
				}
				break;
			case "":
				if (viewDialogWinner) {
					viewDialogWinner.innerHTML = ``;
				}
		}
		if (viewGameBoard) {
			viewGameBoard.style.visibility = "hidden";
		}
		if (viewDialog) {
			viewDialog.style.visibility = "visible";
		}
	}

	hideDialog(): void {
		let viewDialog: HTMLElement | null = document.getElementById("game__dialog");
		if (viewDialog) {
			viewDialog.style.visibility = "hidden";
		}
		let viewGameBoard: HTMLElement | null = document.getElementById("game__board");
		if (viewGameBoard) {
			viewGameBoard.style.visibility = "visible";
		}
	}

	restartGame(): void {
		this.hideDialog();
		this.resetCells();
		let viewPlayer1Value: HTMLElement | null = document.getElementById("player_1_value");
		if (viewPlayer1Value) {
			viewPlayer1Value.innerHTML = this.player1Value.toString();
		}
		let viewPlayer2Value: HTMLElement | null = document.getElementById("player_2_value");
		if (viewPlayer2Value) {
			viewPlayer2Value.innerHTML = this.player2Value.toString();
		}
		this.turn = 0;
	}

	checkWin(): string {
		let cells: NodeListOf<Element> = document.querySelectorAll(".game__cell");
		let winningCombinations: number[][] = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8],
			[0, 3, 6], [1, 4, 7], [2, 5, 8],
			[0, 4, 8], [2, 4, 6]            
		];
		for (let i = 0; i < winningCombinations.length; i++) {
			let [a, b, c] = winningCombinations[i];
			if (cells[a].innerHTML === this.player1
				&& cells[b].innerHTML === this.player1
				&& cells[c].innerHTML === this.player1) {
				return this.stateWinPlayer1;
			} else if (cells[a].innerHTML === this.player2
				&& cells[b].innerHTML === this.player2
				&& cells[c].innerHTML === this.player2) {
				return this.stateWinPlayer2;
			}
		}
		return this.turn === 9 ? this.stateTie : this.stateNotFinished;
	}
}
