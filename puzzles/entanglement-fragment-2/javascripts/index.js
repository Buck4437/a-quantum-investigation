const app = new Vue({
    el: "#app",
    mixins: [Entanglement.Mixins.Cube],
    data: {
        title: "Mysterious Cube",
        lineColour: "green",
        states: "?123456"
    }
})
