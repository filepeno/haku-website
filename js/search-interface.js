import findAll from "./full-search";

//make not-global
let q;
//

export const HTML = {};

init();

function init() {
  HTML.prevBtn = document.querySelector(".prev");
  HTML.nextBtn = document.querySelector(".next");
  HTML.pageControls;
  HTML.pagingWrapper = document.querySelector(".paging");
}

trackInteraction();

function trackInteraction() {
  trackReturn();
  trackNextAndPrevBtn();
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

function trackNextAndPrevBtn() {
  HTML.prevBtn.addEventListener("click", changePage);
  HTML.nextBtn.addEventListener("click", changePage);
}

export function trackPageControls() {
  HTML.pageControls.forEach((element) => {
    element.addEventListener("click", changePage);
  });
}

function changePage() {
  clearResults();
  findAll(q, parseInt(this.dataset.scope));
}

export function displayScope(fromValue, toValue) {
  document.querySelector("[data-from]").textContent = fromValue;
  document.querySelector("[data-to]").textContent = toValue;
}

//highlight current scope
