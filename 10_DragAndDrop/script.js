window.addEventListener("DOMContentLoaded", () => {
	const root = document.createElement("div");
	const divContainer = document.createElement("div");
	const divCircle = document.createElement("div");
	const previous = {x: undefined, y: undefined};
	root.classList.add("root");
	divCircle.classList.add("circle");
	divContainer.classList.add("container");
	divContainer.dataset["mouse"] = false;
	root.appendChild(divContainer);
	document.body.appendChild(root);
	document.body.appendChild(divCircle);
	listener(root, divContainer, divCircle, previous,"container", "active");
	
});

const listener = (root, divContainer, divCircle, store, classOne, classTwo) => {
	document.addEventListener("mousedown", e => mouseDown(e, root, divContainer, divCircle, store, classOne, classTwo));
	document.addEventListener("mouseup", e => mouseUp(e, divContainer, divCircle, classOne, classTwo));
	document.addEventListener("mouseout", e => mouseOut(e, divContainer, divCircle, classTwo));
	document.addEventListener("mousemove", e => mouseMove(e, root, divContainer, divCircle, store, classOne, classTwo));
};

const mouseDown = (event, root, container, circle, store, classOne, classTwo) => {
	if(event.target.classList.contains(classOne)){
		[store.x, store.y] = [event.clientX - root.getBoundingClientRect().left, event.clientY - root.getBoundingClientRect().top];
		circle.classList.add(classTwo);
		moveAt(circle, event.clientX, event.clientY);
		container.dataset.mouse = true;
		// console.log(`Mouse Down ${store.x},${store.y}`);
	}
};

const mouseUp = (event, container, circle, classOne, classTwo) => {
	if(event.target.classList.contains(classOne)){
		circle.classList.remove(classTwo);
		container.dataset.mouse = false;
	}
};

const mouseOut = (event, container, circle, classTwo) => {
	circle.classList.remove(classTwo);
	container.dataset.mouse = false;
};

const mouseMove = (event, root, container, circle, store, classOne, classTwo) => {
	if(event.target.classList.contains(classOne) && container.dataset.mouse === "true"){
		circle.classList.remove(classTwo);
		setTimeout(() => moveAt(circle, event.clientX, event.clientY), 100);
		circle.classList.add(classTwo);
		const nextPointX = (event.pageX - store.x);
		const nextPointY = (event.pageY - store.y);
		moveAt(root, nextPointX, nextPointY);
	}
};	

const moveAt = (item, x, y) => {
	item.style.top = `${y}px`;
	item.style.left = `${x}px`;
}

