const billAmount = document.getElementById("bill");
const numberOfPeople = document.getElementById("people");
const customTipPercentage = document.getElementById("custom");
const billTipAmount = document.getElementById("tipAmount");
const billTotalPerPerson = document.getElementById("total");
const resetButton = document.getElementById("resetBtn");
const buttons = document.querySelectorAll(".tip-btns button");

let selectedTipPercentage = 0; // Variable to store the last selected tip percentage

// Calculate Tip When Click On Tip Percentage Button
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (billAmount.value === "") return;

        // Store the selected tip percentage
        selectedTipPercentage = parseInt(e.target.innerText);

        // If customTipPercentage has a value, reset it
        if (customTipPercentage.value !== "") {
            customTipPercentage.value = "";
        }

        calculateTip(
            parseFloat(billAmount.value),
            selectedTipPercentage,
            parseInt(numberOfPeople.value) || 1
        );
    });
});

// Calculate Tip When User Gives Custom Tip Percentage Input
customTipPercentage.addEventListener("input", () => {
    if (billAmount.value === "") return;

    calculateTip(
        parseFloat(billAmount.value),
        parseInt(customTipPercentage.value) || 0,
        parseInt(numberOfPeople.value) || 1
    );
});

// Calculate Tip when Number of People changes
numberOfPeople.addEventListener("input", () => {
    if (billAmount.value === "") return;

    calculateTip(
        parseFloat(billAmount.value),
        selectedTipPercentage || parseInt(customTipPercentage.value) || 0,
        parseInt(numberOfPeople.value) || 1
    );
});

// Calculate Tip
function calculateTip(billAmount, tipPercentage, numberOfPeople) {
    let tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
    tipAmount = isNaN(tipAmount) ? 0 : tipAmount;
    let tip = Math.floor(tipAmount * 100) / 100;
    tip = tip.toFixed(2);

    let totalAmount = (tipAmount * numberOfPeople + billAmount) / numberOfPeople;
    totalAmount = totalAmount.toFixed(2);

    billTipAmount.innerHTML = `$${tip}`;
    billTotalPerPerson.innerHTML = `$${totalAmount}`;
}

// Reset Everything
resetButton.addEventListener("click", resetEverything);

function resetEverything() {
    billTipAmount.innerHTML = "$0.00";
    billTotalPerPerson.innerHTML = "$0.00";
    billAmount.value = "";
    numberOfPeople.value = "";
    customTipPercentage.value = "";
    selectedTipPercentage = 0;
}

