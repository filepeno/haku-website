import { gsap } from "gsap";
import anime from "animejs/lib/anime.es.js";

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
  console.log(arrow, path);
  var myPath = anime.path(path);
  arrow.classList.remove("hidden");
  anime({
    targets: arrow,
    translateX: myPath("x"),
    translateY: myPath("y"),
    /* rotate: myPath("angle"), */
    duration: 1000,
    direction: "reverse",
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
