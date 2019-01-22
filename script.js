"use strict"

// highlight links
const links = document.querySelectorAll("a");

const highlight = document.createElement("span");
highlight.classList.add("highlight");
document.body.append(highlight);

function addHighlight() {
	const coordinates = this.getBoundingClientRect();
	const coords = {
		width: coordinates.width,
		height: coordinates.height,
		top: coordinates.top + window.scrollY,
		left: coordinates.left + window.scrollX
	};

	highlight.style.width = `${coords.width}px`;
	highlight.style.height = `${coords.height}px`;
	highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

links.forEach(a => a.addEventListener("mouseenter", addHighlight));

// hide navbar
const nav = document.querySelector("nav");

function toggleNav() {
	if (nav.classList.contains("show-nav")) {
		nav.classList.remove("show-nav");
	} else {
		nav.classList.add("show-nav");
	}
}

window.addEventListener("click", toggleNav);


// debounce
function debounce(func, wait = 15, immediate = true) {
	let timeout;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

// slide images
const slidingImg = document.querySelectorAll("img");

function checkSlide(e) {
	slidingImg.forEach(slidingImg => {
		const slideInAt = (window.scrollY + window.innerHeight) - slidingImg.height / 2;
		const imgBottom = slidingImg.offsetTop + slidingImg.height;
		const isHalf = slideInAt > slidingImg.offsetTop;
		const isNotPast = window.scrollY < imgBottom;

		if (isHalf && isNotPast) {
			slidingImg.classList.add("active");
		} else {
			slidingImg.classList.remove("active");
		}
	});
}

window.addEventListener("scroll", debounce(checkSlide));

