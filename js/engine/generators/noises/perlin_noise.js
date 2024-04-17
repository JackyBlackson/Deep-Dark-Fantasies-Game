class PerlinNoise {
    constructor(seed, octave) {
        this.seed = seed;
        this.octave = octave;
    }

    // 生成二维柏林噪声
    generate(x, y) {
        let noise = 0;
        let frequency = 1;
        let amplitude = 1;
        let maxValue = 0;

        for (let i = 0; i < this.octave; i++) {
            noise += this._generateNoise(x * frequency, y * frequency) * amplitude;
            maxValue += amplitude;
            amplitude *= 0.5;
            frequency *= 2;
        }

        return noise / maxValue;
    }

    // 生成噪声
    _generateNoise(x, y) {
        const floorX = Math.floor(x);
        const floorY = Math.floor(y);

        const topLeft = this._dotGridGradient(floorX, floorY, x, y);
        const topRight = this._dotGridGradient(floorX + 1, floorY, x, y);
        const bottomLeft = this._dotGridGradient(floorX, floorY + 1, x, y);
        const bottomRight = this._dotGridGradient(floorX + 1, floorY + 1, x, y);

        const xBlend = this._fade(x - floorX);
        const top = this._lerp(topLeft, topRight, xBlend);
        const bottom = this._lerp(bottomLeft, bottomRight, xBlend);

        const yBlend = this._fade(y - floorY);
        return this._lerp(top, bottom, yBlend);
    }

    // 根据坐标和种子获取哈希值
    _hash(x, y) {
        let hash = x + y * 57;
        hash = (hash << 13) ^ hash;
        return (1.0 - (hash * (hash * hash * this.seed + 19990303) % 1073741824) / 1073741824.0);
    }

    // 获取梯度向量
    _grad(x, y, dx, dy) {
        const hash = this._hash(x, y);
        return dx * Math.cos(hash * Math.PI) + dy * Math.sin(hash * Math.PI);
    }

    // 计算点乘梯度向量
    _dotGridGradient(ix, iy, x, y) {
        const dx = x - ix;
        const dy = y - iy;
        return this._grad(ix, iy, dx, dy);
    }

    // 插值函数
    _lerp(a, b, t) {
        return (1 - t) * a + t * b;
    }

    // 缓和函数
    _fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }
}
