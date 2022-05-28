import { HTML } from "../main";

window.addEventListener("DOMContentLoaded", initSignUp);

function initSignUp() {
  HTML.formLink = document.querySelector("#link-to-form");
  HTML.form = document.querySelector("#sign-up-form");
  HTML.formLink.addEventListener("click", focusForm);
}

function focusForm() {
  HTML.form.querySelector("input:first-of-type").focus();
}
