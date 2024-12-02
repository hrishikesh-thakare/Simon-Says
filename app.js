let userseq=[];
let gameseq=[];
let btns = ["yellow","red","green","purple"];

let started = false;
let level = 0;
let maxLevel = 0;

let h2 = document.querySelector('h2');
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnPress);
}

document.addEventListener("keypress",function(){
    if(started == false){
        started = true;
        levelUp();
    }
});

function levelUp(){
    userseq = [];
    level++;
    if(level>= maxLevel){
        maxLevel =  level;
    }
    h2.innerText = `Level ${level}`;

    let randInd = Math.floor(Math.random()*4);
    let randColor = btns[randInd];
    let randBtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor);
    console.log(gameseq);
    btnFlash(randBtn);
};

function btnFlash(btn){
  btn.classList.add("flash");
  setTimeout(()=>{
    btn.classList.remove("flash");
  },250)
};

function checkAns(idx){
    if(userseq[idx] == gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelUp,1000);
            document.querySelector('h3').innerText =  `Highest Score: ${maxLevel}`
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level-1}</b> <br>Press any key to Restart.`
        if(gameseq.length != 0){
            document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "cyan";
        }, 150);
        reset();
        }
    }
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(()=>{
      btn.classList.remove("userFlash");
    },250)
  };

function btnPress(){
    let btn = this;

    userColor = btn.getAttribute("id");
    userseq.push(userColor);
    userFlash(btn);
    checkAns(userseq.length-1);
}

function reset(){
    started = false;
    gameseq= [];
    userseq = [];
    level = 0;
}