var deck = [];
var globalDeckIndex = 0;

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

function handleFileUpload(evt) {
    let file = evt.target.files[0];
    let reader = new FileReader();

    let importDeck = (e) => {
        let fileStringfied = e.target.result;
        let fileLineSplited = fileStringfied.split("\n");

        let cardsData = [];
        for (let i = 0; i < fileLineSplited.length; i++) {
            const card = fileLineSplited[i].split(",");
            for (let j = 0; j < card.length; j++) {
                card[j] = card[j].trim();
            }
            cardsData.push(card);
        }

        deck = cardsData;
        console.info(deck);

        document.getElementById("card-box").classList.remove("hide");
        document.getElementById("instructions").classList.add("hide");
        globalDeckIndex = Number.MAX_VALUE - 1;
        nextCard();
    };

    let onDeckLoad = (fl) => {
        return importDeck;
    };

    // Closure to capture the file information.
    reader.onload = onDeckLoad(file);

    // Read the file as text.
    reader.readAsText(file);
}
document.getElementById("file-input")
    .addEventListener("change", handleFileUpload, false);


let cardDarkSide = document.getElementById("dark-side");
let cardLightSide = document.getElementById("light-side");
let cardCounter = document.getElementById("card-counter");

function flipCard() {
    cardDarkSide.classList.add("hide");
    cardLightSide.classList.remove("hide");
}

function nextCard() {
    globalDeckIndex++;
    if (globalDeckIndex >= deck.length) {
        globalDeckIndex = 0;
        shuffle(deck);
    }

    cardCounter.innerHTML = (globalDeckIndex + 1).toString() + "/" + deck.length;

    // Get next card
    cardDarkSide.innerHTML = deck[globalDeckIndex][0];
    cardLightSide.innerHTML = deck[globalDeckIndex][1];

    cardLightSide.classList.add("hide");
    cardDarkSide.classList.remove("hide");
}

document.getElementById("dark-side")
    .addEventListener("click", flipCard, false);

document.getElementById("light-side")
    .addEventListener("click", nextCard, false);