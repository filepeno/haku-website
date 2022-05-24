import { findAll } from "./full-search";
import { autoSuggest } from "./autosuggest";

export const HTML = {};

window.addEventListener("load", trackInteraction);

init();

function init() {
  HTML.input = document.querySelector("#search-input");
  trackInteraction();
}

function trackInteraction() {
  trackReturn();
  /*   trackNextAndPrevBtn(); */
}

function trackReturn() {
  HTML.input.onkeydown = (e) => {
    //check if return key
    if (e.keyCode === 13) {
      e.preventDefault();
      handleRequest(HTML.input.value);
      blurInput();
    }
  };
  HTML.input.onkeyup = () => {
    if (HTML.input.value.length > 1) {
      autoSuggest(HTML.input.value);
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

function blurInput() {
  HTML.input.blur();
}

export function displayScope(fromValue, toValue) {
  document.querySelector("[data-from]").textContent = fromValue;
  document.querySelector("[data-to]").textContent = toValue;
}

export function toggleSearchArea() {
  document.querySelector(".results-wrapper").classList.remove("hidden");
  document.querySelector(".hero").classList.add("search-active");
}

export function displaySuggestions() {
  console.log("display");
  document.querySelector(".suggestions-wrapper").classList.remove("hidden");
}

export function clearSuggestions() {
  document.querySelector(".suggestions-wrapper ul").innerHTML = "";
}
