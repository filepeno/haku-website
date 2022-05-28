import { gsap } from "gsap";
import anime from "animejs/lib/anime.es.js";
import { elementScrolledIntoView } from "./scroll";

export function rotateMolekyl() {
  const molekyl = document.querySelector("#molekyl");
  gsap.to(molekyl, {
    rotation: 360,
    transformOrigin: "center center",
    duration: 60,
    repeat: -1,
  });
}

export function animateAtom(path, atom, secs, bool) {
  // Create an object that gsap can animate
  const val = { distance: 0 };
  // Create a tween
  gsap.to(val, {
    // Animate from distance 0 to the total distance
    distance: path.getTotalLength(),
    // Loop the animation
    repeat: -1,
    // Make the animation lasts 5 seconds
    duration: secs,
    runBackwards: bool,
    ease: "none",
    // Function call on each frame of the animation
    onUpdate: () => {
      // Query a point at the new distance value
      const point = path.getPointAtLength(val.distance);
      // Update the atom coordinates
      atom.setAttribute("cx", point.x);
      atom.setAttribute("cy", point.y);
    },
  });
}

export function animateArrow() {
  const arrow = document.querySelector("#arrow-wrapper");
  const path = document.querySelector("#arrow-path");
  const myPath = anime.path(path);
  let updates;

  anime({
    targets: arrow,
    translateX: myPath("x"),
    translateY: myPath("y"),
    /* rotate: myPath("angle"), */
    duration: 700,
    direction: "reverse",
    ease: "none",
    update: function (anim) {
      updates++;
      if (Math.round(anim.progress) < 30) {
        arrow.classList.remove("invisible");
      }
    },
    complete: function () {
      arrow.querySelector("#spids").classList.add("hidden");
      skewArrowYoYo(arrow.querySelector("#arrow"));
    },
  });
}

function skewArrowYoYo(arrow) {
  gsap.to(arrow, {
    skewY: "9deg",
    yoyo: true,
    yoyoEase: "power1",
    duration: 0.03,
    repeat: 9,
    /* onComplete: skewArrowStop,
      onCompleteParams: [arrow, 7], */
  });
}

function skewArrowStop(arrow, i) {
  if (i > 1) {
    gsap.to(arrow, {
      skewY: `${i}deg`,
      direction: "alternate",
      duration: 0.3,
      ease: "power1.inOut",
      onComplete: reduce,
    });
    function reduce() {
      skewArrowStop(arrow, i--);
    }
  }
}

export function fadeInOnScroll() {
  const allEls = document.querySelectorAll(".fade");

  allEls.forEach((element) => {
    if (elementScrolledIntoView(element)) {
      if (!element.classList.contains("active")) {
        element.classList.add("active");
      }
    } else {
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      }
    }

    /*     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //console.log(element);
        element.classList.add("active");
      } */
  });
}
