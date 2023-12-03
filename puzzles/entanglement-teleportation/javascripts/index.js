const app = new Vue({
    el: "#app",
    data: {
        title: "Package Delivery",
        password: "TRANSMISSION",
        page: 1,
        solved: false,
        level: 1,
        LEVELMAX: 3,
        steps: [-1, -1, -1, -1],
        isCorrect: false,
        stepName: ["Swap", "Amplify", "Sum"],


        buttonPressed: false
    },
    methods: {
        submit() {
            if (this.correctness === true) {
                this.isCorrect = true;
            }
        },
        next() {
            this.level++;
            this.isCorrect = false;
            this.steps = [-1, -1, -1, -1];
            if (this.level > this.LEVELMAX) {
                this.solved = true;
            }
        }
    },
    computed: {
        correctness() {
            const newState = this.output;
            return newState[0] === this.target[0] && newState[1] === this.target[1];
        },
        target() {
            switch (this.level) {
                // Suggested solution: Swap, Amplify
                case 1:
                    return ["2A", "0B"];
                // Suggested solution: Sum, Sum, Swap
                case 2:
                    return ["1A", "2B"];
                // Suggested solution: Sum, Sum, Sum, Amplify 
                case 3:
                    return ["6A", "2B"];
            }
            return ["", ""]
        },
        initialState() {
            return {
                ball: [0, 1],
                entangled: ["A", "B"]
            }
        },
        maxPage() {
            if (!this.solved) {
                return 2;
            }
            return 3;
        },
        output() {
            // Prevent mutation
            const state = {
                ball: this.initialState.ball,
                entangled: this.initialState.entangled
            };

            for (const step of this.steps) {
                switch (step) {
                    case -1: break;
                    case 0: {
                        const newState = [state.ball[1], state.ball[0]];
                        state.ball = newState;
                        break;
                    }
                    case 1: {
                        const newState = [state.ball[0] * 2, state.ball[1] * 2];
                        state.ball = newState;
                        break;
                    }
                    case 2: {
                        const newState = [state.ball[0] + state.ball[1], state.ball[1]];
                        state.ball = newState;
                        break;
                    }   
                }
            }
            return [String(state.ball[0]) + state.entangled[0], String(state.ball[1]) + state.entangled[1]]
        }
    }
})
