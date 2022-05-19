trackInput();

function trackInput() {
  const input = document.querySelector("#search-input");
  input.onkeydown = (e) => {
    //check if return key
    if (e.keyCode === 13) {
      e.preventDefault();
      blurInput(input);
      console.log("submit");
    }
  };
}

function blurInput(input) {
  input.blur();
}
