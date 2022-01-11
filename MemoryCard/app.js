var carte = document.getElementsByClassName("carte");
var paire =0;
var memoire1, memoire2;


returnCard();



function returnCard(){
   
    for( var i = 0; i <carte.length;i++){
        carte[i].addEventListener('click', function(event){
        
        let card = event.target.parentNode;

        if(paire==0){
        memoire1 = card;
        card.classList.toggle('active');
        paire+=1;
        }else if(paire==1){
        memoire2=card;
        card.classList.toggle('active');
        paire+=1;
        }
        if(paire==2){
            let attribut1 = memoire1.parentNode.getAttribute("data-attr");
            let attribut2 = memoire2.parentNode.getAttribute("data-attr");
            if(attribut1==attribut2){
                paire=0;
            }else{
                memoire1.classList.toggle('active');
                memoire2.classList.toggle('active');
                paire=0;
            }
        }
        
       
        });
        };
      
}


