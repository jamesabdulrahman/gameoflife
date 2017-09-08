'use strict';

class GameOfLifeRenderer {

	constructor(game, screen, rows, cols, tileSize, startX, startY) {
		this.game = game;
		this.screen = screen;
		this.rows = rows;
		this.cols = cols;
		this.tileSize = tileSize;
		this.running = false;
		this.scaler = 0.25; // update at this-many-second intervals
		this.frameCount = 0;
		let tileSystem = [];
		for (let r = 0; r < rows; r++) {
			let currentRow = [];
			for (let c = 0; c < cols; c++) {
				currentRow.push({
					x: startX + (tileSize * c),
					y: startY + (tileSize * r)
				});
			}
			tileSystem.push(currentRow);
		}
		this.system = tileSystem;
	}

	putTile(row, col) {
		let ctx = screen.getContext('2d');
		let system = this.system;
		ctx.fillRect(system[row][col].x, system[row][col].y, this.tileSize, this.tileSize);
	}

	refresh() {
		if (this.running === true) {
			this.frameCount++;
			if (this.frameCount >= 60*this.scaler) {
				this.game.tick();
				this.frameCount = 0;
			}
		}
		let ctx = screen.getContext('2d');
		ctx.clearRect(0, 0, 700, 700);
		for (let row = 0; row < this.game.dish.length; row++) {
			for (let col = 0; col < this.game.dish[0].length; col++) {
				if (this.game.dish[row][col] === 1) {
					ctx.fillStyle = 'black';
					this.putTile(row, col);
				}
			}
		}
		window.requestAnimationFrame(() => { this.refresh() });
	}

	run() {
		this.running = true;
	}

	stop() {
		this.running = false;
	}
}
