const initApp = () => {
	createContent();
	const obs = new IntersectionObserver(debounce(obsCallBack, 500) , {thresold: 0.75});
	obs.observe(getLastItem());
};

const createContent = () => {
	const div = document.createElement("div");
	div.classList.add("container-watch");
	document.body.appendChild(div);
};

const getLastItem = (req = ".container-watch:last-child") => {
	return document.querySelector(req);
}
const obsCallBack = (entries, observable) => {
	if(entries[0].isIntersecting){
		observable.observe(entries[0].target);
		createContent();
		observable.observe(getLastItem());
	}
}
const debounce = (callBack, time) => {
	let idTime = undefined;
	clearTimeout(idTime);
	return (...args) => {
		idTime = setTimeout(() => {
			callBack(...args);
		}, time);
	}
}
document.addEventListener('DOMContentLoaded', initApp);