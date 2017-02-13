// vue instance
var vm = new Vue({
    el: "#app",
    data: {
        matrix: ["", "", "", "", "", "", "", "", ""],
        turn: "O",
        clickCount: 0,
        winner: "",
        playVs: "human"
    },
    methods: {
        handleClick: function(i) {
            this.play(i);
            if (this.playVs === "computer") {
                var i = 0;
                do {
                    i = (Math.random() * 9).toFixed(0);
                } while (this.matrix[i] !== "");

                this.play(i);
            }
        },

        play: function(i) {
            if (this.matrix[i] === "") {
                this.countUp();
                this.check(i);
                this.checkWinner();
                vm.$forceUpdate();
                this.changeTurn();
            }
        },

        countUp: function() {
            return this.clickCount++;
        },

        check: function(i) {
            return this.matrix[i] = this.turn;
        },

        changeTurn: function() {
            return this.turn = this.turn === "O" ? "X" : "O";
        },

        checkWinner: function() {
            var m = this.matrix;
            for (var i = 0; i < m.length; i++) {

                var rowCond = ((i == 0 || i == 3 || i == 6) && (m[i] == m[i + 1] && m[i] == m[i + 2] && m[i] != ""));

                var colCond = ((i == 0 || i == 1 || i == 2) && (m[i] == m[i + 3] && m[i] == m[i + 6] && m[i] != ""));

                var diagLCond = ((i == 0) && (m[i] == m[i + 4] && m[i] == m[i + 8] && m[i] != ""));

                var diagRCond = ((i == 2) && (m[i] == m[i + 2] && m[i] == m[i + 4] && m[i] != ""));

                var winCondition = rowCond || colCond || diagLCond || diagRCond;

                if (winCondition) {
                    this.winner = this.turn;
                    alert("the Winner is: " + this.winner);
                    this.reset();
                } else {
                    this.checkDraw();
                }
            }
        },

        checkDraw: function() {
            var emptyCells = this.matrix.filter(function(cell) {
                return cell === "";
            }).length;
            console.log(emptyCells);
            if (emptyCells === 0) {
                alert("it's draw");
                this.reset();
            }
        },

        reset: function() {
            for (var i = 0; i < this.matrix.length; i++) {
                this.matrix[i] = "";
                this.winner = "";
            }
            vm.$forceUpdate();
        }

    }
})