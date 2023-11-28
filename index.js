const app = new Vue({
    el: "#app",
    data: {
        inputModel: "",
        solves: {
            intro: [true, true, true],
            // intro: [false, false, false],
            superposition: [false, false, false],
            interlude: [false],
            entanglement: [false, false, false],
            interlude2: [false, false],
            chaos: [false, false, false, false, false, false],
            meta: [false]
        },
        links: {
            intro: [
                {
                    name: "Beginning",
                    anchor: "./puzzles/intro-1/index.html",
                    answer: "WAREHOUSE"
                },
                {
                    name: "Warehouse",
                    anchor: "./puzzles/intro-2/index.html",
                    answer: "QUANTUM"
                },
                {
                    name: "First Glimpse into Quantum",
                    anchor: "./puzzles/intro-3/index.html",
                    answer: "SUPERPOSITION"
                }
            ],
            superposition: [
                {
                    name: "Inviting Rin",
                    anchor: "./puzzles/superposition-rin/index.html",
                    answer: "A"
                },
                {
                    name: "Missing Label",
                    anchor: "./puzzles/superposition-label-fix/index.html",
                    answer: "B"
                },
                {
                    name: "Interference (WIP)",
                    anchor: "./puzzles/superposition-label-fix/index.html",
                    answer: "C"
                },
            ],
            interlude: [
                {
                    name: "Second Glimpse into Quantum (WIP)",
                    anchor: "./puzzles/superposition-label-fix/index.html",
                    answer: "D"
                },
            ],
            entanglement: [
                {
                    name: "Alice and Bob's Entanglement",
                    anchor: "./puzzles/entanglement-alice-bob/index.html",
                    answer: "E"
                },
                {
                    name: "Missing Label 2 (WIP)",
                    anchor: "./puzzles/superposition-rin/index.html",
                    answer: "F"
                },
                {
                    name: "Quantum Arithmetic (WIP)",
                    anchor: "",
                    answer: "G"
                },
            ],
            interlude2: [
                {
                    name: "Entangled (WIP)",
                    anchor: "./puzzles/superposition-label-fix/index.html",
                    answer: "H"
                },
                {
                    name: "Puzzles (WIP)",
                    anchor: "./puzzles/superposition-label-fix/index.html",
                    answer: "H"
                },
            ],
            chaos: [
                {
                    name: "A",
                    anchor: "./puzzles/entanglement-alice-bob/index.html",
                    answer: "I"
                },
                {
                    name: "A",
                    anchor: "./puzzles/entanglement-alice-bob/index.html",
                    answer: "I"
                },
                {
                    name: "A",
                    anchor: "./puzzles/entanglement-alice-bob/index.html",
                    answer: "J"
                },
                {
                    name: "A",
                    anchor: "./puzzles/entanglement-alice-bob/index.html",
                    answer: "J"
                },
                {
                    name: "A",
                    anchor: "./puzzles/entanglement-alice-bob/index.html",
                    answer: "K"
                },
                {
                    name: "A",
                    anchor: "./puzzles/entanglement-alice-bob/index.html",
                    answer: "K"
                },

            ],
            meta: [
                {
                    name: "Farewell (WIP)",
                    anchor: "./puzzles/entanglement-alice-bob/index.html",
                    answer: "L"
                },
            ]
        }
    },
    computed: {
        calculatedIntros() {
            const intros = this.links.intro;
            const unlocked = []
            for (let i = 0; i < intros.length; i++) {
                if (i === 0 || this.solves.intro[i - 1] || this.solves.intro[i]) {
                    unlocked.push({
                        idx: i,
                        obj: intros[i]
                    });
                }
            }
            return unlocked;
        },
        unlockedInterlude() {
            return this.solves.superposition.map(x => x ? 1 : 0).reduce((a, b) => a + b, 0) >= 2;
        },
        unlockedInterlude2() {
            return this.solves.entanglement.map(x => x ? 1 : 0).reduce((a, b) => a + b, 0) >= 2;
        },
        unlockedMeta() {
            return this.solves.chaos.map(x => x ? 1 : 0).reduce((a, b) => a + b, 0) >= 4;
        }
    },
    methods: {
        submit() {
            const answer = this.inputModel.trim().toUpperCase();

            if (answer === "") {
                return;
            }

            this.inputModel = "";

            let solved = false;
            for (let key of Object.keys(this.links)) {
                const puzzles = this.links[key];
                for (let i = 0; i < puzzles.length; i++) {
                    const puzzle = puzzles[i];
                    if (answer === puzzle.answer) {
                        if (this.solves[key][i] === true) {
                            alert("You have already noted this down.");
                            return;
                        } else {
                            Vue.set(this.solves[key], i, true);
                            solved = true;
                        }
                    }
                }
            }
            
            if (solved) {
                alert("You noted this down your memo.");
            } else {
                alert("This doesn't seem useful... Maybe you shouldn't note this down.")
            }
        }
    },
    mounted() {
        this.$refs.memoField.addEventListener("keydown", e => {
            if (e.keyCode === 13) {
                this.submit();
            }
        })
    }
})