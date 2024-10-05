let missions = [];
let countdownDate = null;

function sendMission() {
    const missionMessage = document.getElementById("missionMessage").value;
    if (missionMessage) {
        missions.push(missionMessage);
        document.getElementById("missionMessage").value = "";
        displayMissions();
        saveData();
    }
}

function displayMissions() {
    const missionsList = document.getElementById("missionsList");
    missionsList.innerHTML = "";
    missions.forEach(mission => {
        const li = document.createElement("li");
        li.innerText = mission;
        missionsList.appendChild(li);
    });
}

function setCountdown() {
    const dateTime = document.getElementById("dateTime").value;
    if (dateTime) {
        countdownDate = new Date(dateTime).getTime();
        saveData();
        startCountdown();
    }
}

function startCountdown() {
    if (countdownDate) {
        const countdown = setInterval(function() {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerHTML = days + " Dias";
            document.getElementById("hours").innerHTML = hours + " Horas";
            document.getElementById("minutes").innerHTML = minutes + " Minutos";
            document.getElementById("seconds").innerHTML = seconds + " Segundos";

            if (distance < 0) {
                clearInterval(countdown);
                document.getElementById("countdown").innerHTML = "Missão Completada";
            }
        }, 1000);
    }
}

function saveData() {
    localStorage.setItem("missions", JSON.stringify(missions));
    localStorage.setItem("countdownDate", countdownDate);
}

function loadData() {
    missions = JSON.parse(localStorage.getItem("missions")) || [];
    countdownDate = localStorage.getItem("countdownDate") || null;

    displayMissions();
    startCountdown();
}

window.onload = loadData;
