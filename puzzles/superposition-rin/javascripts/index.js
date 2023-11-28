const app = new Vue({
    el: "#app",
    data: {
        title: "Inviting Rin",
        exponent: -12,
        collapsed: false,
        textId: 0,
        texts: [
            "Stephen will be having a dinner with his friends. He wants to invite Rin to the dinner.",
            "However, for some unknown reason, Rin has rejected him three times in a row.",
            "As a result, Stephen has developed a sensor that tells you the rough possibility of outcomes.",
            "'These sensors aren't perfect,' he said.",
            "'Superposition states cannot be perfectly duplicated if we don't know its probabilities.'",
            "'All I have is a rough estimation in terms of exponent, but I hope it is good enough.'",
            "He sets the sensor to tell you whether Rin will accept. After that, you head to Rin's house.",
            "After Rin opens the door, she invites you in, and you two sit on the couch.",
            "You secretly pointed the sensor to Rin:",
            "Probability of success: 10^-12 %.",
            "Wow.",
            "Let's try to alter the probability."
        ],

        // Solve path: -12 -> -5 -> -10 -> -3 -> -6 -> 1 -> 2
        moves: [
            {
                name: "Comfort",
                effect: (vueObj) => {
                    vueObj.exponent += 7;
                }
            },
            {
                name: "Chatter",
                effect: (vueObj) => {
                    vueObj.exponent *= 2;
                }
            },
            {
                name: "Rephrase (Reset)",
                effect: (vueObj) => {
                    vueObj.exponent = -12;
                }
            },
            {
                name: "Ask (COLLAPSE STATE)",
                effect: (vueObj) => {
                    vueObj.measure();
                }
            },
        ]
    },
    computed: {
        loreText() {
            if (this.textId >= this.texts.length) {
                return null;
            }
            return this.texts[this.textId];
        },
        probability() {
            return `10^${this.exponent} %`;
        }
    },
    methods: {
        measure() {
            this.collapsed = true;
        },
        playMove(move) {
            move.effect(this);
        }
    },
    mounted() {
    }
})

// Suggested solve path: +11 => +5 => -2 => +5