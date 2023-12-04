const answers = {
    label1: [
        ("1X3X5\n" +
        "2X4X6").split("\n").map(x => x.split("")),
        ("1X5\n" +
        "2X6\n" +
        "34X").split("\n").map(x => x.split("")),
        ("12X\n" +
        "X34\n" +
        "56X").split("\n").map(x => x.split("")),
        ("X34X\n" +
        "1256\n" +
        "XXXX").split("\n").map(x => x.split("")),
    ]
}

Vue.component("solution-display", {
    data() {
        return {
            isOpen: false
        }
    },
    props: {
        title: String
    },
    template: `
    <div class="solution-display">
        <div class="solution-header">
            <button @click="isOpen = !isOpen">{{isOpen ? "-" : "+"}}</button> {{title}}
        </div>
        <div v-show="isOpen" class="solution">
            <slot></slot>
        </div>
    </div>
    `
})

const app = new Vue({
    el: "#app",
    data: {
        answers
    },
    methods: {
        labelGetData(cell) {
            switch (cell) {
                case "1": case "2": return {class: 'red-bg', text: '1'}
                case "3": case "4": return {class: 'light-blue-bg', text: '2'}
                case "5": case "6": return {class: 'pink-bg', text: '3'}
            }
            return {class: '', text: ''}
        }
    }
})