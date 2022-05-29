import { closeExpandable } from "./top-navigation";
import calculateHeroHeight from "./hero-height";

let throttled = false;
const delay = 1000;

function throttleResize() {
  if (throttled === false) {
    throttled = true;
    calculateHeroHeight();
    if (getInnerWidth() > 760) {
      closeExpandable();
    }
    setTimeout(() => {
      throttled = false;
    }, delay);
  }
}
export function getInnerWidth() {
  return window.innerWidth;
}

export function trackScreenResize() {
  window.addEventListener("resize", throttleResize);
}
