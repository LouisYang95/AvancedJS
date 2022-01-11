const grid = document.querySelector('.grille')
let aliensRemoved = []
let currentShooterIndex = 229
let width = 20
let widthAlien = 1
let invadersId



/*création de 240 case "div" */

for (let i = 0; i < 240; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grille div'))

/* tableau des emplacements de base des aliens */
const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
]

/* Affichage des aliens */
function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('alien')
        }
    }
}

draw()

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('alien')
    }
}

/* emplacement (229) du joueur "tireur" */

squares[currentShooterIndex].classList.add('tireur')

/* fonction du mouvement l'atérale et horizontal du joueur "left , right , Up et Down" */
function moveShooterLeftReightUpDown() {
    squares[currentShooterIndex].classList.remove('tireur')
    switch (event.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
            break
        case 'ArrowRight':
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
            break
        case 'ArrowUp':
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 20
            break
        case 'ArrowDown':
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 20
            break
    }
    squares[currentShooterIndex].classList.add('tireur')
}

document.addEventListener('keydown', moveShooterLeftReightUpDown)

function moveInvaders() {
    const leftEdge = alienInvaders[0] % widthAlien === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % widthAlien === width - 1
    remove()

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += widthAlien + 1
    }
    draw()

}
setInterval(moveInvaders, 100)