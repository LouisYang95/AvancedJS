function moveInvaders() {
    const leftEdge = alienInvaders[0] % widthAlien === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % widthAlien === width - 1
    remove()

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += widthAlien

    }
    draw()

    if (squares[currentShooterIndex].classList.contains('alien', 'tireur')) {
        console.log("game over")
        clearInterval(alienInvade)
        results.innerHTML = "GAME OVER";
        document.body.appendChild(results);
        setTimeout(lossAlert, 2000);
    }

    for(let i = 0; i < alienInvaders.length; i++) {
        if(alienInvaders[i] > squares.length) {
            clearInterval(alienInvade)
            results.innerHTML = "GAME OVER";
        }
    }
