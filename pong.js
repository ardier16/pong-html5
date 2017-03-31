// Canvas initialization
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var audio = document.getElementById("audio");
var CANVAS_WIDTH = document.getElementById('canvas-block').clientWidth;
var CANVAS_HEIGHT = window.outerHeight / 1.5;
var FONT_SIZE = 10 + CANVAS_WIDTH / 150;
score.style.fontSize = CANVAS_WIDTH / 20 + "pt";
document.body.style.fontSize = FONT_SIZE + "pt";
document.getElementById('first-name').style.fontSize =
    document.getElementById('second-name').style.fontSize = FONT_SIZE + 2 + "pt";



var first = {};
var second = {};
var ball = {};
var losed = false;

window.onload = init;

document.getElementById("play-btn").onclick = init;



// Init functions

function start() {
    if (paused) {
        clearInterval(ball.Timer);
        first.IsMoving = second.IsMoving = true;
        ctx.fillStyle = "#00021d";
        ctx.font = FONT_SIZE + 20 + "px Comic Sans MS";
        ctx.fillText("Pause", canvas.width / 2, canvas.height / 2);
    } else {
        ctx.clearRect(first.X + first.Height + 1, 0, second.X - first.X - first.Height - 2, CANVAS_HEIGHT);
        ball.Timer = setInterval(moveBall, 10);
        first.IsMoving = second.IsMoving = false;
    }
}

function init() {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;


    ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
    clearInterval(ball.Timer);
    clearInterval(first.Timer);
    clearInterval(second.Timer);


    first.X = CANVAS_WIDTH / 30;
    first.Name = document.getElementById("first-name").value;
    first.Color = document.getElementById("first-color").value;
    document.getElementById("f_score").style.color = first.Color;

    second.X = CANVAS_WIDTH - first.X - 20;
    second.Name = document.getElementById("second-name").value;
    second.Color = document.getElementById("second-color").value;
    document.getElementById("s_score").style.color = second.Color;


    first.V = second.V = document.getElementById("board-speed").value - 0;
    first.Score = second.Score = 0;
    first.Width = second.Width = document.getElementById("board-size").value - 0;
    first.Height = second.Height = 20;
    first.Y = second.Y = (CANVAS_HEIGHT - first.Width) / 2;
    first.IsMoving = second.IsMoving = true;

    ball.Radius = document.getElementById("ball-radius").value - 0;
    ball.X = CANVAS_WIDTH / 2;
    ball.Y = CANVAS_HEIGHT / 2;
    var vx = document.getElementById("ball-velocity").value - 0;
    ball.Vx = Math.random() > 0.5 ? vx : -vx;
    ball.Vy = Math.random() > 0.5 ? randomFromRange(1, 3) : randomFromRange(-3, 1);
    ball.Color = document.getElementById("ball-color").value;

    paused = true;

    document.getElementById("f_score").innerHTML = first.Name + " " + first.Score;
    document.getElementById("s_score").innerHTML = second.Score + " " + second.Name;

    drawFirst();
    drawSecond();
    drawBall();
    drawLine();


    document.body.style.background = "linear-gradient(to right, " + setBg(toRGB(second.Color)) +
        ", " + setBg(toRGB(first.Color)) + ")";




    ctx.fillStyle = "#00021d";
    ctx.font = FONT_SIZE + 20 + "px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillText("Press Space To Start", canvas.width / 2, canvas.height / 3);
    ctx.fillText("KEYS:", canvas.width / 2, canvas.height / 1.7);
    ctx.fillText("First Player - W/S", canvas.width / 2, canvas.height / 1.4);
    ctx.fillText("Second Player - Up/Down", canvas.width / 2, canvas.height / 1.25);
    ctx.fillText("Space - Play/Pause", canvas.width / 2, canvas.height / 1.12);
}




// Draw functions

