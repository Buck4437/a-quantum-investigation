const app = new Vue({
    el: "#app",
    data: {
        title: "First Glimpse into Quantum",
        seed: -1,
        seed2: -1
    },
    methods: {
        classOf(i, j) {
            if (this.seed == -1) {
                return "";
            }
            const bitString = (this.seed >>> 0).toString(2).padStart(16, "0");
            return bitString[(i - 1) + ((j - 1) * 4)] === "0" ? "red" : "blue";
        },
        openAll(experiment) {
            if (experiment === 1) {
                if (this.seed == -1) {
                    this.seed = Math.floor(Math.random() * (2**16))
                }
            } else {
                this.seed2 = 0;
            }
        }
    },
    mounted() {
    }
})
