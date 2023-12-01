const app = new Vue({
    el: "#app",
    data: {
        title: "Inviting Rin",
        prob: 1,
        phase: 1,
        MAXPHASE: 1,
        actionText: "",
        textId: 0,
        password: "wofuwheofhwofhwoefhwofhoiwefioh)OWEFHOWEIFLNEWF",
        text1: [
            "Stephen brings you to a section of the warehouse.",
            "He opens the door. You saw a bunch of"
        ],
        text2: [
            ""
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
        }
    },
    methods: {
        advanceStory() {
            this.actionText = "";
            this.phase++;
            this.textId = 0;
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
