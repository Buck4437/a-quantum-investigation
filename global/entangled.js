const SAVE_NAME_SUFFIX = "Buck4437_202311_Quantum_Puzzle_Hunt_Entanglement_Pairing"

const Entanglement = {
    sendData(key, value) {
        const saveKey = SAVE_NAME_SUFFIX + key;
        console.log("Wrote", saveKey, value);
        localStorage.setItem(saveKey, value);
    },
    readData(key) {
        const saveKey = SAVE_NAME_SUFFIX + key;
        const item = localStorage.getItem(saveKey);
        console.log("Fetched", saveKey, item);
        return item;
    },
    Mixins: {
        Cube: {
            data: {
                // Possible states: 0, 1, 2, 3, 4, 5 (X, Y, Z) axis
                state: -1,
                states: "?012345",
                lineColour: "blue",
                lineTimer: {
                    0: 0,
                    1: 0,
                    2: 0
                }
            },
            computed: {
                qubit() {
                    return this.states.charAt(this.state + 1);
                }
            },
            methods: {
                measure(axis) {
                    const data = parseInt(this.read(), 10);

                    this.lineTimer[axis]++;

                    this.draw();

                    setTimeout(() => {
                        this.lineTimer[axis]--;
                        this.draw();
                    }, 300);
                    
                    if (axis === Math.floor(data / 2)) {
                        this.state = data;
                    } else {
                        const bit = Math.floor(Math.random() * 2);
                        const newState = axis * 2 + bit;
                        this.state = newState;
        
                        this.send(newState);
                    }
                },
                send(data) {
                    Entanglement.sendData("cube", data);
                },
                read() {
                    return Entanglement.readData("cube");
                },
                draw() {
                    const canvas = this.$el.querySelector("canvas");
                    if (canvas !== null) {
                        const avg = (a, b) => {
                            return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
                        }

                        var ctx = canvas.getContext('2d');
                                            
                        ctx.lineWidth = 5;
                        ctx.strokeStyle = this.lineColour;

                        // x, y
                        const top = [250, 50];
                        const leftTop = [90, 150];
                        const rightTop = [410, 150];
                        const center = [250, 250];
                        const leftBottom = [90, 350];
                        const rightBottom = [410, 350];
                        const bottom = [250, 450];

                        const lines = [
                            [top, rightTop], [rightTop, center], [center, leftTop], [leftTop, top],
                            [top, center], [center, bottom], [leftTop, leftBottom], [rightTop, rightBottom],
                            [bottom, rightBottom], [rightBottom, center], [center, leftBottom], [leftBottom, bottom],
                        ]

                        for (let line of lines) {
                            ctx.beginPath();
                            ctx.moveTo(line[0][0], line[0][1]);
                            ctx.lineTo(line[1][0], line[1][1]);
                            ctx.stroke();
                        }

                        const axis = {
                            0: [leftBottom, rightTop],
                            1: [top, bottom],
                            2: [leftTop, rightBottom]
                        }

                        ctx.strokeStyle = 'red';

                        for (let i = 0; i < 3; i++) {
                            if (this.lineTimer[i] > 0) {
                                const line = axis[i];
                                ctx.beginPath();
                                ctx.moveTo(line[0][0], line[0][1]);
                                ctx.lineTo(line[1][0], line[1][1]);
                                ctx.stroke();
                            }
                        }

                    }
                }
            },            
            mounted() {
                this.draw();
            }
        }
    }
}
