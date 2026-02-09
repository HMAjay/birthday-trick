let step = 0;
let mode = "birthday";
const currentYear = new Date().getFullYear();
let savedDay = null;
let savedMonthName = null;

const birthdaySteps = [
    "Think of your birth MONTH. Multiply it by 5.",
    "Now add 6.",
    "Multiply the result by 4.",
    "Add 9.",
    "Multiply by 5.",
    "Now add the DAY you were born.",
    "Done! Enter the final number below."
];

const yearSteps = [
    "Think of your CURRENT AGE. Multiply it by 2.",
    "Now add 5.",
    "Multiply the result by 50.",
    "Add the current year.",
    "Finally, subtract 250.",
    "Done! Enter the final number below."
];

function nextStep() {
    const steps = mode === "birthday" ? birthdaySteps : yearSteps;
    if (step < steps.length - 1) {
        step++;
        document.getElementById("stepText").innerText = steps[step];
    }
    if (step > 0) document.getElementById("backBtn").style.display = "inline-block";
    if (step === steps.length - 1) document.getElementById("inputArea").style.display = "block";
}

function prevStep() {
    if (step > 0) step--;
    const steps = mode === "birthday" ? birthdaySteps : yearSteps;
    document.getElementById("stepText").innerText = steps[step];
    if (step === 0) document.getElementById("backBtn").style.display = "none";
    document.getElementById("inputArea").style.display = "none";
}

function reveal() {
    let num = Number(document.getElementById("finalNumber").value);
    if (!num) return;

    if (mode === "birthday") {
        let original = num - 165;
        let month = Math.floor(original / 100);
        let day = original % 100;

        const months = ["January","February","March","April","May","June",
                        "July","August","September","October","November","December"];

        let testDate = new Date(2024, month - 1, day);
        if (month < 1 || month > 12 || testDate.getMonth() !== month - 1 || testDate.getDate() !== day) {
            document.getElementById("result").innerHTML = "Not correct? Try again 🤣";
            document.getElementById("homeBtn").style.display = "inline-block";
            return;
        }

        savedDay = day;
        savedMonthName = months[month-1];

        document.getElementById("result").innerText =
            `🎉 You were born on ${day} ${savedMonthName}!`;

        document.getElementById("yearBtn").style.display = "inline-block";
        fireConfetti();
    } else {
        let age = Math.floor((num - currentYear) / 100);
        let birthYear = currentYear - age;

        if (birthYear < 1950 || birthYear > currentYear) {
            document.getElementById("result").innerHTML = "Not correct? Try again 🤣";
            document.getElementById("homeBtn").style.display = "inline-block";
            return;
        }

        document.getElementById("result").innerHTML =
            `🤯 You were born in ${birthYear}! <br><br>
             🎉 Your Date Of Birth is ${savedDay} ${savedMonthName} ${birthYear}!`;

        fireConfetti();
    }

    document.getElementById("homeBtn").style.display = "inline-block";
}

function startYearTrick() {
    mode = "year";
    step = 0;
    document.getElementById("titleText").innerText = "🔮 Watch Me Guess Your Birth Year";
    document.getElementById("stepText").innerText = yearSteps[0];
    document.getElementById("inputArea").style.display = "none";
    document.getElementById("result").innerText = "";
    document.getElementById("homeBtn").style.display = "none";
}

function goHome() {
    step = 0;
    document.getElementById("titleText").innerText =
        mode === "birthday" ? "🔮 Watch Me Guess Your Birthday" : "Watch Me Guess Your Birth Year";
    document.getElementById("stepText").innerText =
        mode === "birthday" ? birthdaySteps[0] : yearSteps[0];
    document.getElementById("result").innerText = "";
    document.getElementById("inputArea").style.display = "none";
    document.getElementById("homeBtn").style.display = "none";
}

function fireConfetti() {
    const duration = 2000;
    const end = Date.now() + duration;
    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();
}
