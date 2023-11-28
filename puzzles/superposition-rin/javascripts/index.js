const app = new Vue({
    el: "#app",
    data: {
        title: "Inviting Rin",
        exponent: -10,
        default: [-10, -1, null],
        phase: 1,
        MAXPHASE: 2,
        actionText: "",
        textId: 0,
        password: "AWDIGEIFGHEIFGFEFEFJ)OWEFHOWEIFLNEWF",
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
        text2: [
            "You invited Rin for dinner.",
            "'Hmm. I think-' before she can finish her sentence, you hear a knock from the door.",
            "'Please wait,' Rin said.",
            "She heads outside the house. Fifteen minutes later, she comes back to the room.",
            "She doesn't look good.",
            "You pointed the sensor to Rin:",
            "Probability of success: 10^-10 %.",
            "Something bad must have happened.",
            "'What's the matter?' You decide to switch the topic. You will need to alter the probability once again."
        ],
        text3: [
            "You invited Rin for dinner again.",
            "'Yeah, I can come over,' she said.",
            "'Great, I will see you at Stephen's hosue then.'",
            "After some effort, you have finally shifted the probability to your favour."
        ],

        // Phase 1: -10 -> -3 -> -6 -> 1 -> 2
        // Phase 2: -1 -> -2 -> -4 -> -17 -> -10 -> -3 -> -6 -> 1 -> 2
        moves: [
            {
                name: "Converse (+7)",
                unlocks: () => true,
                effect: (vueObj) => {
                    if (vueObj.exponent != null) {
                        vueObj.exponent += 7;
                        vueObj.actionText = "You converse with Rin.";
                    }
                }
            },
            {
                name: "Chatter (x2)",
                unlocks: () => true,
                effect: (vueObj) => {
                    if (vueObj.exponent != null) {
                        vueObj.exponent *= 2;
                        vueObj.actionText = "You chatter with Rin.";
                    }
                }
            },
            {
                name: "Clack (-13)",
                unlocks: phase => phase >= 2,
                effect: (vueObj) => {
                    if (vueObj.exponent != null) {
                        vueObj.exponent -= 13;
                        vueObj.actionText = "You clack at Rin.";
                    }
                }
            },
            {
                name: "Rephrase (Reset)",
                unlocks: () => true,
                effect: (vueObj) => {
                    vueObj.exponent = vueObj.default[vueObj.phase - 1];
                    vueObj.actionText = "You rephased. The probability has been reset.";
                }
            }
        ]
    },
    computed: {
        filteredMoves() {
            return this.moves.filter(x => x.unlocks(this.phase))
        },
        loreText() {
            switch (this.phase) {
                case 1:
                    if (this.textId >= this.texts.length) {
                        return null;
                    }
                    return this.texts[this.textId];
                case 2:
                    if (this.textId >= this.text2.length) {
                        return null;
                    }
                    return this.text2[this.textId];
                case 3:
                    if (this.textId >= this.text3.length) {
                        return null;
                    }
                    return this.text3[this.textId];
            }
        },
        probability() {
            if (this.exponent === null) {
                return `0%`;
            }
            return `10^${this.exponent} %`;
        }
    },
    methods: {
        ask() {
            this.actionText = "";
            this.phase++;
            this.textId = 0;
            this.exponent = this.default[this.phase - 1];
        },
        playMove(move) {
            move.effect(this);
            if (this.exponent > 2) {
                this.actionText = "The exponent is too high. Rin is suspicious at your behaviour."
                this.exponent = null;
            }
        },
        progressText() {
            textId++;
        },
        resetGame() {
            this.phase = 1;
            this.textId = 0;
            this.exponent = this.default[0];
        }
    }
})
