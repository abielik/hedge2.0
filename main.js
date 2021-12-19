const currentTotalAtRisk = document.querySelector("#current-total-at-risk");
const currentTotalToWin = document.querySelector("#current-total-to-win");
const hedgeWager = document.querySelector("#hedge-wager");
const odds = document.querySelector("#odds");
const noBetWorstCase = document.querySelector(".no-bet-worst-case");
const noBetBestCase = document.querySelector(".no-bet-best-case");
const betWin = document.querySelector(".bet-win");
const betLose = document.querySelector(".bet-lose");
const hedgeCalculation = document.querySelector(".hedge-calculation");
const valuesWithInitialValueEmpty = document.querySelectorAll(".initial-empty");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  if (button.dataset.action === "calculate button") {
    button.addEventListener("click", calculate);
  }

  if (button.dataset.action === "clear button") {
    button.addEventListener("click", clearInputs);
  }
});

odds.oninput = handleHedgeCalculationOnChange;
hedgeWager.oninput = handleHedgeCalculationOnChange;

function calculate(event) {
  event.preventDefault();
  if (isValidInput()) {
    setNoBetResults();
    setWinningHedgeResults(hedgeWager, odds);
    setLosingHedgeResults(hedgeWager);
  }
}

// Check for valid input
function isValidInput() {
  // IF either wager, current at risk amount, or current total to win is negative, return false
  if (
    hedgeWager.value < 0 ||
    currentTotalAtRisk.value < 0 ||
    currentTotalToWin.value < 0
  ) {
    alert("Some values must be greater than 0");
    return false;
  }
  return true;
}

// Set text of "no bet" worst and best case scenarios
function setNoBetResults() {
  noBetWorstCase.innerText = "Lose $" + currentTotalAtRisk.value;
  noBetBestCase.innerText = "Win $" + currentTotalToWin.value;
}
function setWinningHedgeResults(riskAmount, odds) {
  betWin.innerText =
    Math.round(getPayoutForHedgeBet(riskAmount, odds)) -
    currentTotalAtRisk.value;
}

function setLosingHedgeResults(riskAmount) {
  betLose.innerText = currentTotalToWin.value - riskAmount.value;
}

function getPayoutForHedgeBet(riskAmount, odds) {
  // for Even money
  if (odds.value.toLowerCase() === "even") {
    return riskAmount.value;
  }
  // for negative odds
  if (odds.value < 0) {
    return (riskAmount.value / odds.value) * -100;
  }
  // for positive odds
  if (odds.value > 0) {
    return riskAmount.value * (odds.value / 100);
  }
}

function handleHedgeCalculationOnChange() {
  if (hedgeWager.value < 1 || !odds.value) {
    return (hedgeCalculation.innerText = "");
  }
  hedgeCalculation.innerText = `$${Math.round(
    getPayoutForHedgeBet(hedgeWager, odds)
  )}`;
}

function clearInputs() {
  valuesWithInitialValueEmpty.forEach((value) => {
    value.value = "";
    value.innerText = "";
  });

  handleHedgeCalculationOnChange();
}
