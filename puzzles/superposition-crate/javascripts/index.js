// Base freq is 1
// Period should be multiple of 2 PI (Ideally 2PI)
const waveFunctions = {
    1: (freq, theta) => {
        return Math.sin(freq * theta);
    },

    2: (freq, theta) => {
        return Math.tan(freq * theta) / 5;
    },
    
    3: (freq, theta) => {
        const x = theta / Math.PI / 2 * freq;
        return 2 * (x * 2 - Math.floor(x * 2)) - 1;
    },

    4: (freq, theta) => {
        const x = theta / Math.PI * freq;
        return (Math.floor(x - 0.5) % 2 === 0 ? 0.5 : -0.5);
    },

    5: (freq, theta) => {
        const x = theta / Math.PI * freq;
        return 4 * Math.abs(x - Math.floor(x + 3/4) + 1/4) - 1;
    }
}

const waveComponent = Vue.component("wave-diagram", {
    props: {
        mode: Number,
        // 0.1 to 10?
        freq: Number,
        // -10 to 10, for y axis?
        offset: Number,
        colour: String,
        update: Number,
        inverted: Boolean
    },
    methods: {
        repaint() {
            const c = this.$refs.canvas;

            if (c != null && c != undefined) {
                const ctx = c.getContext("2d");
                ctx.clearRect(0, 0, c.width, c.height); 

                // Base line, (x, y)
                ctx.beginPath();
                ctx.strokeStyle = "grey";
                ctx.moveTo(0, 100);
                ctx.lineTo(600, 100);
                ctx.stroke();

                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.moveTo(0, this.calc(0));
                for (let i = 1; i <= 600; i += 1) {
                    ctx.lineTo(i, this.calc((i / 600) * 2 * Math.PI));
                }
                ctx.stroke();
            }
        },
        calc(theta) {
            // Range: 10 - 190
            const coord = 100 - (waveFunctions[this.mode](this.freq, theta) * 90);
            return this.inverted ? 200 - coord : coord;
        }
    },
    watch: {
        mode() {
            this.repaint();
        },
        freq() {
            this.repaint();
        },
        offset() {
            this.repaint();
        },
        colour() {
            this.repaint();
        },
        update() {
            this.repaint();
        } 
    },
    mounted() {
        this.repaint();
    },
    template: `
        <div class="wave-diagram">
            <canvas width="600" height="200" ref="canvas"></canvas>
        </div>
    `
})

const app = new Vue({
    el: "#app",
    data: {
        title: "Unstable Crates",

        phase: 1,
        MAXPHASE: 3,

        updateBit: 0,

        textId: 100,
        // textId: 0,
        password: "wofuwheofhwofhwoefhwofhoiwefioh)OWEFHOWEIFLNEWF",
        text: [
            "Stephen brings you to a section of the warehouse.",
            "He opens the door. You saw a bunch of metal crates.",
            "'Be cafeful, these quantum crates are very unstable. They tend heat up and fume whenever it is measured.'",
            "'It has a very slim chance of stablising. And a large chance of not being stable.'",
            "'Anyways, I have made a device that might be able to cancel out the unstable states...'",
            "He hands a device to you.",
            "WIP: Image",
            "'There are three types of crates here. Use this device to stablise all of the crates.'",
            "'I believe in you.'",
            "After handing over the device to you. He runs out immediately.",
            "Looks like you have some work to do."
        ]
    },
    computed: {
        loreText() {
            if (this.textId >= this.text.length) {
                return null;
            }
            return this.text[this.textId];
        }
    },
    methods: {
        advanceStory() {
            this.actionText = "";
            this.phase++;
        },
        progressText() {
            textId++;
        },
        resetGame() {
            this.phase = 1;
            this.textId = 0;
        }
    },
    mounted() {
        setTimeout(() => {
            this.updateBit += 1;
        }, 100);
    }
})
