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
  } else {
    displayNegativeResultFeedback();
  }
}

function displayNegativeResultFeedback() {
  const el = document.querySelector(".result-feedback");
  el.classList.remove("hidden");
  el.textContent = "Your search returned 0 results.";
}

function blurInput(input) {
  input.blur();
}
