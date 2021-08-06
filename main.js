const currentTotalAtRisk = document.querySelector("#current-total-at-risk");
const currentTotalToWin = document.querySelector("#current-total-to-win");
const hedgeWager = document.querySelector("#hedge-wager");
const odds = document.querySelector("#odds");
const calculateButton = document.querySelector("#calculate-button");
const clearButton = document.querySelector("#clear-button");
const noBetWorstCase = document.querySelector(".no-bet-worst-case");
const noBetBestCase = document.querySelector(".no-bet-best-case");
const betWinWorstCase = document.querySelector(".bet-win-worst-case");
const betWinBestCase = document.querySelector(".bet-win-best-case");
const betLoseWorstCase = document.querySelector(".bet-lose-worst-case");
const betLoseBestCase = document.querySelector(".bet-lose-best-case");

calculateButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clearInputs);

function calculate(event) {
  event.preventDefault();
  getNoBetResults();
}

function getNoBetResults() {
  noBetWorstCase.innerText = "Lose " + currentTotalAtRisk.value;
  noBetBestCase.innerText = "Win " + currentTotalToWin.value;
}

function getWinningHedgeResults() {}

function getLosingHedgeResults() {}

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
  betWinWorstCase.innerText = "";
  betWinBestCase.innerText = "";
  betLoseWorstCase.innerText = "";
  betLoseBestCase.innerText = "";
}
