import { ElementWrapper, wrapper } from "../engine/element_wrapper.js";

class ScoreBoard extends ElementWrapper {
    constructor(element) {
        super(element);
        this.score = 0;
        this.queue = [];
        this.maxUpdateTicks = 20
        this.updatePerTicks = this.maxUpdateTicks;
        this.counter = this.updatePerTicks;
        this.scoreBoardFantom = wrapper.spawnElement(ScoreBoardFantom);
    }

    add(score) {
        this.queue.push(score)
        this.scoreBoardFantom.push(score);
    }

    summon() {
        let text = document.createElement('div');
        this.element = text;
        text.innerText = 0;
        return text;
    }

    update() {
        this.updatePerTicks = Math.max((this.maxUpdateTicks - this.queue.length * 2), 0);
        if(this.counter == 0) {
            //update
            if(this.queue.length > 0) {
                var addScore = this.queue.pop();
                this.scoreBoardFantom.pop();
                this.score += addScore;
                this.element.innerText = this.score;
            }
            //reset counter to this.updatePerTick
            this.counter = this.updatePerTicks
        } else {
            this.counter --;
        }
    }
}

class ScoreBoardItem extends ElementWrapper {
    constructor(score = 0, element) {
        super(element);
        this.element.innerText = score > 0 ? '+'+score : score;

        //console.log("this.score = ", this.score);
    }

    summon() {
        let text = document.createElement('div');
        this.element = text;
        
        text.innerText = 0;
        //console.log("this.points = ", this.points);
        //console.log("this = ", this);
        return text;
    }
}

class ScoreBoardFantom extends ElementWrapper {
    constructor(element) {
        super(element);
        this.itemList = [];
    }

    summon() {
        let text = document.createElement('div');
        this.element = text;
        return text;
    }

    push(score) {
        let scoreBoardItem = new ScoreBoardItem(score);
        this.itemList.push(scoreBoardItem);
        this.element.appendChild(scoreBoardItem.element);
    }

    pop() {
        if(this.itemList.length > 0) {
            let scoreBoardItem = this.itemList.pop();
            this.element.removeChild(scoreBoardItem.element);
        }
    }
}

export const scoreBoard = wrapper.spawnElement(ScoreBoard);