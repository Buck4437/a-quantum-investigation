const app = new Vue({
    el: "#app",
    data: {
        inputModel: "",
        solves: {
            readme: [false],
            intro: [false, false, false],
            superposition: [false, false, false, false],
            interlude: [false, false],
            entanglement: [false, false, false, false],
            meta: [false]
        },
        links: {
            readme: [
                {
                    name: "What is this?",
                    anchor: "./puzzles/readme/index.html",
                    answer: "START"
                }
            ],
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
                    name: "Unstable Crates",
                    anchor: "./puzzles/superposition-crate/index.html",
                    answer: "C"
                },
                {
                    name: "Card game (WIP)",
                    anchor: "./puzzles/superposition-interference/index.html",
                    answer: "D"
                },
            ],
            interlude: [
                {
                    name: "Second Glimpse into Quantum (WIP)",
                    anchor: "./puzzles/interlude/index.html",
                    answer: "ENTANGLED"
                },
                {
                    name: "Entanglement",
                    anchor: "./puzzles/interlude/index.html",
                    answer: "SPOOKY"
                },
            ],
            entanglement: [
                {
                    name: "Alice and Bob's Entanglement",
                    anchor: "./puzzles/entanglement-alice-bob/index.html",
                    answer: "F"
                },
                {
                    name: "Missing Label 2 (WIP)",
                    anchor: "./puzzles/superposition-rin/index.html",
                    answer: "G"
                },
                {
                    name: "Quantum Arithmetic (WIP)",
                    anchor: "",
                    answer: "H"
                },
                {
                    name: "IDK (WIP)",
                    anchor: "",
                    answer: "I"
                },
            ],
            meta: [
                {
                    name: "Farewell (WIP)",
                    anchor: "./puzzles/finale/index.html",
                    answer: "ANYTIME ANYWHERE"
                },
            ]
        }
    },
    computed: {
        filteredIntros() {
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
        filteredInterludes() {
            const interludes = this.links.interlude;
            const unlocked = []
            for (let i = 0; i < interludes.length; i++) {
                if (i === 0 || this.solves.interlude[i - 1] || this.solves.interlude[i]) {
                    unlocked.push({
                        idx: i,
                        obj: interludes[i]
                    });
                }
            }
            return unlocked;
        },
        unlockedInterlude() {
            return this.solves.superposition.map(x => x ? 1 : 0).reduce((a, b) => a + b, 0) >= 2;
        },
        unlockedMeta() {
            return this.solves.entanglement.map(x => x ? 1 : 0).reduce((a, b) => a + b, 0) >= 4;
        }
    },
    methods: {
        submit() {
            const answer = this.inputModel.trim().toUpperCase().replaceAll(" ", "")

            if (answer === "") {
                return;
            }

            this.inputModel = "";

            let solved = false;
            for (let key of Object.keys(this.links)) {
                const puzzles = this.links[key];
                for (let i = 0; i < puzzles.length; i++) {
                    const puzzle = puzzles[i];
                    if (answer === puzzle.answer.replaceAll(" ", "")) {
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