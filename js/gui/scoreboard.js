import { ElementWrapper, wrapper } from "../engine/wrapper/element_wrapper.js";
import {gameSettings} from "../config/gameplay_config.js";

class ScoreBoard extends ElementWrapper {
    constructor(element) {
        super(element);
        this.score = 0;
        this.queue = [];
        this.maxUpdateTicks = 20
        this.updatePerTicks = gameSettings.system.tps / gameSettings.guis.scoreBoard.minCollectItemsPerSecond;
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
        let tps = gameSettings.system.tps;
        let itemPerSecond = gameSettings.guis.scoreBoard.minCollectItemsPerSecond;
        let maxUpdateTicks =  tps / itemPerSecond;
        this.updatePerTicks = Math.max((maxUpdateTicks - this.queue.length * tps / itemPerSecond / 3), 1);
        if(this.counter === 0) {
            //update
            if(this.queue.length > 0) {
                var addScore = this.queue.pop();
                this.scoreBoardFantom.pop();
                this.score += addScore;
                this.element.innerText = this.score;
            }
            //reset counter to this.updatePerTick
            this.counter = this.updatePerTicks;
        } else {
            this.counter --;
        }
    }
}

class ScoreBoardItem extends ElementWrapper {
    constructor(score = 0, element) {
        super(element);
        this.element.innerText = score > 0 ? '+'+score : score;
        if (score >= 0) {
            this.element.classList.add('positive');
        } else {
            this.element.classList.add('negative');
        }
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