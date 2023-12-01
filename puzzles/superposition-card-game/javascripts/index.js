class Card {

    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}

const app = new Vue({
    el: "#app",
    data: {
        title: "????",
        currentLevel: 1,
        currentLevelObject: {
            target: null,
            extras: []
        },
        levels: [
            [{
                target: 0,
                extras: [5, -5],
                moves: []
            }],
            [{
                target: 0,
                extras: [-5, -15],
                moves: [{name: "+5", func: x => x + 5}]
            }]
        ],
        LEVELMAX: 4,
        password: "PLACEHOLDER"
    },
    computed: {
        remainingBalls() {
            return [
                {
                    type: "green",
                    value: 1
                },
                {
                    type: "red",
                    value: 1
                }
            ]
        }
    },
    methods: {
        resetGame() {
            this.correct = false;
            this.currentLevel = 1;
            this.reset();
            this.resetSelection();
        }
    }
})
