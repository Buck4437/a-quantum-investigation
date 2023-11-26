const app = new Vue({
    el: "#app",
    data: {
        links: [{
            name: "Dating simlator",
            anchor: "./puzzles/superposition-ayane/index.html"
        },
        {
            name: "Quantum guess game (idk)",
            anchor: "./puzzles/entanglement-alice-bob/index.html"
        },
        {
            name: "Entanglement 1-1",
            anchor: "./puzzles/entanglement-fragment-1/index.html"
        },
        {
            name: "Entanglement 1-2",
            anchor: "./puzzles/entanglement-fragment-2/index.html"
        }],
        solves: 0
    }
})