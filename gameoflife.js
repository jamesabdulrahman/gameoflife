'use strict'

const ALIVE = 1;
const DEAD = 0;

class GameOfLife {

	constructor(seed) {
		this.width = seed[0].length;
		this.height = seed.length;
		this.dish = seed;
		this.generation = 0;
	}

	getNeighbourhood(row, col) {
		let neighbours = 0;
		// cell itself
			neighbours += this.dish[row][col];
		// top left
		if (row-1 >= 0 && col-1 >= 0) {
			neighbours += this.dish[row-1][col-1];
		}
		// left
		if (col-1 >= 0) {
			neighbours += this.dish[row][col-1];
		}
		// bottom left
		if (row+1 <= this.height-1 && col-1 >= 0) {
			neighbours += this.dish[row+1][col-1];
		}
		// top
		if (row-1 >= 0) {
			neighbours += this.dish[row-1][col];
		}
		// bottom
		if (row+1 <= this.height-1) {
			neighbours += this.dish[row+1][col];
		}
		// top right
		if (row-1 >= 0 && col+1 <= this.width-1) {
			neighbours += this.dish[row-1][col+1];
		}
		// right
		if (col+1 <= this.width-1) {
			neighbours += this.dish[row][col+1];
		}
		// bottom right
		if (row+1 <= this.height-1 && col+1 <= this.width-1) {
			neighbours += this.dish[row+1][col+1];
		}
		/* All the live cells in this Moore neighbourhood,
		 * including the centre cell. */
		return neighbours;
	}

	tick() {
		this.generation++;
		// clone a copy of the current dish to work on
		let buffer = JSON.parse(JSON.stringify(this.dish));
		for (let row = 0; row < this.height; row++) {
			for (let col = 0; col < this.width; col++) {
				let hood = this.getNeighbourhood(row, col);
				switch (hood) {
					case 3:
					/* We either have a dead cell with exactly
					 * three neighbours (is born) or a live
					 * cell with two neighbours (survives). */
						buffer[row][col] = ALIVE;
						break;
					case 4:
					/* We must have either a live cell with
					 * three neighbours (survives) or a dead
					 * cell with four neighbours (stays dead)
					 * so we keep the current state. */
						buffer[row][col] = this.dish[row][col];
						break;
					default:
					/* If we reach this point, we must have either
					 * a dead or dying cell as we have a hood of
					 * fewer than 2 or more than 4 cells. */
						buffer[row][col] = DEAD;
						break;
				}
			}
		}
		// copy the buffer into the dish
		this.dish = JSON.parse(JSON.stringify(buffer));
	}
}
