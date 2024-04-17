export class Random {
    constructor(seed) {
        this.seed = seed || new Date().getTime();
        this.multiplier = 0x5DEECE66D;
        this.addend = 0xB;
        this.mask = (1 << 31) - 1;
    }

    next(bits) {
        this.seed = (this.seed * this.multiplier + this.addend) & this.mask;
        return this.seed >>> (31 - bits);
    }

    setSeed(seed) {
        this.seed = seed;
    }

    nextInt(bound) {
        if ((bound & -bound) === bound) { // i.e., bound is a power of 2
            return (bound * this.next(31)) >> 31;
        }
        let bits, val;
        do {
            bits = this.next(31);
            val = bits % bound;
        } while (bits - val + (bound - 1) < 0);
        return val;
    }
}
