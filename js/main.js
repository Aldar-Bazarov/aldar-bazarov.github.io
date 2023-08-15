const size = 3;
const tilesCount = size ** 2;
let hiddenPosition = tilesCount;
let shuffled = false;

newGame();

function newGame() {
    const RIGHT_ARROW = 39;
    const LEFT_ARROW = 37;
    const UP_ARROW = 40;
    const DOWN_ARROW = 38;
    
    window.onkeydown = function (event) {
        if (event.keyCode === RIGHT_ARROW) {
            swap(hiddenPosition - 1);
        } else if (event.keyCode === LEFT_ARROW) {
            swap(hiddenPosition + 1);
        } else if (event.keyCode === UP_ARROW) {
            swap(hiddenPosition - size);
        } else if (event.keyCode === DOWN_ARROW) {
            swap(hiddenPosition + size);
        }
    };

    loadTiles(size);

    setTimeout(() => {
        shuffle();
    }, 10);
}

function loadTiles(n) {
    const buttonContainer = document.getElementById('tiles');

    for (let b = 1; b <= tilesCount; b++) {
        const newTile = document.createElement('button');
        newTile.id = `btn${b}`;
        newTile.setAttribute('index', b);
        newTile.innerHTML = b;
        newTile.classList.add('btn');
        newTile.addEventListener('click', function () {
            swap(parseInt(this.getAttribute('index')));
        });
        if (b === tilesCount) {
            newTile.classList.add("selected");
        }
        buttonContainer.append(newTile);
    }
}

function shuffle() {
    const minShuffles = 100;
    const totalShuffles = minShuffles + Math.floor(Math.random() * (200 - 100) + 100);

    for (let i = minShuffles; i <= totalShuffles; i++) {
        setTimeout(function timer() {
            const x = Math.floor(Math.random() * 4);
            let direction = 0;
            if (x == 0) {
                direction = hiddenPosition + 1;
            } else if (x == 1) {
                direction = hiddenPosition - 1;
            } else if (x == 2) {
                direction = hiddenPosition + size;
            } else if (x == 3) {
                direction = hiddenPosition - size;
            }
            swap(direction);
            if (i >= totalShuffles - 1) {
                shuffled = true;
            }
        }, i * 10);
    }
}

function swap(tilePosition) {
    if (tilePosition < 1 || tilePosition > (tilesCount)) {
        return;
    }
    if (tilePosition == hiddenPosition + 1) {
        if (tilePosition % size != 1) {
            setSelected(tilePosition);
        }
    } else if (tilePosition == hiddenPosition - 1) {
        if (tilePosition % size != 0) {
            setSelected(tilePosition);
        }
    } else if (tilePosition == hiddenPosition + size) {
        setSelected(tilePosition);
    } else if (tilePosition == hiddenPosition - size) {
        setSelected(tilePosition);
    }

    if (shuffled) {
        setTimeout(() => {
            checkHasWon();
        }, 1);
    }
}

function checkHasWon() {
    for (let b = 1; b <= tilesCount; b++) {
        const currentTile = document.getElementById(`btn${b}`);
        const currentTileIndex = currentTile.getAttribute('index');
        const currentTileValue = currentTile.innerHTML;
        if (parseInt(currentTileIndex) != parseInt(currentTileValue)) {
            return;
        }
    }
    alert("ты собрал пазл")
}

function setSelected(index) {
    const hiddenTile = document.getElementById(`btn${hiddenPosition}`);
    const hiddenTileImage = getBackgroundImage(hiddenTile);
    const hiddenTileOpacity = getOpacity(hiddenTile);
    const hiddenTileText = hiddenTile.innerHTML;
    hiddenTile.classList.remove('selected');

    const newHiddenTile = document.getElementById(`btn${index}`);
    setBackgroundImage(hiddenTile, getBackgroundImage(newHiddenTile));
    setInnerHtml(hiddenTile, newHiddenTile.innerHTML);
    setOpacity(hiddenTile, getOpacity(newHiddenTile));
    setBackgroundImage(newHiddenTile, hiddenTileImage);
    setInnerHtml(newHiddenTile, hiddenTileText);
    setOpacity(newHiddenTile, hiddenTileOpacity);
    newHiddenTile.classList.add("selected");

    hiddenPosition = index;
}

function getBackgroundImage(element) {
    return window.getComputedStyle(element).getPropertyValue("background-image");
}

function setBackgroundImage(element, backgroundImage) {
    element.style.backgroundImage = backgroundImage;
}

function getOpacity(element) {
    return window.getComputedStyle(element).getPropertyValue("opacity");
}

function setOpacity(element, opacity) {
    element.style.opacity = opacity;
}

function setInnerHtml(element, content) {
    element.innerHTML = content;
}
