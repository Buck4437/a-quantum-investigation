const app = new Vue({
    el: "#app",
    data: {
        inputModel: "",
        solves: {
            intro: [true, true, true],
            // intro: [false, false, false],
            superposition: [false, false, false],
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
                    name: "Missing Label",
                    anchor: "./puzzles/superposition-label-fix/index.html",
                    answer: "??????????????????????????????"
                },
            ],
            entanglement: [

            ],
            chaos: [

            ]
        }
        // links: [{
        //     name: "Dating simlator",
        //     anchor: "./puzzles/superposition-ayane/index.html"
        // },
        // {
        //     name: "Quantum guess game (idk)",
        //     anchor: "./puzzles/entanglement-alice-bob/index.html"
        // },
        // {
        //     name: "Entanglement 1-1",
        //     anchor: "./puzzles/entanglement-fragment-1/index.html",
        //     answer: "106395"
        // },
        // {
        //     name: "Entanglement 1-2",
        //     anchor: "./puzzles/entanglement-fragment-2/index.html",
        //     answer: "106395"
        // }]
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