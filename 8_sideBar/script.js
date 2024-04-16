
const initApp = () => {
	createSideBar();
	createContent();
	namingData();

	document.addEventListener('mousedown', event => {
		if(event.target.tagName.toLowerCase() === "body" || event.target.tagName.toLowerCase() === "html"){
			const sideState = document.querySelector(".side-bar-left");
			if(sideState.classList.contains("open")){
				eventClose();
			}
		}
	});
};

const createContent = () => {
	const divContainer = document.createElement("div");
	const divItems = document.createElement("div");
	const btnSearch = document.createElement("button");
	const btnRun = document.createElement("button");
	btnSearch.textContent = "Search";
	btnRun.textContent = "Run";
	btnSearch.dataset["type"] = "search";
	btnRun.dataset["type"] = "run";
	btnSearch.addEventListener('click', () => eventBtn("Whoa! You found me!", "Hide back"));
	btnRun.addEventListener('click', () => eventBtn("Please don't run!", "Close"));
	divContainer.classList.add("container-panel");
	divItems.classList.add("root");
	divItems.appendChild(btnSearch);
	divItems.appendChild(btnRun);
	divContainer.appendChild(divItems);
	document.body.appendChild(divContainer);
};
const createSideBar = () => {
	const divSideBar = document.createElement("div");
	divSideBar.classList.add("side-bar-left", "close");
	document.body.appendChild(divSideBar);
	createSideBarElement();
};

const createSideBarElement = () => {
	const divSideBar = document.querySelector(".side-bar-left");
	const divElement = document.createElement("div");
	divElement.classList.add("container-side-bar", "hidden");
	const h1 = document.createElement("h1");
	h1.classList.add("font-title");
	const btn = document.createElement("button");
	btn.addEventListener('click', () => eventClose());
	divElement.appendChild(h1);
	divElement.appendChild(btn);
	divSideBar.appendChild(divElement);
}

const namingData = (hText = "Hi there!", bText = "Error 404") => {
	const containerSideBar = Array.from(document.querySelectorAll(".container-side-bar > *"));
	let [title, btn] = [...containerSideBar];
	title.textContent = hText;
	btn.textContent = bText;
}
const eventBtn = (h1Text, btnText) => {
	const selectorSideBar = document.querySelector(".side-bar-left");
	const selectorCtn = document.querySelector(".container-side-bar");
	namingData(h1Text, btnText);
	toogleBtn(true);
	selectorCtn.classList.remove("hidden");
	selectorCtn.classList.add("visible");
	selectorSideBar.classList.remove("close");
	selectorSideBar.classList.add("open");
};

const eventClose = () => {
	const selectorClose = document.querySelector(".side-bar-left");
	const selectorCtn = document.querySelector(".container-side-bar");
	selectorCtn.classList.remove("visible");
	selectorCtn.classList.add("hidden");
	selectorClose.classList.remove("open");
	selectorClose.classList.add("close");
	toogleBtn(false);
};

const toogleBtn = (state = false) => {
	[...document.querySelectorAll("[data-type]")].forEach(btn => btn.disabled = state);
}
document.addEventListener("DOMContentLoaded", initApp);