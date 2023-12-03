const app = new Vue({
    el: "#app",
    data: {
        title: "Missing Label 2",
        level: 1,
        LEVELMAX: 7,
        text: {
            password: "PLACEHOLDER"
        },
        answers: [
            ("X12").split("\n").map(x => x.split("")),
            ("X1\n" +
             "X2").split("\n").map(x => x.split("")),
            ("XXX\n" +
             "X12").split("\n").map(x => x.split("")),
            ("34X\n" +
             "X12").split("\n").map(x => x.split("")),
            ("2XXX\n" +
             "1X34").split("\n").map(x => x.split("")),
            ("X564\n" +
             "12X3").split("\n").map(x => x.split("")),
            ("2X56\n" +
             "1X3X\n" +
             "XX4X").split("\n").map(x => x.split(""))
        ],
        highlighted: [-1, -1],
        pairs: {
            1: [[-1, -1], [-1, -1]],
            2: [[-1, -1], [-1, -1]],
            3: [[-1, -1], [-1, -1]],
        },
        seed: -1,
        correct: false,
        wrongTimer: 0
    },
    computed: {
        maxPair() {
            switch (this.level) {
                case 1: 
                case 2:
                case 3: return 1;
                case 4:
                case 5: return 2;
                case 6:
                case 7: return 3;
            }
            return 1;
        },
        curRows() {
            if (this.level > this.LEVELMAX) {
                return 0;
            }
            return this.answers[this.level - 1].length;
        },
        curCols() {
            if (this.level > this.LEVELMAX) {
                return 0;
            }
            return this.answers[this.level - 1][0].length;
        },
        allPairsFormed() {
            for (let i = 1; i <= this.maxPair; i++) {
                const pair = this.pairs[i];
                if (pair[0][0] === -1) {
                    return false;
                }
            }
            return true;
        }
    },
    methods: {
        isHighlighted(r, c) {
            return r === this.highlighted[0] && c === this.highlighted[1];
        },
        selected(r, c) {
            for (let prop of Object.keys(this.pairs)) {
                const pair = this.pairs[prop];
                for (const coord of pair) {
                    if (coord[0] === r && coord[1] === c) {
                        return [true, prop];
                    }
                }
            }
            return [false, -1];
        },
        getLabelDisplayColour(r, c) {
            const data = this.selected(r, c);
            if (data[0] === true) {
                return {
                    "1": "red",
                    "2": "light-blue",
                    "3": "pink"
                }[data[1]];
            }
            if (this.isHighlighted(r, c)) {
                return "yellow";
            }
            if (this.allPairsFormed) {
                return "grey";
            }
            return "";
        },
        getLabelDisplay(r, c) {
            const data = this.selected(r, c);
            if (data[0] === true) {
                return data[1];
            }
            return "";
        },
        getBallColour(r, c) {
            if (this.seed === -1) {
                return "";
            }
            const cell = this.answers[this.level - 1][r - 1][c - 1];
            const flooredSeed = Math.floor(this.seed % 8);
            switch (cell) {
                case "X":
                    return this.hash(r * 97 + c * 7) === 1 ? "red-color" : "blue-color";
                case "1":
                case "2":
                    return Math.floor(this.seed) % 2 === 1 ? "red-color" : "blue-color";
                case "3":
                case "4":
                    return Math.floor(this.seed / 2) % 2 === 1 ? "red-color" : "blue-color";
                case "5":
                case "6":
                    return Math.floor(this.seed / 4) % 2 === 1 ? "red-color" : "blue-color";
            }
        },
        // gives 0 or 1
        hash(x) {
            const seed = this.seed;
            const phi = (Math.sqrt(5) + 1) / 2;
            const val = ((x ** 2 + seed * Math.sin(seed)) * phi - Math.floor((x ** 2 + seed * Math.sin(seed)) * phi));
            return (String(Math.floor(val * 100000)).split("").map(x => Number(x)).reduce((a, b) => a + b, 0)) % 2
        },
        getCellDisplay() {
            if (this.level > this.LEVELMAX || this.seed == -1) {
                return "";
            }
            return "O";
        },
        measure() {
            if (this.seed === -1) {
                this.seed = Math.random() * 8 * 2 ** 20;
            }
        },
        reset() {
            if (this.seed != -1) {
                this.seed = -1;
            }
        },
        select(r, c) {
            if (this.correct) {
                return;
            }
            const data = this.selected(r, c)
            // No cell selected
            if (this.highlighted[0] === -1) {
                // This cell is marked: Remove the pair
                if (data[0] === true) {
                    this.pairs[data[1]] = [[-1, -1], [-1, -1]];
                    return;
                } else if (this.allPairsFormed) {
                    return;
                }
                this.highlighted = [r, c];
            } else {
                if (!this.isHighlighted(r, c)) {
                    // This cell is marked: Reform the bond
                    if (data[0] === true) {
                        this.pairs[data[1]] = [this.highlighted, [r, c]];
                    } else {
                        // Find an empty bond and use that
                        for (let prop of Object.keys(this.pairs)) {
                            const pair = this.pairs[prop];
                            if (pair[0][0] === -1) {
                                this.pairs[prop] = [this.highlighted, [r, c]];
                                break;
                            }
                        }

                    }
                }
                this.highlighted = [-1, -1];
            }
        },
        resetSelection() {
            if (this.correct) {
                return;
            }
            for (let prop of Object.keys(this.pairs)) {
                this.pairs[prop] = [[-1, -1], [-1, -1]];
            }
            this.highlighted = [-1, -1];
        },
        submit() {
            if (this.isCorrect()) {
                this.correct = true;
                this.wrongTimer = 0;
            } else {
                this.wrongTimer++;
                setTimeout(() => {
                    this.wrongTimer--;
                    if (this.wrongTimer < 0) {
                        this.wrongTimer = 0;
                    }
                }, 3000);
            }
            
        },
        isCorrect() {
            for (let i = 1; i <= this.maxPair; i++) {
                const pair = this.pairs[i];
                if (pair[0][0] === -1) {
                    return false;
                }
                const grid = this.answers[this.level - 1];
                const str1 = grid[pair[0][0] - 1][pair[0][1] - 1]; 
                const str2 = grid[pair[1][0] - 1][pair[1][1] - 1];
                
                if (!["12", "21", "34", "43", "56", "65"].includes(str1 + str2)) {
                    return false;
                }
            }
            return true;
        },
        proceed() {
            this.level++;
            this.correct = false;
            this.reset();
            this.resetSelection();
        },
        resetGame() {
            this.correct = false;
            this.level = 1;
            this.reset();
            this.resetSelection();
        }
    }
})
