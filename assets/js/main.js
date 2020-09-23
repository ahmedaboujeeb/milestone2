let clickedCard = null;
let preventClick = false;
let combosFound = 0;



const colors = [
    "pink",
    "red",
    "yellow",
    "green",
    "black",
    "orange",
    "cyan",
    "blue"
];

function initCards(cards) {

    for (let color of colors) {
    const cardAIndex = parseInt(Math.random() * cards.length);
    const cardA = cards[cardAIndex];
    cards.splice(cardAIndex, 1);
    cardA.className += ` ${color}`;
    cardA.setAttribute("data-color", color);

    const cardBIndex = parseInt(Math.random() * cards.length);
    const cardB = cards[cardBIndex];
    cards.splice(cardBIndex, 1);
    cardB.className += ` ${color}`;
    cardB.setAttribute("data-color", color);
}
}

initCards([...document.querySelectorAll(".card")]);

function onCardClicked(e) {
    const target = e.currentTarget;

    if (
        preventClick ||
        target === clickedCard ||
        target.className.includes("done")) {
        return;
    }
    target.className = target.className
        .replace("color-hidden", "")
        .trim();
        target.className += " done";

    console.log(target.getAttribute("data-color"));

    if (!clickedCard) {
        // if we haven't clicked a card, keep track of the card, display it's color
        clickedCard = target;
    } else {
        // if we have already clicked a card, check if the new card matches the old card color
        if (clickedCard.getAttribute("data-color") !== 
        target.getAttribute("data-color")
        ) {
            preventClick = true;
            setTimeout(() => {  
                clickedCard.className =
                clickedCard.className.replace("done", "").trim() + " color-hidden";
                target.className =
                target.className.replace("done", "").trim() + " color-hidden"; 
                clickedCard = null;
                preventClick = false;
            }, 500);
        } 
        else {
            combosFound++;
        clickedCard = null;
        if (combosFound === 8) {
            document.getElementById("winner").innerText= "You Win!";
            reset();
        }
        
        }
    }
}


function reset() {
    var cards = document.querySelectorAll(".card");
    cards.forEach(function(item, index) {
    item.className = "card color-hidden"
    })

    initCards([...document.querySelectorAll(".card")]);
};