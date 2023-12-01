

const app = new Vue({
    el: "#app",
    data: {
        title: "Destructive Interference",
        currentLevel: 1,
        currentLevelObject: {
            target: null,
            extras: []
        },
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
