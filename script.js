"use strict"

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