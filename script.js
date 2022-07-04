console.log("Welcome to Tic Tac Toe")
let music = new Audio("Media_Files/music.mp3")
music.volume = 0.05;
let audioTurn = new Audio("Media_Files/ting.mp3")
let gameover = new Audio("Media_Files/gameover.mp3")
let turn = "X"
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X"
}

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won"
            isgameover = true
            gameover.play()
            document.querySelector('.imgbox1').getElementsByTagName('img')[0].style.width = "200px";
        }
    })

    //Draw condition
    for (var i = 0; i < 9 && !isgameover && boxtext[i].innerText != ""; i++) {
        if (i === 8) {
            document.querySelector('.info').innerText = " Match Draw."
            isgameover = true
            gameover.play()
            document.querySelector('.imgbox2').getElementsByTagName('img')[0].style.width = "200px";
        }
    }
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).every(element => {
    document.body.addEventListener("mousemove", function () {
        music.play()
        music.autoplay = "true"
    })
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        //Stop game if gameoever
        if (isgameover) {
            return false;
        }
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn
            }
        }
    })
    return true;
})

// Add onclick listener to reset button
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    isgameover = false
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox1').getElementsByTagName('img')[0].style.width = "0px"
    document.querySelector('.imgbox2').getElementsByTagName('img')[0].style.width = "0px"
})

