const app = new Vue({
    el: "#app",
    data: {
        title: "First Glimpse into Quantum",
        seed: -1,
        seed2: -1,
        seed3: -1,
    },
    methods: {
        classOf(i, j, experiment=1) {
            if (experiment === 1) {
                if (this.seed == -1) {
                    return "";
                }
                const bitString = (this.seed >>> 0).toString(2).padStart(16, "0");
                return bitString[(i - 1) + ((j - 1) * 4)] === "0" ? "red" : "blue";
            } else {
                if (this.seed3 == -1) {
                    return "";
                }
                const bitString = (this.seed3 >>> 0).toString(2).padStart(16, "0");
                return bitString[(i - 1) + ((j - 1) * 4)] === "0" ? "big" : "small";
            }
        },
        openAll(experiment) {
            if (experiment === 1) {
                if (this.seed == -1) {
                    this.seed = Math.floor(Math.random() * (2**16))
                }
            } else if (experiment === 2) {
                this.seed2 = 0;
            } else {
                if (this.seed3 == -1) {
                    this.seed3 = Math.floor(Math.random() * (2**16))
                }
            }
        }
    },
    mounted() {
    }
})
