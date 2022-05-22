import findAll from "./full-search";

//make not-global
let q;
let i = 1;
//

export const HTML = {};

init();

function init() {
  HTML.prevBtn = document.querySelector(".prev");
  HTML.nextBtn = document.querySelector(".next");
  HTML.scopeControls = document.querySelectorAll("[data-scope]");
}

trackInteraction();

function trackInteraction() {
  trackReturn();
  trackScopeControls();
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
    findAll(q, 1);
  } else {
    displayResultFeedback(q);
  }
  clearResults();
}

export function displayResultFeedback(hits) {
  const el = document.querySelector(".result-feedback");
  el.querySelector("[data-query]").textContent = q;
  if (hits > 0) {
    el.querySelector("[data-hits]").textContent = hits;
  } else {
    el.querySelector("[data-hits]").textContent = "0";
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

function trackScopeControls() {
  HTML.scopeControls.forEach((element) => {
    element.addEventListener("click", changePage);
  });
}

function changePage() {
  console.log(this);
  clearResults();
  findAll(q, i);
}

export function displayScope(fromValue, toValue) {
  document.querySelector("[data-from]").textContent = fromValue;
  document.querySelector("[data-to]").textContent = toValue;
}

//highlight current scope
