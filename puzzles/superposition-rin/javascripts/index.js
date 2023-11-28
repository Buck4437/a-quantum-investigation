const app = new Vue({
    el: "#app",
    data: {
        title: "Inviting Rin",
        exponent: -18,
        collapsed: false,
        textId: 0,
        texts: [
            "You want to ask Ayana out for a meal.",
            "Professor Hiro has given you a secret weapon, a sensor that tells you the possibility of outcomes.",
            "You thanked Professor Hiro, set the sensor to tell you that, if Ayana would accept your invitation to a meal.",
            "You saw Ayana at the sidewalk, and you pointed the sensor to Ayane:",
            "Probability: 0.0000000000000001%.",
            "Wow. She must have hated you.",
            "However, you have prepared an extra sets of manevours, to hopefully bump up the possibility of getting a yes.",
            "After all, the answer is not defined before you ask her out!",
            "You are pretty sure that these manevours will only multiply or divide probabilities. "
            + "You aren't sure how well the manevours performs though. Maybe you will need to note them down somewhere.",
            "Use these manevours carefully, and tip the balance to your favour.",
            "But don't tip the balance too much, if the probability exceeds 100% (or is too low), Ayane will become suspicious and leave!",
            "In case you failed though, you can reset by begging to Professor Hiro. He has a time machine that can reset everything. Probably."
        ],
        moves: [
            {
                name: "Favourite food",
                effect: (vueObj) => {
                    vueObj.exponent += 5;
                }
            },
            {
                name: "Talk about Quantum Mechanics",
                effect: (vueObj) => {
                    vueObj.exponent += 11;
                }
            },
            {
                name: "Tell a joke",
                effect: (vueObj) => {
                    vueObj.exponent -= 2;
                }
            },
            {
                name: "Act dumb",
                effect: (vueObj) => {
                    vueObj.exponent -= 7;
                }
            },
            {
                name: "Ask for a meal (COLLAPSE STATE)",
                effect: (vueObj) => {
                    vueObj.measure();
                }
            },
            {
                name: "Reset",
                effect: (vueObj) => {
                    vueObj.reset();
                }
            }
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
            const realExp = this.exponent + 2;
            if (this.expoenent < -16) {
                return `0% (10^${realExp}%)`;
            }
            const number = 10 ** realExp;
            return `${number.toFixed(18).replace(/\.?0+$/,"")}% (10^${realExp}%)`
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