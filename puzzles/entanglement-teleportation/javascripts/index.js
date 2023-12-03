const app = new Vue({
    el: "#app",
    data: {
        title: "Package Delivery",
        password: "asoudgaeifgeifgiwegfiewgife",
        page: 1,
        solved: false,
        level: 1,
        steps: [-1, -1, -1]
    },
    computed: {
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
            const state = this.initialState;
            for (const step of this.steps) {
                switch (step) {
                    case -1: break;
                    case 0:
                        state = {
                            ball: [state.ball[1], state.ball[0]],
                            entangled: state.ball
                        }
                    case 1:
                        state = {
                            ball: [state.ball[0] * 2, state.ball[1] * 2],
                            entangled: state.entangled
                        }
                    case 2:
                        state = {
                            ball: [state.ball[0] + state.ball[1], state.ball[1]],
                            entangled: state.entangled
                        }
                    case 3:
                        state = {
                            ball: [state.ball[0] - 2, state.ball[1] - 2],
                            entangled: state.entangled
                        }
                }
            }
            return [String(state.ball[0]) + state.entangled[0], String(state.ball[1]) + state.entangled[1]]
        }
    }
})
