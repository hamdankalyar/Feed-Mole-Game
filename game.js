let score = 0;
//how long mole to be sad 
function getSadInterval(){
   
    return Date.now() + 1000;
}
function getGoneInterval(){
    return Date.now() + Math.floor(Math.random() * 18000) + 2000 ;
}
function getHungryInterval(){
    return Date.now() + Math.floor(Math.random() * 3000) + 3000 ;
}
const moles =[
    {
        status:"sad",
        next:getSadInterval(),
        king:false,
        node:document.getElementById('hole-1')
    },
    {
        status:"sad",
        next:getSadInterval(),
        king:false,
        node:document.getElementById('hole-2')
    },
    {
        status:"sad",
        next:getSadInterval(),
        king:false,
        node:document.getElementById('hole-3')
    },
    {
        status:"sad",
        next:getSadInterval(),
        king:false,
        node:document.getElementById('hole-4')
    },
    {
        status:"sad",
        next:getSadInterval(),
        king:false,
        node:document.getElementById('hole-5')
    },
    {
        status:"sad",
        next:getSadInterval(),
        king:false,
        node:document.getElementById('hole-6')
    },
    {
        status:"sad",
        next:getSadInterval(),
        king:false,
        node:document.getElementById('hole-7')
    },
    {
        status:"sad",
        next:getSadInterval(),
        king:false,
        node:document.getElementById('hole-8')
    },
    {
        status:"sad",
        next:getSadInterval(),
        king:false,
        node:document.getElementById('hole-9')
    },
    {
        status:"sad",
        next:getSadInterval(),
        king:false,
        node:document.getElementById('hole-10')
    }
    
];

function getNextStatus(mole){
    switch(mole.status){
        case "fed":
        case "sad":
            mole.next = getSadInterval();
            mole.status = "leaving";
            if (mole.king) {
                
                mole.node.children[0].src = './images/king-mole-leaving.png';
            } else {
                mole.node.children[0].src = './images/mole-leaving.png';
                
            }
            break;
        case "leaving":
            mole.next = getGoneInterval();
            mole.status = "gone";
            mole.node.children[0].classList.add("gone");
            break;
        case "gone":
            mole.next = getHungryInterval();
            mole.king= getKingStatus();
            mole.status = "hungry";
            mole.node.children[0].classList.remove("gone");
            mole.node.children[0].classList.add("hungry");
            if(mole.king){
                mole.node.children[0].src = './images/king-mole-hungry.png';
                
            }else{

                mole.node.children[0].src = './images/mole-hungry.png';
            }
            break;
        case "hungry":
            mole.next = getSadInterval();
            mole.status = "sad";
            mole.node.children[0].classList.remove("hungry");   
            if (mole.king) {    
                mole.node.children[0].src = './images/king-mole-sad.png';
            } else {
                mole.node.children[0].src = './images/mole-sad.png';
                
            }        
            break;
        
    }
}
function getKingStatus(){
    return Math.random() > 0.8;
}
let runAgainAt = Date.now() + 100;
function nextFrame(){
    const now =Date.now();
    
    if(runAgainAt <= now){
        
        for (let i = 0; i < moles.length; i++) {
            
            if(moles[i].next <= now){
              
                getNextStatus(moles[i])
            } 
        }
    }
    
    requestAnimationFrame(nextFrame);
}
nextFrame();
function feed(event){

if(event.target.tagName !== 'IMG' || !event.target.classList.contains("hungry")){

    return;
}

const mole = moles[parseInt(event.target.dataset.index)];
mole.status = 'fed';
mole.next = getSadInterval();
if (mole.king) {
    
    mole.node.children[0].src = './images/king-mole-fed.png';
    score +=2;
} else {
    mole.node.children[0].src = './images/mole-fed.png';
    score++;    
}
mole.node.children[0].classList.remove('hungry');


if(score>=10){
    win();
}
document.querySelector('.worm-container').style.width = `${10 * score}%`;
}
function win(){
    document.querySelector('.bg').classList.add('hide');
    document.querySelector('.win').classList.remove('hide');
    
}
document.querySelector('.bg').addEventListener('click',feed);
