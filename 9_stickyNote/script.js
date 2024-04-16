document.addEventListener("DOMContentLoaded", () => {
	const divSticky = document.createElement("div");
	const divScroll = document.createElement("div");

	divSticky.classList.add("container-sticky");
	divScroll.classList.add("container-scroll");
	document.body.appendChild(divSticky);
	document.body.appendChild(divScroll);

});
