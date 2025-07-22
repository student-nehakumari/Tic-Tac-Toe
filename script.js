//accessing the boxes
let boxes=document.querySelectorAll(".box");
//accessing the reset button
let resetBtn=document.querySelector("#reset");
//accessing new-game button
let newGameBtn=document.querySelector("#new-game")
//accessing msg-container
let msgContainer=document.querySelector(".msg-container")
//accesing winning message paragraph
let msg=document.querySelector("#msg")

/* since we have alternate turns in tic tac toe( if 1st user enterned 1 then 2nd user will enter 0) */
let turnO= true;    //playerX and player0  (will get 0 since value is true)
let cnt=0; //to track draw
/*now we can store all the winning patterns but in 2d array */

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]   
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{

        //Getting alternate O and X

        //checking the condition whether turn is 0 or 1 and then giving the box a no.
        if(turnO==true){    //(is turn is of player0)
            box.innerText="O" 
            box.classList.add("O");  //adding class O to change color written in css
            turnO=false;   //(now making the turn of player1)   
        }
        else{   //(is turn is of player1)
            box.innerText="X" 
            box.classList.add("X");  //adding class X to change color written in css
            turnO=true;   //(now making the turn of player1)   
        }

        //But after this we are facing a issue when we are clicking on that box again the value flips, we need to manage it
        box.disabled=true; //now, we can't click the box again
        cnt++;
        //now after clicking any button we need to check whether someone is winner or not
        let isWinner=checkWinner();
        //draw condition
        if(cnt==9 && !isWinner){
            gameDraw();
        }
    });
});
//game draw function
const gameDraw=()=>{
    msg.innerText=`Game is draw...Let's play again`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
//after the winner is showed we need to stop the game and make buttons disable
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
//after the winner is showed and game resetted we need to make buttons enable
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        //emptying the boxes
        box.innerText="";
        box.classList.remove("X", "O");
    }
}

//showing winner function
const showWinner=(winner)=>{
    msg.innerText=`Congratulations!! winner is ${winner}`;
    msgContainer.classList.remove("hide"); //removing the hide class for making msg visible
    //winning track sound
    document.getElementById("win-sound").play();
    //to stop the game after winning
    disableBoxes();
}

//Checking winner function
const checkWinner=()=>{
    //for-of
    for(let pattern of winPatterns){
        /* just for checking working fine or not */
        // console.log(pattern[0], pattern[1], pattern[2])  //get all the pattrens only
        // console.log(
        //     boxes[pattern[0]].innerText, //pos1
        //     boxes[pattern[1]].innerText, //pos2
        //     boxes[pattern[2]].innerText  //pos3
        // );  //get the boxes in a individual pattern

        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        //checking whether the player wins or not
        //now if any one position is empty its not a winPostion
        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            //now if all the three values are same win
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                //to show the message on screen
                showWinner(pos1Val); //the player of pos1Val is the winner
                return true; //returnfor draw check condition
            }
        }
        
    }
};
//for resetting the game
const resetGame=()=>{
    turnO=true;  
    cnt=0;
    //now making the boxes enable again since, the game is reset now
    enableBoxes();  
    msgContainer.classList.add("hide");
}

//when we need to reset??
newGameBtn.addEventListener("click", resetGame);  //afer clicking new game reset applies
resetBtn.addEventListener("click", resetGame);

//game draw--no winner

