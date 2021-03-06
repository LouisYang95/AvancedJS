/*fonction pour le lancement du jeux et de la musique d'ambiance */
function start(x) {

    x.style.display = 'none';
    game();



    var audio = document.getElementById("myAudio");
    audio.volume = 0.05;
    audio.play();
}

/*fonction pour le boutton recommencer*/
function Recommencer() {
    window.location.reload();

}

/*fonction qui regroupe tous le jeu */
function game() {

    /*Déclarations de variable */
    const grid = document.querySelector('.grille')
    let aliensRemoved = []
    let currentShooterIndex = 229
    let width = 20
    let widthAlien = 1
    let invadersId
    var avancer = 0;
    var direction = 1;
    let WallRight = [19, 39, 59, 79, 99, 119, 139, 159, 179, 199, 219, 239, 240]
    results = 0;
    let destroyedAudio = document.getElementById("explodeAudio");
    let audioDeath = document.getElementById("death");
    let audioShoot = document.getElementById("shootAudio");
    let audioAlien = document.getElementById("aliens");








    /*création de 240 case "div" */

    for (let i = 0; i < 240; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
    }
    /*Déclarations de la variable squares "carré" c'est les carrés de la grille */
    const squares = Array.from(document.querySelectorAll('.grille div'))

    /* tableau des emplacements de base des aliens */
    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51


    ]

    /* Dessine les aliens */
    function draw() {
        for (let i = 0; i < alienInvaders.length; i++) {
            if (!aliensRemoved.includes(i)) {
                squares[alienInvaders[i]].classList.add('alien')
            }
        }
    }

    draw()
        /*Suprime l'alien du carré précédent */
    function remove() {
        for (let i = 0; i < alienInvaders.length; i++) {
            squares[alienInvaders[i]].classList.remove('alien')
        }
    }

    /* emplacement (229) du joueur "tireur" */

    squares[currentShooterIndex].classList.add('tireur')


    /* fonction du mouvement l'atérale et horizontal du joueur "left , right , Up et Down" du joueur */
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
                if (currentShooterIndex >= 200) currentShooterIndex -= 20
                break
            case 'ArrowDown':
                if (currentShooterIndex <= 219) currentShooterIndex += 20
                break
        }
        squares[currentShooterIndex].classList.add('tireur')
    }

    /*Si l'une des touche est enfoncé "down" alors il execute la fonction moveShooterLeftReightUpDown  */
    document.addEventListener('keydown', moveShooterLeftReightUpDown)

    /*fonction du mouvement des aliens */
    function moveInvaders() {

        remove();

        if (avancer == 0) { // aller a gauche
            audioAlien.play();
            audioAlien.volume = 0.05;
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += widthAlien;
                for (let y = 0; y < WallRight.length; y++) {
                    if (alienInvaders[i] == WallRight[y] && !aliensRemoved.includes(i)) {
                        avancer = 2;
                        direction = 1;
                    }
                }
            }
        } else if (avancer == 1) { // aller a droite
            audioAlien.play();
            audioAlien.volume = 0.05;
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] -= widthAlien;
                if (alienInvaders[i] % 20 == 0 && !aliensRemoved.includes(i)) {
                    avancer = 2;
                    direction = 2;
                }
            }
        } else if (avancer == 2) { // s'arreter
            audioAlien.play();
            audioAlien.volume = 0.05;
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += widthAlien + 19;
            }
            if (direction == 1) {
                avancer = 1;
            } else if (direction == 2) {
                avancer = 0;
            }
        }

        draw();

        /*Lorsque qu'un Alien percute le tireur (meme case) alors la game est perdue + pop up */
        if (squares[currentShooterIndex].classList.contains('alien', 'tireur')) {
            audioDeath.play();
            audioDeath.volume = 0.05;
            clearInterval(invadersId)
            setTimeout(lossAlert, 500);
        }
        /*Lorsque qu'un Alien arrive a la derniere ligne alors la game est perdue + pop up */
        for (let i = 0; i < alienInvaders.length; i++) {
            if (alienInvaders[i] >= 220 && alienInvaders[i] <= 240) {
                clearInterval(invadersId)

                setTimeout(lossAlert, 1000);
                break;


            }
        }
        /*Lorsque le tireur detruit tous les aliens alors la game est gagne + pop up */
        if (aliensRemoved.length === alienInvaders.length) {
            clearInterval(invadersId)
            setTimeout(WinAlert, 500);
        }



    }


    /*Vistesse de mouvement des aliens */
    invadersId = setInterval(moveInvaders, 600)



    /*Le tire */
    function shoot(event) {
        let laserId
        let currentLaserIndex = currentShooterIndex

        /*Mouvement du tire qui se deplace de 20 en 20 pour faire un tous droit a l'emplacement du vaiseau */
        function moveLaser() {
            if (currentLaserIndex >= 0 && currentLaserIndex <= 19) {
                squares[currentLaserIndex].classList.remove('laser');
            } else if (currentLaserIndex > 19) {
                squares[currentLaserIndex].classList.remove('laser');
                currentLaserIndex -= width
                squares[currentLaserIndex].classList.add('laser');
                /*Lorsque l'index du tire est contenaire de l'alien alors enlever l'alien et le tire et afficher le boom */
                if (squares[currentLaserIndex].classList.contains('alien')) {
                    squares[currentLaserIndex].classList.remove('laser')
                    squares[currentLaserIndex].classList.remove('alien')
                    squares[currentLaserIndex].classList.add('boom')
                    setTimeout(() => squares[currentLaserIndex].classList.add('boom2'), 200);
                    destroyedAudio.play();
                    destroyedAudio.volume = 0.05;




                    /*Durée de l'explosion de l'alien */
                    setTimeout(() => squares[currentLaserIndex].classList.remove('boom', 'boom2'), 400)
                    clearInterval(laserId)

                    /*Effacement de l'Alien en l'empechant de se draw */
                    const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
                    aliensRemoved.push(alienRemoved)
                    results++
                    document.getElementById("resultas").innerHTML = results;







                }
            }

        }
        /*32 = la touche espace du clavier */
        switch (event.keyCode) {
            case 32:
                /*Interval du deplacement des tires */
                laserId = setInterval(moveLaser, 400);
                audioShoot.play();
                audioShoot.volume = 0.05;
                break;
        }
    }

    /*Si l'une des touche est enfoncé "down" alors il execute la fonction shoot  */

    document.addEventListener('keydown', shoot);


    /*fonction pour la pop up de vous avez perdu la partie */
    function lossAlert() {
        alert("VOUS AVEZ PERDU LA PARTIE");

    }
    /*fonction pour la pop up de vous avez gagne la partie */
    function WinAlert() {
        alert("VOUS AVEZ GAGNE LA PARTIE");

    }



}