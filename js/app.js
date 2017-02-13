// vue instance
var vm = new Vue({
    el: "#app",

    // game data
    data: {
        // table cells content
        matrix: ["", "", "", "", "", "", "", "", ""],

        // for whom the current turn is ("O", "X")
        turn: "O",

        // the total number of clicks
        clickCount: 0,

        // the winner sign ("O", "X")
        winner: "",

        //the default adversary ("human", "computer")
        playVs: "human"
    },

    // game methods
    methods: {

        /**
         * the function to call when a cell is clicked
         * the param "i" is the index of the clicked cell in the matrix
         */
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

        // handle the logic of playing
        play: function(i) {
            if (this.matrix[i] === "") {
                this.countUp();
                this.check(i);
                this.checkWinner();
                vm.$forceUpdate(); // force vue instance to re-render
                this.changeTurn();
            }
        },

        // increase the click counter
        countUp: function() {
            return this.clickCount++;
        },

        // set the content of the clicked cell to current turn sign
        check: function(i) {
            return this.matrix[i] = this.turn;
        },

        // change turn sign
        changeTurn: function() {
            return this.turn = this.turn === "O" ? "X" : "O";
        },

        // check for winner
        checkWinner: function() {
            var m = this.matrix;
            for (var i = 0; i < m.length; i++) {

                // condition for gaining a row
                var rowCond = ((i == 0 || i == 3 || i == 6) && (m[i] == m[i + 1] && m[i] == m[i + 2] && m[i] != ""));

                // condition for gaining a column
                var colCond = ((i == 0 || i == 1 || i == 2) && (m[i] == m[i + 3] && m[i] == m[i + 6] && m[i] != ""));

                // condition for gaining the left diagonal
                var diagLCond = ((i == 0) && (m[i] == m[i + 4] && m[i] == m[i + 8] && m[i] != ""));

                // condition for gaining the right diagonal
                var diagRCond = ((i == 2) && (m[i] == m[i + 2] && m[i] == m[i + 4] && m[i] != ""));

                // condition for gaining the game
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

        // check for game draw
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

        // reset the game
        reset: function() {
            for (var i = 0; i < this.matrix.length; i++) {
                this.matrix[i] = "";
                this.winner = "";
            }
            vm.$forceUpdate();
        }

    }
})