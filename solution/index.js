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
    ],
    label2: [
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
    meta: [
        {name: "Warehouse", length: 7, index: 2, answer: "QUANTUM"},
        {name: "Inviting Rin", length: 7, index: 6, answer: "CAMPING"},
        {name: "Unstable Crates", length: 8, index: 1, answer: "COLLAPSE"},
        {name: "Missing Labels 2", length: 6, index: 5, answer: "LINKED"},
        {name: "Beginning", length: 9, index: 3, answer: "WAREHOUSE"},
        {name: "Alice and Bob's Entanglement", length: 8, index: 1, answer: "TOGETHER"},
        {name: "Missing Labels", length: 8, index: 3, answer: "MEASURES"},
        {name: "Package Delivery", length: 12, index: 7, answer: "TRANSMISSION"},
        {name: "First Glimpse into Quantum", length: 13, index: 13, answer: "SUPERPOSITION"},
        {name: "Second Glimpse into Quantum", length: 9, index: 3, answer: "ENTANGLED"},
        {name: "Entanglement", length: 6, index: 6, answer: "SPOOKY"}
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