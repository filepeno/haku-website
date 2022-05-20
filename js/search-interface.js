import findAll from "./full-search";

trackInput();

function trackInput() {
  const input = document.querySelector("#search-input");
  trackReturn(input);
}

function trackReturn(input) {
  input.onkeydown = (e) => {
    //check if return key
    if (e.keyCode === 13) {
      e.preventDefault();
      handleRequest(input.value);

      blurInput(input);
    }
  };
}

function handleRequest(q) {
  if (q) {
    findAll(q);
  }
  clearResults();
  displayResultFeedback(q);
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
