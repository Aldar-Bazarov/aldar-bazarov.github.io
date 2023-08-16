class PuzzleGame {
    constructor(size) {
        this.size = size;
        this.tilesCount = size ** 2;
        this.hiddenPosition = this.tilesCount;
        this.shuffled = false;
        this.initialize();
    }

    initialize() {
        this.loadTiles();
        this.shuffle();
    }

    loadTiles() {
        const buttonContainer = document.getElementById('tiles');
        for (let b = 1; b <= this.tilesCount; b++) {
            const newTile = document.createElement('button');
            newTile.id = `btn${b}`;
            newTile.setAttribute('index', b);
            newTile.innerHTML = b;
            newTile.classList.add('btn');
            newTile.addEventListener('click', (e) => {
                this.swap(parseInt(e.target.getAttribute('index')));
            });
            if (b === this.tilesCount) {
                newTile.classList.add("selected");
            }
            buttonContainer.append(newTile);
        }
    }

    shuffle() {
        const minShuffles = 100;
        const totalShuffles = minShuffles + Math.floor(Math.random() * (200 - 100) + 100);

        for (let i = minShuffles; i <= totalShuffles; i++) {
            setTimeout(() => {
                const x = Math.floor(Math.random() * 4);
                let direction = 0;
                if (x == 0) {
                    direction = this.hiddenPosition + 1;
                } else if (x == 1) {
                    direction = this.hiddenPosition - 1;
                } else if (x == 2) {
                    direction = this.hiddenPosition + this.size;
                } else if (x == 3) {
                    direction = this.hiddenPosition - this.size;
                }
                this.swap(direction);
                if (i >= totalShuffles - 1) {
                    this.shuffled = true;
                }
            }, i * 10);
        }
    }

    swap(tilePosition) {
        if (tilePosition < 1 || tilePosition > (this.tilesCount)) {
            return;
        }
        if (tilePosition == this.hiddenPosition + 1) {
            if (tilePosition % this.size != 1) {
                this.setSelected(tilePosition);
            }
        } else if (tilePosition == this.hiddenPosition - 1) {
            if (tilePosition % this.size != 0) {
                this.setSelected(tilePosition);
            }
        } else if (tilePosition == this.hiddenPosition + this.size) {
            this.setSelected(tilePosition);
        } else if (tilePosition == this.hiddenPosition - this.size) {
            this.setSelected(tilePosition);
        }

        if (this.shuffled) {
            this.checkHasWon();
        }
    }

    checkHasWon() {
        for (let b = 1; b <= this.tilesCount; b++) {
            const currentTile = document.getElementById(`btn${b}`);
            const currentTileIndex = currentTile.getAttribute('index');
            const currentTileValue = currentTile.innerHTML;
            if (parseInt(currentTileIndex) != parseInt(currentTileValue)) {
                return;
            }
        }

        setTimeout(() => {
            const winEl = document.createElement('div');
            winEl.id = 'win';

            const winText = document.createElement('span');
            winText.textContent = 'ты собрал пазл!';
            winEl.appendChild(winText);

            const winLink = document.createElement('a');
            winLink.href = 'https://papinomoloko.com/';
            winLink.textContent = 'нажми';
            winEl.appendChild(winLink);
            document.body.appendChild(winEl);

            const crossEl = document.createElement('div');
            crossEl.setAttribute("id", "cross")
            crossEl.addEventListener('click', () => {
                winEl.remove();
            });
            winEl.appendChild(crossEl);
        }, 100);
    }

    setSelected(index) {
        const hiddenTile = document.getElementById(`btn${this.hiddenPosition}`);
        const hiddenTileImage = this.getBackgroundImage(hiddenTile);
        const hiddenTileOpacity = this.getOpacity(hiddenTile);
        const hiddenTileText = hiddenTile.innerHTML;
        hiddenTile.classList.remove('selected');

        const newHiddenTile = document.getElementById(`btn${index}`);
        this.setBackgroundImage(hiddenTile, this.getBackgroundImage(newHiddenTile));
        this.setInnerHtml(hiddenTile, newHiddenTile.innerHTML);
        this.setOpacity(hiddenTile, this.getOpacity(newHiddenTile));
        this.setBackgroundImage(newHiddenTile, hiddenTileImage);
        this.setInnerHtml(newHiddenTile, hiddenTileText);
        this.setOpacity(newHiddenTile, hiddenTileOpacity);
        newHiddenTile.classList.add("selected");

        this.hiddenPosition = index;
    }

    getBackgroundImage(element) {
        return window.getComputedStyle(element).getPropertyValue("background-image");
    }

    setBackgroundImage(element, backgroundImage) {
        element.style.backgroundImage = backgroundImage;
    }

    getOpacity(element) {
        return window.getComputedStyle(element).getPropertyValue("opacity");
    }

    setOpacity(element, opacity) {
        element.style.opacity = opacity;
    }

    setInnerHtml(element, content) {
        element.innerHTML = content;
    }
}

const game = new PuzzleGame(3);
