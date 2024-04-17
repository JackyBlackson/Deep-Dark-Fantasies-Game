import {PerlinNoiseStack} from "./noises/perlin_noise_2d.js";
import {gameSettings} from "../../config/gameplay_config.js";

export class TerrainGenerator {
    constructor(seed, threshold, tile, speed, tileWidth, tileHeight) {
        this.top = 0;
        this.speed = speed;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.threshold = threshold;
        this.tile = tile;
        this.noise = new PerlinNoiseStack(
            seed,
            0,
            [
                {diff: 10, loud: 5, octave: 5},
                {diff: 10, loud: 3, octave: 2},
                {diff: 10, loud: 1, octave: 0.5}
            ]
        );
        this.y = 0;
    }

    update() {
        if(this.top >= this.tileHeight*2) {
            this.top -= this.tileHeight*2;
            this.generate();
            this.y += this.tileHeight;
        } else {
            this.top += Math.round(this.speed / gameSettings.system.tps);
        }
    }

    generate() {
        let y = this.y;
        let count = Math.floor(500/this.tileWidth);
        for(let i = 0; i < count; i++) {
            let x = i * this.tileWidth;
            let height = this.noise.getHeight(x, y);
            //console.log(height)
            if(height > this.threshold) {
                this.tile.create(x, this.top, this.speed);
            }
        }
    }
}