import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateArrow } from "./animations";

gsap.registerPlugin(ScrollTrigger);

export function checkIfInViewport() {
  const el = document.querySelector("#target-and-arrow");
  const position = getPosition(el);
  console.log("position", position);
  if (position > 0.15 && position < 0.85) {
    animateArrow();
    console.log("untrack");
    ScrollTrigger.removeEventListener("scrollStart", checkIfInViewport);
    return true;
  }
}

function getPosition(el) {
  return ScrollTrigger.positionInViewport(el);
}
