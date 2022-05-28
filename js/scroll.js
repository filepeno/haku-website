import { removeScrollListener } from "@jamestomasino/scroll-frame";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateArrow } from "./animations";
import { HTML } from "./init-svg";

gsap.registerPlugin(ScrollTrigger);

export function checkIfIntheMiddleOfViewport() {
  const position = getPosition(HTML.targetAndArrowWrapper);
  if (position > 0.15 && position < 0.85) {
    animateArrow();
    removeScrollListener(checkIfIntheMiddleOfViewport);
  }
}

function getPosition(el) {
  return ScrollTrigger.positionInViewport(el);
}

export function trackElPosition() {
  console.log(ScrollTrigger.isScrolling());
  if (checkIfInViewport(HTML.targetAndArrowWrapper)) {
    animateArrow();
    console.log("untrack");
    ScrollTrigger.removeEventListener("scrollStart", trackElPosition);
  }
}

export function elementScrolledIntoView(element) {
  const windowHeight = window.innerHeight;
  const elementTop = element.getBoundingClientRect().top;
  const elementVisible = 50;
  if (elementTop < windowHeight - elementVisible) {
    return true;
  }
}
