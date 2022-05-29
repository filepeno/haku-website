import calculateHeroHeight from "./js/hero-height";
import { trackScreenResize } from "./js/resize";
import { addScrollListener, removeScrollListener } from "@jamestomasino/scroll-frame";
import { initHeader } from "./js/top-navigation";
import { fadeInOnScroll } from "./js/animations";
import "./style.scss";

export const HTML = {};

initHeader();
calculateHeroHeight();
trackScreenResize();
addScrollListener(fadeInOnScroll);
