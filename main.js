const currentTotalAtRisk = document.querySelector("#current-total-at-risk");
const currentTotalToWin = document.querySelector("#current-total-to-win");
const hedgeWager = document.querySelector("#hedge-wager");
const odds = document.querySelector("#odds");
const calculateButton = document.querySelector("#calculate-button");
const clearButton = document.querySelector("#clear-button");
const noBetWorstCase = document.querySelector(".no-bet-worst-case");
const noBetBestCase = document.querySelector(".no-bet-best-case");
const betWorstCase = document.querySelector(".bet-worst-case");
const betBestCase = document.querySelector(".bet-best-case");

calculateButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clearInputs);

function calculate(event) {
  event.preventDefault();
  noBetWorstCase.innerText = "Lose " + currentTotalAtRisk.value;
  noBetBestCase.innerText = "Win " + currentTotalToWin.value;
}

function getPayoutForHedgeBet(riskAmount, odds) {
  // for Even money
  if (odds.toLowerCase() === "even") {
    return riskAmount;
  }
  // for negative odds
  if (odds < 0) {
    return (riskAmount / (odds / 100)) * -1;
  }
  // for positive odds
  if (odds > 0) {
    return riskAmount * (odds / 100);
  }
}

function clearInputs() {
  currentTotalAtRisk.value = "";
  currentTotalToWin.value = "";
  hedgeWager.value = "";
  odds.value = "";
  noBetWorstCase.innerText = "";
  noBetBestCase.innerText = "";
}
