import findAll from "./full-search";

let q;
let i = 1;

trackInteraction();

function trackInteraction() {
  trackReturn();
  trackNextButton();
}

function trackReturn() {
  const input = document.querySelector("#search-input");
  input.onkeydown = (e) => {
    q = input.value;
    //check if return key
    if (e.keyCode === 13) {
      e.preventDefault();
      handleRequest(q);
      blurInput(input);
    }
  };
}

function handleRequest(q) {
  if (q) {
    findAll(q, 0);
  } else {
    displayResultFeedback(q);
  }
  clearResults();
}

export function displayResultFeedback(hits) {
  const el = document.querySelector(".result-feedback");
  if (hits > 0) {
    el.querySelector(".hits").textContent = hits;
  } else {
    el.querySelector(".hits").textContent = "0";
  }
  el.classList.remove("hidden");
}

export function clearResults() {
  const parent = document.querySelector(".results-area");
  parent.innerHTML = "";
}

function blurInput(input) {
  input.blur();
}

function trackNextButton() {
  const nextPageBtn = document.querySelector(".next-page-btn");
  nextPageBtn.addEventListener("click", nextPage);
}

function nextPage() {
  clearResults();
  findAll(q, i);
  i++;
}

export function displayScope(fromValue, toValue) {
  document.querySelector("[data-from]").textContent = fromValue;
  document.querySelector("[data-to]").textContent = toValue;
}
