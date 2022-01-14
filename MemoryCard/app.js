const carte = document.querySelectorAll(".carte"); //we get our class "carte" from the html element
let carteRetourne = false;  //defines a boolean to know if our card is flipped
let memoire1, memoire2;     //defines var for firstCard and secondCard
let verouille = false;
let doublon = 0;
let temps = 0;


//music variable
const music = document.getElementById("music");
const flip = document.getElementById("flip");
const shuffle = document.getElementById("shuffle");
const win = document.getElementById("win");
const clap = document.getElementById("claps");
const check = document.getElementById("check");

randomizeBoard();
music.play();
music.volume= 0.6;
carte.forEach(card => card.addEventListener('click', returnCard));  //each time we click on the card

//---------------------------- Function to flip our card ----------------------//
function returnCard(){
    flip.play();
    flip.volume = 0.5; 
    let card2 = event.target.parentNode; //get "arriere" parentNode
    if (verouille) return;  //return verouille values
    if (this === memoire1) return;  //return first card values if our selected card equal to memoire1
    card2.classList.toggle('active');   //give active class , it flip the card
    //condition for pick card
    if(!carteRetourne){
        carteRetourne = true;
        memoire1 = this;
        console.log(memoire1);
        return;
    }
        memoire2 = this;
        carteRetourne = false;
        console.log(memoire2)
//match part : we compare our attribute , if same then we can't click on the card to RE-flip
    if (memoire1.getAttribute("data-attr") === memoire2.getAttribute("data-attr")){
        check.play();
        check.volume = 0.5;
        memoire1.removeEventListener("click",returnCard);
        memoire2.removeEventListener("click",returnCard);
        console.log(memoire1 + " " +memoire2)
        doublon +=1; // add a pair
        suppBoard(); // reset the board
// if not the same , cancel the flip effect
    }else{
        verouille = true;
        setTimeout(() => {
            memoire1.childNodes[1].classList.remove('active');
            memoire2.childNodes[1].classList.remove('active');;
            suppBoard();
        }, 500);
    }
    timer();
    victoire(); 
}
//--------------------------function to alert us when we win------------------------------//

function victoire(){
    if (doublon >= 6){ //if pair is equal to 6 (we have 12 cards)
        win.play();
        win.volume= 0.2;
        music.pause();
        clap.play();
        clap.volume = 0.2;
        setTimeout(() => {alert("Vous avez gagné la partie !" + "\n En " + temps + " secondes" + "\n Bien joué !")
        var btn = document.createElement("Button");
        btn.innerHTML = " Recommencer";
        btn.style.color="strong lightblue";
        btn.style.backgroundColor="white";
        btn.style.width="150px";
        btn.style.height="80px";
        btn.style.textAlign="center";
        document.body.appendChild(btn); //create a button restart to restart game
        btn.addEventListener('click', function (e) { 
            //it reload page and will randomize by reloading thanks to function randomizeBoard
            window.location.reload();
        })
     },400)}
     
}
//-----------------------------Function to reset board's values -----------------------------------//
function suppBoard() {
    flip.play();
    flip.volume = 0.5;
    carteRetourne = false; //set carteRetourne to false
    verouille = false;      //set verouille to false
    memoire1 = null;    //set memoire1 to null 
    memoire2 = null;    //set memoire2 to null
  }
//-----------------------------Function who randomizes board ------------------------------------//
function randomizeBoard() {
    shuffle.play();
    shuffle.volume = 1;
    carte.forEach(card => {
        card.style.order = Math.floor(Math.random() * 12); //randomize each card order
    });
};

function timer (){
    while (doublon <= 6){
        temps++;
        return;
    }
}
