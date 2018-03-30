var turn = 'X';
var score = {
    'X': 0,
    'O': 0
}
var gridValue = 0;

function fnLoad() {
    var select = document.getElementById("grid");
    for (i = 3; i <= 100; i += 1) {
        var option = document.createElement('option');
        select.options[select.options.length] = new Option(i + ' X ' + i, i);
    }

    addEvent(document.getElementById("game"), "click", fnChoose);

    fnNewGame();
}

function addEvent(element, eventName, callback) {

    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    }
}
function fnChoose(e) {
    if (e.target && e.target.nodeName == "TD") {
        var targetElement = document.getElementById(e.target.id);
        var prevTurn;
        if ((targetElement.className).indexOf("disabled") == -1) {
            targetElement.innerHTML = turn;
            targetElement.classList.add('disabled');
            targetElement.classList.add(turn);
            score[turn] += 1;
            prevTurn = turn;
            turn = turn === "X" ? "O" : "X";
            if (fndecide(targetElement, prevTurn)) {
                alert(prevTurn + ' has won the game');
                fnNewGame();
            } else if ((score['X'] + score['O']) == (gridValue * gridValue)) {
                alert('Draw!');
                fnNewGame();
            }
        }
    }
}
function fndecide(targetElement, prevTurn) {
    var UL = document.getElementById('game');
    var elements, i, j, cnt;
    if (score[prevTurn] >= gridValue) {
        var classes = targetElement.className.split(/\s+/);
        for (i = 0; i < classes.length; i += 1) {
            cnt = 0;
            if (classes[i].indexOf('row') !== -1 || classes[i].indexOf('col') !== -1 || classes[i].indexOf('dia') !== -1) {
                elements = UL.getElementsByClassName(classes[i]);
                for (j = 0; j < elements.length; j += 1) {
                    if (elements[j].innerHTML == prevTurn) {
                        cnt += 1;
                    }
                }
                if (cnt == gridValue) {
                    return true;
                }
            }
        }
    }
    return false;
}

