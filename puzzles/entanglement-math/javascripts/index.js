const app = new Vue({
    el: "#app",
    data: {
        title: "Math",
        currentLevel: 1,
        levels: [
            [
                
            ]
        ],
        LEVELMAX: 4,
        password: "PLACEHOLDER"
    },
    computed: {
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
