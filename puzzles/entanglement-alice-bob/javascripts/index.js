const app = new Vue({
    el: "#app",
    data: {
        title: "Alice and Bob's entanglement",
        text: {
            input: "",
            aliceGen: "",
            guess: "",
            answer: "",
            password: "TOGETHER"
        },
        level: 1,
        LEVELMAX: 4,
        streak: 0,
        canSubmit: false,
        showStat: false
    },
    computed: {
        getGuessClass() {
            if (this.text.guess === this.text.answer) {
                return ["green"];
            } else {
                return ["red"];
            }
        },
        bobText() {
            if (this.showStat) {
                return this.text.answer;
            }
            return "?";
        }
    },
    methods: {
        generate() {
            switch (this.level) {
                case 1: {
                    const str = ["ANT", "BIN", "CAT", "DOG", "EGG"][Math.floor(Math.random() * 5)];
                    this.text.aliceGen = str;
                    this.text.answer = str;
                    break;
                }
                case 2: {
                    const aNum = Math.floor(Math.random() * 79) + 10;
                    const bNum = 100 - aNum;
                    this.text.aliceGen = aNum.toString(10);
                    this.text.answer = bNum.toString(10);
                    break;
                }
                case 3: {
                    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    const aIdx = Math.floor(Math.random() * 26);
                    const bIdx = (aIdx + 4) % 26;
                    this.text.aliceGen = alphabet.charAt(aIdx);
                    this.text.answer = alphabet.charAt(bIdx);
                    break;
                }
                case 4: {
                    // S = same, F = flipped
                    const relation = "SSFF";
                    let aStr = "";
                    let bStr = "";
                    for (let i = 0; i < 5; i++) {
                        const val = Math.floor(Math.random() * 2);
                        aStr += val.toString(10); 
                        if (relation[i] == "S") {
                            bStr += val.toString(10);
                        } else {
                            bStr += (1 - val).toString(10);
                        }
                    }
                    this.text.aliceGen = aStr;
                    this.text.answer = bStr;
                    break;
                }
            }
            
            this.canSubmit = true;
        },
        filter(text) {
            return text.trim();
        },
        submit(giveUp = false) {
            this.canSubmit = false;
            if (giveUp) {
                this.text.guess = "-";
            } else {
                this.text.guess = this.filter(this.text.input);
                if (this.text.guess === "") {
                    this.text.guess = "-";
                }
            }
            this.text.input = "";

            if (this.text.guess == this.text.answer.trim()) {
                this.streak++;
            } else {
                this.streak = 0;
            }
            this.showStat = true;
        },
        proceed() {
            this.showStat = false;

            if (this.streak >= 3) {
                this.level ++;
                this.streak = 0;
            }
            this.generate();
        },
        reset() {
            this.level = 1;
            this.streak = 0;
            this.showStat = false;
            this.canSubmit = false;
            this.generate();
        }
    },
    mounted() {
        this.$refs.guessSubmissionField.addEventListener("keydown", e => {
            if (e.keyCode === 13) {
                this.submit();
            }
        })

        this.generate();
    }
})
