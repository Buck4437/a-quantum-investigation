const app = new Vue({
    el: "#app",
    data: {
        title: "Entanglement",
        seed: -1,
        seed2: -1,
        seed3: -1
    },
    methods: {
        idToColour(i) {
            return [null, "red-border", "yellow-border", "light-blue-border", "green-border"][i];
        },
        classOf(i, j, inverted, experiment=1) {
            if (experiment === 1) {
                if (this.seed == -1) {
                    return "";
                }
                const bitString = (this.seed >>> 0).toString(2).padStart(16, "0");
                return ((bitString[(i - 1) + ((j - 1) * 4)] === "0") !== inverted)? "red" : "blue";
            } else if (experiment === 2 || experiment === 3) {
                // We only use the i value.
                if (this.seed == -1) {
                    return "";
                }
                const bitString = (this.seed >>> 0).toString(2).padStart(4, "0");
                return ((bitString[i - 1] === "0") !== inverted)? "red" : "blue";
            } 
        },
        openAll(experiment) {
            if (experiment === 1) {
                if (this.seed == -1) {
                    this.seed = Math.floor(Math.random() * (2**16))
                }
            } else if (experiment === 2) {
                if (this.seed2 == -1) {
                    this.seed2 = Math.floor(Math.random() * (2**4))
                }
            } else {
                this.seed3 = 1;
            }
        }
    },
    mounted() {
    }
})
