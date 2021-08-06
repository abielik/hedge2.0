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
const hedgeCalculation = document.querySelector("#hedge-calculation");

calculateButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clearInputs);
odds.oninput = handleHedgeCalculationOnChange;
hedgeWager.oninput = handleHedgeCalculationOnChange;

function calculate(event) {
  event.preventDefault();
  setNoBetResults();
  setWinningHedgeResults(hedgeWager, odds);
  setLosingHedgeResults(hedgeWager);
}

function setNoBetResults() {
  noBetWorstCase.innerText = "Lose " + currentTotalAtRisk.value;
  noBetBestCase.innerText = "Win " + currentTotalToWin.value;
}

function setWinningHedgeResults(riskAmount, odds) {
  betWinBestCase.innerText =
    getPayoutForHedgeBet(riskAmount, odds) - currentTotalAtRisk.value;
}

function setLosingHedgeResults(riskAmount) {
  betLoseBestCase.innerText = currentTotalToWin.value - riskAmount.value;
}

function getPayoutForHedgeBet(riskAmount, odds) {
  // for Even money
  if (odds.value.toLowerCase() === "even") {
    return riskAmount.value;
  }
  // for negative odds
  if (odds.value < 0) {
    return (riskAmount.value / (odds.value / 100)) * -1;
  }
  // for positive odds
  if (odds.value > 0) {
    return riskAmount.value * (odds.value / 100);
  }
}

function handleHedgeCalculationOnChange() {
  if (!hedgeWager.value || !odds.value) {
    return (hedgeCalculation.innerText = "");
  }
  hedgeCalculation.innerText = `To Win: ${getPayoutForHedgeBet(
    hedgeWager,
    odds
  )}`;
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
