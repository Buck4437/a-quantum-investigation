const app = new Vue({
    el: "#app",
    mixins: [Entanglement.Mixins.Cube],
    data: {
        title: "The ANSWER is...",
        states: "?ANSWER"
    }
})
