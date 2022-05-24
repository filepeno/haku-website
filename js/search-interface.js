import { findAll } from "./full-search";
import { autoSuggest } from "./autosuggest";

export const HTML = {};

window.addEventListener("load", trackInteraction);

trackInteraction();

function trackInteraction() {
  trackReturn();
  /*   trackNextAndPrevBtn(); */
}

function trackReturn() {
  const input = document.querySelector("#search-input");
  let q;
  input.onkeydown = (e) => {
    q = input.value;
    //check if return key
    if (e.keyCode === 13) {
      e.preventDefault();
      handleRequest(q);
      blurInput(input);
    }
  };
  input.onkeyup = () => {
    q = input.value;
    if (q.length > 1) {
      autoSuggest(q);
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

export function displayResultFeedback(q, hits) {
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

export function displayScope(fromValue, toValue) {
  document.querySelector("[data-from]").textContent = fromValue;
  document.querySelector("[data-to]").textContent = toValue;
}

export function toggleSearchArea() {
  document.querySelector(".results-wrapper").classList.remove("hidden");
  document.querySelector(".hero").classList.add("search-active");
}
