// Задаю переменную для счетчика побед пользователя
let userWins = 0;
let computerWins = 0;

// Назначаю массив результатов для разных форм склонений слова "победа"
const winsArrow_1 = [1, 21, 31, 41, 51, 61, 71, 81, 91];
const winsArrow_2 = [2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54, 62, 63, 64, 72, 73, 74, 82, 83, 84, 92, 93, 94];

//Базовая функция
function playGame(userChoice) {

    // Сбрасываю анимацию предыдущих запусков
    // resetAnimations("user-choice");
    resetAnimations("computer-choice");

    const choices = ["Камень", "Ножницы", "Бумага"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let result;

    // Прописываю логику сравнения выбора
    if (userChoice === computerChoice) {
        result = "Ничья!";
    } else if (
        (userChoice === "Камень" && computerChoice === "Ножницы") ||
        (userChoice === "Ножницы" && computerChoice === "Бумага") ||
        (userChoice === "Бумага" && computerChoice === "Камень")
    ) {
        result = "Вы выиграли!";
        userWins++; // Счетчик побед пользователя
    } else {
        result = "Компьютер\nвыиграл!";
        computerWins++; // Счетчик побед компьютера
    }

    // Вызываю функцию счетчика и присваиваю результату переменную
    const userWinsHTML = declineWinText(userWins)
    const computerWinsHTML = declineWinText(computerWins)

    // Вывожу результаты на HTML
    document.getElementById("computer-stat").innerHTML = `<p>${computerWinsHTML}</p>`;

    // Вызываю функцию смены изображений
        animateWithPop("computer-choice", getImage(computerChoice));

    // Вывожу результат матча на HTML
    const gameResultElement = document.getElementById("game-result");
    gameResultElement.classList.remove("you-win", "computer-win");
    if (result === "Вы выиграли!") {
        document.getElementById("game-result").innerText = result;
        gameResultElement.classList.add("you-win");
    } else if (result === "Компьютер\nвыиграл!") {
        document.getElementById("game-result").innerText = result;
        gameResultElement.classList.add("computer-win");
    } else {
        document.getElementById("game-result").innerText = result;
      }

        // Прописываю время для смены картинки выбора на заглушку
    setTimeout(() => {
        resetToIdleShake();
    }, 1000);

    // Прописываю время для скрытия результата матча
    setTimeout(() => {
        hideResult();
    }, 1000);

    document.getElementById("user-title").innerHTML = `<p></p>`;
    document.getElementById("user-stat").innerHTML = `<p>${userWinsHTML}</p>`;
    document.getElementById("computer-title").innerHTML = `<p></p>`;
    document.getElementById("computer-stat").innerHTML = `<p>${computerWinsHTML}</p>`;

}

// Меняю изображение с анимацией появления
function animateWithPop(elementId, finalImage) {
    const element = document.getElementById(elementId);
    element.innerHTML = `<img src="${finalImage}" alt="Выбор компьютера">`;
    void element.offsetWidth;
    element.classList.add("pop-animation");
}

// Возвращаю кулак
function resetToIdleShake() {
    const computerElement = document.getElementById("computer-choice");
    computerElement.innerHTML = `<img src="./images/shake.png" alt="Кулак">`;
    setTimeout(() => {
        startShakeAnimation(computerElement);
    }, 500);
}

// Скрываю результата
function hideResult() {
    const element = document.getElementById("game-result");
    element.innerHTML = "";
}

// Запускаю анимацию
function startShakeAnimation(element) {
    element.classList.remove("idle-shake");
    void element.offsetWidth;
    element.classList.add("idle-shake");
}

// Сброс анимаций предыдущих раундов
function resetAnimations(elementId) {
    const element = document.getElementById(elementId);
    element.classList.remove("pop-animation", "idle-shake");
}

// Прописываю функцию показа статистики побед
function declineWinText (text) {
    if (winsArrow_1.includes(text)) {
        return `${text} победа`;
    } else if (winsArrow_2.includes(text)) {
        return `${text} победы`;
    } else {
        return `${text} побед`;
    }
}

// Подключаю картинки
function getImage(choice) {
    if (choice === "Камень") {
        return "./images/rock.png";
    } else if (choice === "Ножницы") {
        return "./images/scissors.png";
    } else if (choice === "Бумага") {
        return "./images/paper.png";
    }
}




resetToIdleShake();



