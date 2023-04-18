const wordElement = document.getElementById('word');
const popup = document.getElementById('popup-container');
const messageElement = document.getElementById('success-message');
const playAgainBtn = document.getElementById('play-again');
const popUp = document.querySelector('.popup');
let selectedWord = getRandomWord();
const correctLetters = [];
const wrongLettters = [];
const wrongLetttersElement = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');

function getRandomWord() {
    const words = ["javascrıpt", "java", "python","css","html","assembly"];

    return words[Math.floor(Math.random() * words.length)]
    // 0-1-2 sayıları gelir
};

function displayWord() {

    wordElement.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">

            ${correctLetters.includes(letter) ? letter : ''}

            </div>
        `).join('')}
    `;

    const w = wordElement.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        popup.style.display = "flex"
        messageElement.innerText = 'Tebrikler Kazandınız.'
        popUp.style.backgroundColor = "green";
    }

};

function updateWrongLettters() {
    wrongLetttersElement.innerHTML = `

    ${wrongLettters.length > 0 ? "<h3>Hatalı Harfler</h3>" : ""}
    ${wrongLettters.map(letter => `<span>${letter}</span>`)}
`;

    items.forEach((item, index) => {
        const errorCount = wrongLettters.length;

        if (index < errorCount) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    })

    if (wrongLettters.length === items.length) {
        popup.style.display = "flex"
        messageElement.innerText = 'Kaybettiniz!'
        popUp.style.backgroundColor = "Red";
    }

};

function displayMessage() {

    message.classList.add('show');
    setTimeout(function () {
        message.classList.remove('show')
    }, 2000)
};

window.addEventListener('keydown', function (e) {
    // ing a-z karakterler 65-90 arasındadır
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if (!wrongLettters.includes(letter)) {
                wrongLettters.push(letter);
                updateWrongLettters();
            } else {
                displayMessage();
            }
        }
    }
})

displayWord();

playAgainBtn.addEventListener('click', function () {
    correctLetters.splice(0);
    wrongLettters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLettters();
    popup.style.display = "none";
})
