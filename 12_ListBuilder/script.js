const loadApplication = () => {
	const state = [];
	createItems(["check all", "ice-cream", "hot-dog", "popcorn", "cookie"], "Please, select your food", "line");
	listener(state);
}

const createItems = (food, placeHolder, class1) => {
	const article = document.createElement("article");
	const header = document.createElement("header");
	const input = document.createElement("input");
	input.type= "text";
	input.name = "text";
	input.placeholder = placeHolder;
	const divLine = document.createElement("div");
	divLine.classList.add(class1);
	const main = document.createElement("main");
	for(let data of food){
		const div = document.createElement("div");
		const p = document.createElement("p");
		p.textContent = data;
		div.appendChild(p);
		main.appendChild(div);
	}
	header.appendChild(input);
	header.appendChild(divLine);
	article.appendChild(header);
	article.appendChild(main);
	document.body.appendChild(article);
}

const getElements = (selector) => {
	return Array.from(document.querySelectorAll(selector)) || [] ; 
}
const listener = (state) => {
	getElements("main > div").forEach(div => div.addEventListener("click", (event) => clickEvent(event, state)));
}
const clickEvent = (event, state) => {
	const tagParent = (event.target.tagName.toLowerCase() === "p") ? event.target.parentElement : event.target;
	if(tagParent.outerText.toLowerCase().includes("check")){
		clickAll(state);
	}else{
		clickFood(tagParent, state);
	}

	formatStr(state);
}

const clickAll = (state) => {
	const alldiv = getElements("main > div");
	const notSelectedDiv = getElements("main > :not(div.selected)");
	const selectedDiv = getElements("main > .selected");
	if(alldiv.length - 1 === selectedDiv.length - 1){
		for(const div of alldiv){
			div.classList.remove("selected");
			state.remove(capitalize(div.outerText));
		}
	}else{
		const checkAll = notSelectedDiv.shift();
		checkAll.classList.add("selected");
		for(const div of notSelectedDiv){
			div.classList.add("selected");
			state.push(capitalize(div.textContent));
		}
	}
}
const clickFood = (tagParent, state) => {
	if(tagParent.classList.contains("selected")){
		const allDiv = getElements("main > div");
		const selectedDiv = getElements("main > .selected");
		if(allDiv.length - 1 === selectedDiv.length - 1){
			selectedDiv[0].classList.remove("selected");
		}
		tagParent.classList.remove("selected");
		state.remove(capitalize(tagParent.textContent));
	}else{
		tagParent.classList.add("selected");
		state.push(capitalize(tagParent.textContent));
	}
	// check if the first tag is not selected and the only one
	const notSelectedDiv = getElements("main > :not(div.selected)");
	if (notSelectedDiv.length === 1 && notSelectedDiv[0].outerText.toLowerCase().includes("check")){
		notSelectedDiv[0].classList.add("selected");
	}
}
const capitalize = (str) => {
	return str[0].toUpperCase() + str.slice(1, str.length);
}
const formatStr = (state) => {
	const input = document.querySelector("input");
	if(state.length === 0){
		input.value = "";
	}else if(state.length === 1){
		input.value = state.join("");
	}else if(state.length === 2){
		input.value = state.join(", ");
	}else{
		const lg = state.length - 2;
		const [str1, str2] = [...state]
		input.value = `${str1}, ${str2} and ${lg} more`;
	}

}
Array.prototype.remove = function(item){
	const arr = [];
	for(let i = 0; i < this.length; i++){
		if(this[i] !== item){
			arr.push(this[i]);
		}else{
			delete this[i];
		}
	}
	for(let i = 0; i < arr.length; i++){
		this[i] = arr[i];
	}
	this.length = arr.length;
}
document.addEventListener("DOMContentLoaded", loadApplication);