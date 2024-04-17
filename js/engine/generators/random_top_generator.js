export class RandomGenerator {
    static generate(entityWidth) {
        return Math.floor(Math.random() * (500 - entityWidth)) + 1;
    }
}