export const gameTps = 120;

export const tileDefaultSpeed = 200;

export const wareboxSpeed = 300;

export const wareboxBulletCount = 10;

export const bulletSpeed = 1280;

export let gameSettings = {
    guis: {
        scoreBoard: {
            minCollectItemsPerSecond: 5,
        },
    },
    entities: {
        player: {
            defaultLifeCount: 5,
            maxLifeCount: 10,
            healthPointsPerLife: 100,
            startingEnergy: 50,
            roleChangeCost: 0,
        },
        bullet: {
            speedX: 200,
            speedY: 800,
        },
    },
    components: {
        autoMove: {
            defaultSpeedX: 0,
            defaultSpeedY: 200,
        }
    },
    system: {
        tps: 120,
        seed: 114514,
        generator: {
            threshold: 3,
            gridWidth: 50,
            gridHeight: 50,
            speed: 200,
        }
    },
}


/*
    DO NOT CHANGE
    DO NOT CHANGE
    DO NOT CHANGE
 */

export const playerRole = [
    "bullet",
    "shotgun",
    "missile",
    "nuclear",
]

export const roleAssets = [
    "assets/images/spirits/players/default.png",
    "assets/images/spirits/players/shotgun.png",
    "assets/images/spirits/players/missile.webp",
    "assets/images/spirits/players/nuclear.jpg",
]