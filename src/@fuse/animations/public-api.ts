import { expandCollapse } from "./expand-collapse";
import { fadeIn, fadeInTop, fadeInBottom, fadeInLeft, fadeInRight, fadeOut, fadeOutTop, fadeOutBottom, fadeOutLeft, fadeOutRight } from "./fade";
import { shake } from "./shake";
import { slideInTop, slideInBottom, slideInLeft, slideInRight, slideOutTop, slideOutBottom, slideOutLeft, slideOutRight } from "./slide";
import { zoomIn, zoomOut } from "./zoom";


export const fuseAnimations = [
    expandCollapse,
    fadeIn, fadeInTop, fadeInBottom, fadeInLeft, fadeInRight,
    fadeOut, fadeOutTop, fadeOutBottom, fadeOutLeft, fadeOutRight,
    shake,
    slideInTop, slideInBottom, slideInLeft, slideInRight,
    slideOutTop, slideOutBottom, slideOutLeft, slideOutRight,
    zoomIn, zoomOut,
];
