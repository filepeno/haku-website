import { removeScrollListener } from "@jamestomasino/scroll-frame";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateArrow } from "./animations";
import { HTML } from "./init-svg";

gsap.registerPlugin(ScrollTrigger);

export function checkIfIntheMiddleOfViewport() {
  const position = getPosition(HTML.targetAndArrowWrapper);
  console.log("position", position);
  if (position > 0.15 && position < 0.85) {
    console.log("in the center");
    animateArrow();
    removeScrollListener(checkIfIntheMiddleOfViewport);
  }
}

function getPosition(el) {
  console.log(el);
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

export function fadeInOnScroll() {
  const allEls = document.querySelectorAll(".fade");

  allEls.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 10;

    if (elementTop < windowHeight - elementVisible) {
      if (!element.classList.contains("active")) {
        element.classList.add("active");
        console.log(element, "ADD active");
      }
    } else {
      if (element.classList.contains("active")) {
        element.classList.remove("active");
        console.log(element, "REMOVE active");
      }
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      console.log(element);
      element.classList.add("active");
    }
  });
}

function trackScroll() {}