function drawFirst() {
    ctx.beginPath();
    ctx.fillStyle = first.Color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 0;
    ctx.moveTo(first.X + first.Height, first.Y);
    ctx.lineTo(first.X + first.Height, first.Y + first.Width);
    ctx.lineTo(first.X, first.Y + (first.Width / 2 + first.Width / 10));
    ctx.lineTo(first.X, first.Y + (first.Width / 2 - first.Width / 10));
    ctx.lineTo(first.X + first.Height, first.Y);

    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function drawSecond() {
    ctx.beginPath();
    ctx.fillStyle = second.Color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 0;

    ctx.moveTo(second.X, second.Y);
    ctx.lineTo(second.X, second.Y + second.Width);
    ctx.lineTo(second.X + second.Height, second.Y + (second.Width / 2 + second.Width / 10));
    ctx.lineTo(second.X + second.Height, second.Y + (second.Width / 2 - second.Width / 10));
    ctx.lineTo(second.X, second.Y);

    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = ball.Color;
    ctx.arc(ball.X, ball.Y, ball.Radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
}


// Move functions

function moveBall() {
    if (!paused) {
        ctx.clearRect(first.X + first.Height + 1, 0, second.X - first.X - first.Height - 2, CANVAS_HEIGHT);

        if (ball.X - ball.Radius < first.X + first.Height ||
            ball.X + ball.Radius > second.X) {
                ctx.clearRect(ball.X - ball.Radius - 3, ball.Y - ball.Radius - 2, 2 * ball.Radius + 4, 2 * ball.Radius + 3);
            }

        checkPosition();
        drawLine();
        drawBall();

    }

}

function moveFirstRight() {
    ctx.clearRect(first.X - 1, first.Y - 1, first.Height + 2, first.Width + 1);
    if (first.Y < CANVAS_HEIGHT - first.Width - first.V)
        first.Y += first.V;
    drawFirst();
}

function moveFirstLeft() {
    ctx.clearRect(first.X - 1, first.Y, first.Height + 2, first.Width);
    if (first.Y > first.V)
        first.Y -= first.V;
    drawFirst();
}

function moveSecondRight() {
    ctx.clearRect(second.X - 1, second.Y, second.Height + 2, second.Width);
    if (second.Y > second.V)
        second.Y -= second.V;
    drawSecond();
}

function moveSecondLeft() {
    ctx.clearRect(second.X - 1, second.Y - 1, second.Height + 2, second.Width - 1);
    if (second.Y < CANVAS_HEIGHT - second.Width - second.V)
        second.Y += second.V;
    drawSecond();
}

// Logic functions

function checkPosition() {
    if (ball.Y + ball.Radius >= CANVAS_HEIGHT || ball.Y - ball.Radius <= 0) {
        ball.Vy = -ball.Vy;
        audioPlay("wall");
    }

    if (ball.X - ball.Radius <= first.X + first.Height - ball.Vx) {
        if (ball.Y - ball.Radius >= first.Y + first.Width || ball.Y + ball.Radius <= first.Y) {
            first.IsMoving = true;
            losed = true;
        } else if (!losed) {
            ball.Vx = -ball.Vx;
            curveBall(first.Y);
            audioPlay("board");
        }

        if (ball.X + ball.Radius < 0)
            loseFirst();
        else {
            ball.X += ball.Vx;
            ball.Y += ball.Vy;
        }

        drawFirst();
    } else if (ball.X + ball.Radius >= second.X - ball.Vx) {
        if (ball.Y + ball.Radius <= second.Y || ball.Y - ball.Radius >= second.Y + second.Width) {
            second.IsMoving = true;
            losed = true;
        } else if (!losed) {
            ball.Vx = -ball.Vx;
            curveBall(second.Y);
            audioPlay("board");
        }

        if (ball.X - ball.Radius > CANVAS_WIDTH)
            loseSecond();
        else {
            ball.X += ball.Vx;
            ball.Y += ball.Vy;
        }

        drawSecond();
    } else {
        ball.X += ball.Vx;
        ball.Y += ball.Vy;
    }

}

function loseFirst() {
    ball.X = CANVAS_WIDTH / 2;
    ball.Y = CANVAS_HEIGHT / 2;
    ball.Vx = -ball.Vx;
    ball.Vy = Math.random() > 0.5 ? randomFromRange(1, 3) : randomFromRange(-3, 1);

    first.IsMoving = second.IsMoving = false;
    losed = false;
    second.Score++;
    clearInterval(first.Timer);
    clearInterval(second.Timer);
    clearInterval(ball.Timer);
    document.getElementById("s_score").innerHTML = second.Score + " " + second.Name;
    audioPlay("lose");

    checkGameOver();
}

function loseSecond() {
    ball.X = CANVAS_WIDTH / 2;
    ball.Y = CANVAS_HEIGHT / 2;
    ball.Vx = -ball.Vx;
    ball.Vy = Math.random() > 0.5 ? randomFromRange(0, 3) : randomFromRange(-3, 0);

    losed = false;
    first.IsMoving = second.IsMoving = false;

    first.Score++;
    clearInterval(first.Timer);
    clearInterval(second.Timer);
    clearInterval(ball.Timer);
    document.getElementById("f_score").innerHTML = first.Name + " " + first.Score;
    audioPlay("lose");
    checkGameOver();
}

function checkGameOver() {
    if (first.Score >= 9.9) {
        audioPlay("win");
        alert(first.Name + " win " + first.Score + " - " + second.Score + "!");
        init();
        return;
    } else if (second.Score >= 9.9) {
        audioPlay("win");
        alert(second.Name + " win " + second.Score + " - " + first.Score + "!");
        init();
        return;
    }
    setTimeout(start, 250);
}


// Key Press functions

window.onkeydown = function(e) {
    if (!first.IsMoving && !paused) {
        window.onkeyup = function(e) {
            if (e.keyCode == 83 || e.keyCode == 87) {
                first.IsMoving = false;
                clearInterval(first.Timer);
            } else if (e.keyCode == 38 || e.keyCode == 40) {
                second.IsMoving = false;
                clearInterval(second.Timer);
            }
        }


        switch (e.keyCode) {
            case 83:
                first.IsMoving = true;
                first.Timer = setInterval(moveFirstRight, 10);
                break;
            case 87:
                first.IsMoving = true;
                first.Timer = setInterval(moveFirstLeft, 10);
                break;
            case 37:
                first.IsMoving = true;
                first.Timer = setInterval(moveFirstUp, 10);
                break;
        }
    }

    if (!second.IsMoving && !paused) {
        switch (e.keyCode) {
            case 38:
                second.IsMoving = true;
                second.Timer = setInterval(moveSecondRight, 10);
                break;
            case 40:
                second.IsMoving = true;
                second.Timer = setInterval(moveSecondLeft, 10);
                break;
        }
    }

    switch (e.keyCode) {
        case 32:
            paused = !paused;
            start();
            break;

    }
}


function audioPlay(name) {
    audio.src = "audio/" + name + ".wav";

    audio.load();
    audio.play();
}


function setBg(rgb) {
    return "rgba(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ", 0.2)";
}

function toRGB(hex) {
    return [fromHexToDec(hex[1] + hex[2]),
        fromHexToDec(hex[3] + hex[4]),
        fromHexToDec(hex[5] + hex[6])
    ];

}

function fromHexToDec(num) {
    var f = hexNum(num[0]);
    var s = hexNum(num[1]);

    return f * 16 + +s;
}

function hexNum(symbol) {
    switch (symbol) {
        case 'a':
            return 10;
        case 'b':
            return 11;
        case 'c':
            return 12;
        case 'd':
            return 13;
        case 'e':
            return 14;
        case 'f':
            return 15;
        default:
            return symbol;
    }
}


function curveBall(playerY) {
    var sign = ball.Vy > 0 ? 1 : -1;
    var delta = (ball.Y - playerY) * 100 / first.Width;

    if (delta >= 47.5 && delta <= 52.5)
        ball.Vy = 0;
    else if (delta >= 90)
        ball.Vy = 6;
    else if (delta >= 80)
        ball.Vy = 5;
    else if (delta >= 70)
        ball.Vy = 4;
    else if (delta >= 52.5)
        ball.Vy = 2;
    else if (delta >= 30)
        ball.Vy = 2;
    else if (delta >= 20)
        ball.Vy = 4;
    else if (delta >= 10)
        ball.Vy = 5;
    else
        ball.Vy = 6;


    ball.Vy = ball.Vy * sign;
}

function drawLine() {
    ctx.beginPath();
    ctx.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_HEIGHT / 4, 0, Math.PI * 2, true);
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.fillStyle = "black";
    ctx.strokeWidth = 5;
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.closePath();
}

function randomFromRange(min, max) {
    return Math.round(-0.5 + min + Math.random() * (max - min + 1));
}
