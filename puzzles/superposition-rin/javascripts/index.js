const app = new Vue({
    el: "#app",
    data: {
        title: "Inviting Rin",
        prob: 1,
        phase: 1,
        MAXPHASE: 1,
        actionText: "",
        textId: 0,
        password: "CAMPING",
        text1: [
            "Stephen will be having a dinner with his friends. He wanted to invite Rin to the dinner.",
            "However, for some unknown reason, Rin has rejected him three times in a row.",
            "'I wish I have a device similar to the one I have for boxes,' he said.",
            "'But all I have is a sensor that estimates possibilities of outcomes.'",
            "'These sensors aren't perfect, but it should be good enough,' he said.",
            "After configuring the sensor, you head to Rin's house.",
            "Rin opened the door and invites you in. You two sat on the couch.",
            "You looked at the sensor:",
            "Probability of success: 1%.",
            "Wow.",
            "Let's try to alter the probability."
        ],
        text2: [
            "You invited Rin for dinner.",
            "'Yeah, I can come over,' she said.",
            "'Great, I will see you at Stephen's hosue then.'",
            "After some effort, you have finally shifted the probability to your favour."
        ],

        // Suggested solution: 1 -> 8 -> 12 -> 18 -> 27 -> 40 -> 60 -> 67 -> 100
        moves: [
            {
                name: "Converse (+7)",
                effect: (vueObj) => {
                    vueObj.prob += 7;
                    vueObj.actionText = "You converse with Rin.";
                }
            },
            {
                name: "Chatter (x1.5)",
                effect: (vueObj) => {
                    vueObj.prob = Math.floor(vueObj.prob + vueObj.prob / 2);
                    vueObj.actionText = "You chatter with Rin.";
                }
            },
            {
                name: "Reset",
                effect: (vueObj) => {
                    vueObj.prob = 1;
                    vueObj.actionText = "";
                }
            }
        ]
    },
    computed: {
        loreText() {
            switch (this.phase) {
                case 1:
                    if (this.textId >= this.text1.length) {
                        return null;
                    }
                    return this.text1[this.textId];
                case 2:
                    if (this.textId >= this.text2.length) {
                        return null;
                    }
                    return this.text2[this.textId];
            }
        },
        probability() {
            return `${this.prob} %`;
        }
    },
    watch: {
        prob() {
            this.repaint();
        },
        loreText() {
            this.repaint();
        }
    },
    methods: {
        repaint() {
            // Code modified from https://codepen.io/alsheuski/pen/eJNwNX
            const center = 100, radius = 70;

            const c = this.$refs.canvas;

            if (c != null && c != undefined) {
                const ctx = c.getContext("2d");
                ctx.clearRect(0, 0, c.width, c.height); 

                const grad = ctx.createLinearGradient(0, center - radius, 0, center + radius);
                grad.addColorStop(0, "red");
                grad.addColorStop(1, "yellow");

                
                const grad2 = ctx.createLinearGradient(0, center - radius, 0, center + radius);
                grad2.addColorStop(0, "lime");
                grad2.addColorStop(1, "yellow");

                ctx.beginPath();
                ctx.arc(center, center, radius, 0, 2 * Math.PI, false);
                ctx.lineWidth = 20;
                ctx.strokeStyle = "#444444";
                ctx.stroke();

                const angle = 1.5 * Math.PI + this.prob / 50 * Math.PI;

                ctx.beginPath();
                ctx.arc(center, center, radius, 1.5 * Math.PI, Math.min(2.5 * Math.PI, angle), false);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 20;
                ctx.stroke();

                if (angle > 2.5 * Math.PI) {
                    ctx.beginPath();
                    ctx.arc(center, center, radius, 2.5 * Math.PI, angle, false);
                    ctx.strokeStyle = grad2;
                    ctx.lineWidth = 20;
                    ctx.stroke();
                }
            }
            
        },
        ask() {
            this.actionText = "";
            this.phase++;
            this.textId = 0;
        },
        playMove(move) {
            move.effect(this);
            if (this.prob > 100) {
                this.prob = 1;
            }
        },
        progressText() {
            textId++;
        },
        resetGame() {
            this.phase = 1;
            this.textId = 0;
            this.prob = 1;
        }
    }
})
