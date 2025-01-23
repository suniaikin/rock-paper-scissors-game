// Задаю переменные для счетчиков побед
let userWins = 0;
let computerWins = 0;

// Массивы для склонений слова "победа"
const winsArrow_1 = [1, 21, 31, 41, 51, 61, 71, 81, 91];
const winsArrow_2 = [2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54, 62, 63, 64, 72, 73, 74, 82, 83, 84, 92, 93, 94];
const winsArrow_3 = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 26, 27, 28, 29, 30, 35, 36, 37, 38, 39, 40, 45, 46, 47, 48, 49, 50];

// Основная функция игры
function playGame(userChoice) {
    // Сбрасываем анимации предыдущих раундов
    resetAnimations("user-choice");
    resetAnimations("computer-choice");

    const choices = ["Камень", "Ножницы", "Бумага"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let result;

    // Логика определения победителя
    if (userChoice === computerChoice) {
        result = "Ничья!";
    } else if (
        (userChoice === "Камень" && computerChoice === "Ножницы") ||
        (userChoice === "Ножницы" && computerChoice === "Бумага") ||
        (userChoice === "Бумага" && computerChoice === "Камень")
    ) {
        result = "Вы выиграли!";
        userWins++;
    } else {
        result = "Компьютер выиграл!";
        computerWins++;
    }

    // Счётчики побед
    const userWinsHTML = getWinText(userWins);
    const computerWinsHTML = getWinText(computerWins);

    // Обновление DOM
    document.getElementById("user-title").innerHTML = `<p>Вы</p>`;
    document.getElementById("user-stat").innerHTML = `<p>${userWinsHTML}</p>`;
    document.getElementById("computer-title").innerHTML = `<p>Компьютер</p>`;
    document.getElementById("computer-stat").innerHTML = `<p>${computerWinsHTML}</p>`;

    // Анимация смены изображений с pop
    animateWithPop("user-choice", getImage(userChoice));
    animateWithPop("computer-choice", getImage(computerChoice));

    // Отображение результата игры
    document.getElementById("game-result").innerText = result;

    // Через 3 секунды возвращаем кулаки с анимацией покачивания
    setTimeout(() => {
        resetToIdleShake();
    }, 3000);
}

// Функция смены изображения с анимацией pop
function animateWithPop(elementId, finalImage) {
    const element = document.getElementById(elementId);

    // Удаляем класс покачивания
    element.classList.remove("idle-shake");

    // Меняем изображение и запускаем pop-анимацию
    element.innerHTML = `<img src="${finalImage}" alt="Конечное изображение">`;
    void element.offsetWidth; // Принудительное обновление DOM
    element.classList.add("pop-animation");
}

// Функция возвращения кулаков с покачиванием
function resetToIdleShake() {
    const userElement = document.getElementById("user-choice");
    const computerElement = document.getElementById("computer-choice");

    // Устанавливаем кулаки с анимацией покачивания
    userElement.innerHTML = `<img src="./images/shake.png" alt="Кулак пользователя">`;
    computerElement.innerHTML = `<img src="./images/shake.png" alt="Кулак компьютера">`;

    // Принудительное удаление и повторное добавление класса анимации
    setTimeout(() => {
        startShakeAnimation(userElement);
        startShakeAnimation(computerElement);
    }, 100); // Задержка для стабильности
}

// Принудительный запуск анимации
function startShakeAnimation(element) {
    element.classList.remove("idle-shake");
    void element.offsetWidth; // Принудительное обновление DOM
    element.classList.add("idle-shake");
}

// Сброс анимаций предыдущих раундов
function resetAnimations(elementId) {
    const element = document.getElementById(elementId);
    element.classList.remove("pop-animation", "idle-shake");
}

// Функция для склонений слова "победа"
function getWinText(wins) {
    if (winsArrow_1.includes(wins)) {
        return `${wins} победa`;
    } else if (winsArrow_2.includes(wins)) {
        return `${wins} победы`;
    } else {
        return `${wins} побед`;
    }
}

// Функция для получения пути к изображению
function getImage(choice) {
    if (choice === "Камень") {
        return "./images/rock.png";
    } else if (choice === "Ножницы") {
        return "./images/scissors.png";
    } else if (choice === "Бумага") {
        return "./images/paper.png";
    }
}

// Инициализация анимации кулаков при загрузке
resetToIdleShake();
