/*var carte = document.getElementsByClassName("carte");

/*prompt("Voulez vous recommencer ?")*/


   /* if("oui") {

        if (confirm("Voulez-vous vraiment recommencer ?")) {
        window.location.reload();
        }
    }

    else if("non") {
        alert("Voulez vous vraiment quitter ?")
    }




for( var i = 0; i <carte.length;i++){
    carte[i].addEventListener('click', function(event){

        let attribut = this.getAttribute("data-attr");
        let memoire = attribut;

        this.classList.toggle('active');
        console.log(this.classList);

        alert("Vous avez gagné la partie");

        var sec = 0;
        var min = 0;
        var hours = 0;

        function chronometer() {
            sec++;
            if(sec >= 60) {
                sec = 0;
                min++;
                if(min >= 60) {
                    min = 0;
                    hours++;
                }
            }
        }

        console.log(sec)

        var btn = document.createElement("Button");
        btn.innerHTML = " Restart";
        document.body.appendChild(btn);
        btn.addEventListener('click', function (e) {
            window.location.reload();
        })

        setTimeout(alertMe, 5000)


    });
};

function alertMe() {
    alert('Why hello there!')
}


/*function displayClock () {
    let time = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    var myclock = document.createElement("Clock");
    myclock.innerHTML = hours + minutes + seconds;
    console.log(time);
}

/*var today = new Date();
var date = today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate();
var time = today.getHours() +" ." + today.getMinutes() + "." + today.getSeconds();
var dateTime = date+' '+time;
console.log(dateTime);


var sec = 0;
var min = 0;
var hours = 0;

function chronometer() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hours++;
        }
    }
}*/

/*alert("Vous avez perdu")*/

const carte = document.querySelectorAll(".carte");
let carteRetourne = false;
let memoire1, memoire2;
let verouille = false;
let doublon=0;

carte.forEach(card => card.addEventListener('click', returnCard));

function returnCard(){
    let card2 = event.target.parentNode;
    if (verouille) return;
    if (this === memoire1) return;
    card2.classList.toggle('active');

    if(!carteRetourne){
        carteRetourne = true;
        memoire1 = this;
        console.log(memoire1);
        return;
    }
    memoire2 = this;
    carteRetourne = false;
    console.log(memoire2)

    if (memoire1.getAttribute("data-attr") === memoire2.getAttribute("data-attr")){
        memoire1.removeEventListener("click",returnCard);
        memoire2.removeEventListener("click",returnCard);
        console.log(memoire1 + " " +memoire2)
        doublon+=1;
        suppBoard();
    }else{
        verouille = true;
        setTimeout(() => {
            memoire1.childNodes[1].classList.remove('active');
            memoire2.childNodes[1].classList.remove('active');;
            suppBoard();
        }, 500);
    }
    if (doublon==6){
        setTimeout(alertMe, 500)
        var btn = document.createElement("Button");
        btn.innerHTML = " Recommencer";
        btn.style.color="black";
        btn.style.backgroundColor="white";
        btn.style.width="150px";
        btn.style.height="80px";
        btn.style.textAlign="center";
        document.body.appendChild(btn);
        btn.addEventListener('click', function (e) {
            window.location.reload();
        })

    }
}

function suppBoard() {
    carteRetourne =  false;
    verouille = false;
    memoire1= null;
    memoire2 = null;
}

function alertMe() {
    alert("Vous avez gagné la partie ! \n Bien joué !")
}


