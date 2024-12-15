var deck = [];
var globalDeckIndex = 0;

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

function handleFileUpload(evt) {
    let files = evt.target.files; // JS FileList object

    // use the 1st file from the list
    let file = files[0];

    let reader = new FileReader(); // built in API

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

        // Shuffle deck

        shuffle(deck);

        // Display first card
        document.getElementById("card-box").classList.remove("hide");
        globalDeckIndex = -1;
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
document.getElementById('file_input')
    .addEventListener('change', handleFileUpload, false);


let cardDarkSide = document.getElementById("dark-side");
let cardLightSide = document.getElementById("light-side");

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

    // Get next card
    cardDarkSide.innerHTML = deck[globalDeckIndex][0];
    cardLightSide.innerHTML = deck[globalDeckIndex][1];

    cardLightSide.classList.add("hide");
    cardDarkSide.classList.remove("hide");
}

document.getElementById('dark-side')
    .addEventListener('click', flipCard, false);

document.getElementById('light-side')
    .addEventListener('click', nextCard, false);