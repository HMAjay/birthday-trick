let step = 0;
let mode = "birthday";
const currentYear = new Date().getFullYear();

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

    if (step > 0) {
        document.getElementById("backBtn").style.display = "inline-block";
    }

    if (step === steps.length - 1) {
        document.getElementById("inputArea").style.display = "block";
    }
}

function prevStep() {
    if (step > 0) {
        step--;
        const steps = mode === "birthday" ? birthdaySteps : yearSteps;
        document.getElementById("stepText").innerText = steps[step];
    }

    if (step === 0) {
        document.getElementById("backBtn").style.display = "none";
    }

    document.getElementById("inputArea").style.display = "none";
}

function reveal() {
    let num = Number(document.getElementById("finalNumber").value);

    if (!num) {
        document.getElementById("result").innerText = "Enter a number first!";
        return;
    }

    if (mode === "birthday") {
        let original = num - 165;
        let month = Math.floor(original / 100);
        let day = original % 100;

        const months = ["January","February","March","April","May","June",
                        "July","August","September","October","November","December"];

        document.getElementById("result").innerText =
            `🎉 You were born on ${day} ${months[month-1]}!`;

        document.getElementById("yearBtn").style.display = "inline-block";
    }
    else {
        let age = Math.floor((num - currentYear) / 100);
        let birthYear = currentYear - age;

        document.getElementById("result").innerText =
            `🤯 And your birth year is ${birthYear}!`;
    }

    document.getElementById("homeBtn").style.display = "inline-block";
}

function startYearTrick() {
    mode = "year";
    step = 0;
    document.getElementById("stepText").innerText = yearSteps[0];
    document.getElementById("inputArea").style.display = "none";
    document.getElementById("result").innerText = "";
    document.getElementById("finalNumber").value = "";
    document.getElementById("yearBtn").style.display = "none";
}

function goHome() {
    step = 0;

    const steps = mode === "birthday" ? birthdaySteps : yearSteps;
    document.getElementById("stepText").innerText = steps[0];

    document.getElementById("inputArea").style.display = "none";
    document.getElementById("result").innerText = "";
    document.getElementById("finalNumber").value = "";
    document.getElementById("homeBtn").style.display = "none";
    document.getElementById("backBtn").style.display = "none";

    // Only show year button again if we're in birthday mode
    if (mode === "birthday") {
        document.getElementById("yearBtn").style.display = "none";
    }
}

