import {Random} from "./seed_random.js";

export class ImprovedNoise {
    constructor(seed) {
        this.seed = seed;
        this.p = this.genSeededPermutation(seed);
    }

    noise(x, y, z, scale) {
        x /= scale;
        y /= scale;
        z /= scale;
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);
        const u = this.fade(x);
        const v = this.fade(y);
        const w = this.fade(z);
        const A = this.p[X] + Y;
        const AA = this.p[A] + Z;
        const AB = this.p[A + 1] + Z;
        const B = this.p[X + 1] + Y;
        const BA = this.p[B] + Z;
        const BB = this.p[B + 1] + Z;

        return (this.lerp(w, this.lerp(v, this.lerp(u, this.grad(this.p[AA], x, y, z), this.grad(this.p[BA], x - 1, y, z)), this.lerp(u, this.grad(this.p[AB], x, y - 1, z), this.grad(this.p[BB], x - 1, y - 1, z)))), this.lerp(v, this.lerp(u, this.grad(this.p[AA + 1], x, y, z - 1), this.grad(this.p[BA + 1], x - 1, y, z - 1)), this.lerp(u, this.grad(this.p[AB + 1], x, y - 1, z - 1), this.grad(this.p[BB + 1], x - 1, y - 1, z - 1))) + 1.0) / 2.0;
    }

    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    lerp(t, a, b) {
        return a + t * (b - a);
    }

    grad(hash, x, y, z) {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h == 12 || h == 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    genSeededPermutation(seed) {
        const p = new Array(512);
        const randomObject = new Math.seedrandom(seed);
        for (let i = 0; i < p.length; i++) {
            const a = randomObject.int32() % 256;
            p[i] = a > 0 ? a : -a;
        }
        return p;
    }
}

console.log("==========random1==========")
let random1 = new Math.seedrandom('hello.');
console.log(random1.int32());
console.log(random1.int32());
console.log(random1.int32());
console.log(random1.int32());
console.log("==========random2==========")
let random2 = new Math.seedrandom('hello.');
console.log(random2.int32());
console.log(random2.int32());
console.log(random2.int32());
console.log(random2.int32());
console.log("==========PerlinNoise==========")
let noise = new ImprovedNoise('hello.');
console.log(noise.noise(0,1,1,1))
console.log(noise.noise(0,1,1,1))
console.log(noise.noise(0,2,1,1))
console.log(noise.noise(0,2,1,1))
console.log(noise.noise(0,4,1,1))
console.log(noise.noise(0,4,1,1))
console.log("===============================")
for(let i = 0; i < 512; i++) {
    console.log(`${i}` + noise.noise(0,i,1,1))
}