import { calculateHeroHeight, trackScreenResize } from "./js/hero-height";
import { addScrollListener, removeScrollListener } from "@jamestomasino/scroll-frame";
import { fadeInOnScroll } from "./js/animations";
import "./style.scss";

calculateHeroHeight();
trackScreenResize();
addScrollListener(fadeInOnScroll);
