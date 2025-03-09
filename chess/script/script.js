const board = [
    ['\u265C', '\u265E', '\u265D', '\u265B', '\u265A', '\u265D', '\u265E', '\u265C'], 
    ['\u265F', '\u265F', '\u265F', '\u265F', '\u265F', '\u265F', '\u265F', '\u265F'], 
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['\u2659', '\u2659', '\u2659', '\u2659', '\u2659', '\u2659', '\u2659', '\u2659'],
    ['\u2656', '\u2658', '\u2657', '\u2655', '\u2654', '\u2657', '\u2658', '\u2656'] 
];



const chessboard = document.getElementById("chessboard");
for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++ ){
        const square = document.createElement("div");

        if ((row+col)%2==0) {
            square.className = "light-square";
        }
        else {
            square.className = "dark-square";
        }
        square.dataset.row = row;
        square.dataset.col = col;
           
        if (board[row][col]){
            square.textContent = board[row][col];
            square.classList.add(board[row][col].charCodeAt(0) < 9818 ? "white" : "black"); // Unicode alapján
        }
        
        chessboard.appendChild(square);
    }
}

const toggleSwitch = document.getElementById("theme-toggle");

localStorage.setItem("theme", "dark");

toggleSwitch.addEventListener("change", () => {
    document.body.classList.toggle("light-mode");
    document.getElementById("window").classList.toggle("light-mode");
    document.getElementById("content").classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
      } else {
        localStorage.setItem("theme", "dark");
      }
    });


const savedTheme = localStorage.getItem("theme");

document.querySelector("#start-game").addEventListener("click", () => {
    window.location.href = "game.html"
});

