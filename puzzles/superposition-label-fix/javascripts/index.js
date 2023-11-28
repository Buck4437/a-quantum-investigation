const app = new Vue({
    el: "#app",
    data: {
        title: "Missing Label",
        level: 1,
        LEVELMAX: 4,
        text: {
            password: "ANBCEFIJ"
        },
        answers: [
            ("1X3X5\n" +
            "2X4X6").split("\n").map(x => x.split(""))
        ],
        highlighted: [-1, -1],
        pairs: {
            1: [[-1, -1], [-1, -1]],
            2: [[-1, -1], [-1, -1]],
            3: [[-1, -1], [-1, -1]],
        },
        seed: -1
    },
    computed: {
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
        threePairsFormed() {
            for (let key of Object.keys(this.pairs)) {
                const pair = this.pairs[key];
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
            return "";
        },
        getLabelDisplay(r, c) {
            const data = this.selected(r, c);
            if (data[0] === true) {
                return data[1];
            }
            return "";
        },
        getCellDisplay(r, c) {
            if (this.level > this.LEVELMAX || this.seed == -1) {
                return "?";
            }
            const cell = this.answers[this.level - 1][r - 1][c - 1];
            switch (cell) {
                case "X":
                    return "";
                case "1":
                case "2":
                    return String(this.seed % 2 + 1) === cell ? "O" : "";
                case "3":
                case "4":
                    return String(Math.floor(this.seed / 2) % 2 + 3) === cell ? "O" : "";
                case "5":
                case "6":
                    return String(Math.floor(this.seed / 4) % 2 + 5) === cell ? "O" : "";
            }
        },
        measure() {
            if (this.seed === -1) {
                this.seed = Math.floor(Math.random() * 8);
            }
        },
        reset() {
            if (this.seed != -1) {
                this.seed = -1;
            }
        },
        select(r, c) {
            const data = this.selected(r, c)
            // No cell selected
            if (this.highlighted[0] === -1) {
                // This cell is marked: Remove the pair
                if (data[0] === true) {
                    this.pairs[data[1]] = [[-1, -1], [-1, -1]];
                } else if (this.threePairsFormed) {
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
        }
    },
    mounted() {
    }
})

// Suggested solve path: +11 => +5 => -2 => +5