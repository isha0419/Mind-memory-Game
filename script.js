// sample questions
const qaPairs=[
    {q:"what is 2+3 ?" , a:"5"},
    {q: "what is the capital of India ?" , a:"New Delhi"},
    {q: "what is the capital of France ?" , a:"Paris"},
    {q: "HTML stands for ?" , a:"Hyper Text Markup Language"},
];
// prepare cards - same pairId for both cards with questions and answers since they belong together
let cards=[];
qaPairs.forEach(pair => {
    cards.push({text: pair.q, pairId: pair.q});
    cards.push({text: pair.a, pairId: pair.q});
});
// randomise or shuffle cards
cards.sort(() => Math.random() - 0.5);

const board=document.getElementById("game-board");
const status=document.getElementById("status");
let flipped=[];
let matchedCount=0;
// create cards

cards.forEach((card,index)=>{
    const cardE1=document.createElement("div");
    cardE1.className="card w-28 h-28 bg-gradient-to-br from-blue-300 to-blue-600 text-white flex items-center justify-center rounded-xl cursor-pointer text-center text-sm font-bold shadow-lg transform hover:scale-105 transition-all";
    cardE1.dataset.pairId=card.pairId;
    cardE1.dataset.index=index;
    cardE1.textContent="?";
    board.appendChild(cardE1);

    cardE1.addEventListener("click", ()=> flipCard(cardE1 , card));

});

function flipCard(cardE1, card) {
    if (cardE1.classList.contains("flipped") || flipped.length >= 2) {
        return; // Ignore if already flipped or if two cards are already flipped
    }
    cardE1.classList.add("flipped", "bg-blue-50","text-white-200", "scale-105");
    cardE1.textContent=card.text;
    flipped.push(cardE1);
     
    if(flipped.length ===2){
        checkMatch();
    }
}

function checkMatch() {
    const [card1 , card2] =flipped;
    if(card1.dataset.pairId === card2.dataset.pairId) {
        // match found
        setTimeout(() => {
            card1.classList.add("invisible");
            card2.classList.add("invisible");
            matchedCount++;
            status.textContent=`matched pairs : ${matchedCount}`;
            if(matchedCount === qaPairs.length) {
                status.textContent="Congratulations! 🎉🎉 You've matched all pairs!";
            }
        }, 500);
    }
    else{
        // not matched
        setTimeout(() => {
            card1.classList.remove("flipped", "bg-blue-50", "text-white-200", "scale-105");
            card2.classList.remove("flipped", "bg-blue-50", "text-white-200", "scale-105");
            card1.textContent="?";
            card2.textContent="?";
        },900);
    }
    flipped=[];
}