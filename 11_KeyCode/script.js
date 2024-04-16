class Node {
	constructor(val){
		this.previous = null;
		this.data = val;
		this.next = null;
	}
}

class DlinkList{
	constructor(){
		this.head = null;
		this.current = null;
		this.tail = null;
		this.size = 0;
	}
	add(data){
		const node = new Node(data);
		if(this.head === null){
			this.head = node;
			this.current = node;
			this.tail = node;
		}else{
			let current = this.tail;
			node.previous = current;
			current.next = node;
			this.tail = node;
		}
		this.size += 1;
	}
	gethead(){ return this.head; }
	getCurrent(){ return this.current; }
	getCurrentNext(){ 
		if(this.current.next !== null){
			this.current = this.current.next;
		}
		return this.current;
	}
	getCurrentPrevious(){
		if(this.current.previous !== null){
			this.current = this.current.previous;
		}
		return this.current;
	}
	getTail(){ return this.tail; }
	isHead(nodeVal){ return nodeVal === this.head;}
	isTail(nodeVal){ return nodeVal === this.tail;}
	getSize(){ return this.size; }
	
}
window.addEventListener("DOMContentLoaded", () => {
	const link = new DlinkList();
	createTags();
	getAllInputsText().forEach(dataInput => link.add(dataInput));
	listener(link);
});


const createTags = () => {
	const divContainer = document.createElement("div");
	const form = document.createElement("form");
	const divVertical = document.createElement("div");
	const h1 = document.createElement("h1");
	const divContainerDigit = document.createElement("div");
	const submit = document.createElement("input");
	divContainer.classList.add("container");
	divVertical.classList.add("vertical-center");
	divContainerDigit.classList.add("align-digit");
	h1.textContent = "Enter code:"
	submit.type = "submit";
	submit.value = "Submit";
	divContainerDigit.appendChild(generateDigit())
	const span = document.createElement("span");
	span.classList.add("hyphen");
	divContainerDigit.appendChild(span);
	divContainerDigit.appendChild(generateDigit());
	divVertical.appendChild(h1);
	divVertical.appendChild(divContainerDigit);
	divVertical.appendChild(submit)
	form.appendChild(divVertical);
	divContainer.appendChild(form);
	document.body.appendChild(divContainer);
}

const generateDigit = (nbInput = 3) => {
	const div = document.createElement("div");
	for(let i = 0; i < nbInput; ++i){
		const input = document.createElement("input");
		input.type = "text";
		input.setAttribute("maxlength", '1');
		div.appendChild(input);
	}
	return div;
}

const createAlert = () => {
	const divAlert = document.createElement("div");
	const pText1 = document.createElement("p");
	const pText2 = document.createElement("p");
	const btn = document.createElement("button");
	btn.textContent = "OK";
	divAlert.classList.add("alert-pannel");
	divAlert.appendChild(pText1);
	divAlert.appendChild(pText2);
	divAlert.appendChild(btn);
	pText1.textContent = "localhost:" + Math.floor((Math.random() * (65535 - 49152) + 49152)); //  49,152 to 65,535
	btn.addEventListener("click", () => {
		const parent = document.querySelector(".alert-pannel");
		parent.classList.add("move");
		const submitBtn = document.querySelector("input[type='submit']");
		submitBtn.classList.remove("down");
	});

	divAlert.addEventListener("animationend", () => {
		const parent = document.querySelector(".alert-pannel");
		parent.querySelectorAll('*').forEach(node => node.remove());
		parent.remove();
	});
	return divAlert;
}
const listener = (link) => {
	document.querySelector("input[type='submit']").addEventListener("click", e => submitEvent(e, link));
	document.addEventListener("mouseup", e => mouseEventUp(e, link));
	getAllInputsText().forEach(input => input.addEventListener("keyup", e => inputEventKeyUp(e, link)));
	getAllInputsText().forEach(input => input.addEventListener("keydown", e => inputEventKeyDown(e, link)));
}
const submitEvent = (event, link) => {
	event.preventDefault();
	let [cur, check, code] = [link.gethead(), 0, ""];
	for(let i = 0; i < link.getSize(); ++i){
		if(isDigit(cur.data.value)){
			code += cur.data.value;
			check++;
		}
		cur = cur.next;
	}

	if(check === link.getSize() && link.getCurrent() === link.getTail()){
		event.target.classList.add("down");
		const last = link.getTail();
		last.data.blur();
		const divAlert = createAlert();
		const pCode = divAlert.querySelector("p:nth-child(2)");
		pCode.textContent = "Value is " + code;
		document.body.appendChild(divAlert);
	}
}
const mouseEventUp = (event, link) => {
	if(event.target.tagName.toLowerCase() === 'input'){
		const cur = link.getCurrent();
		cur.data.focus();
	}
	
}
const inputEventKeyDown = (event, link) => {
	// Backspace
	if(event.keyCode === 8){
		const cur = link.getCurrent();
		if(cur.data === event.target){
			if(cur.data.value === ""){
				const previous = link.getCurrentPrevious();
				previous.data.focus();
			}else{
				cur.data.focus();
			}
			
		}	
	}
}
const inputEventKeyUp = (event, link) => {
	if( (event.shiftKey && isDigit(event.key))  || isDigit(event.key) ){
		const cur = link.getCurrent();
		if(cur.data === event.target){
			event.target.value = event.key;
			const next = link.getCurrentNext();
			next.data.focus();
		}else{
			event.target.value = "";
		}	
	}
	else if(event.keyCode === 16){
		// Just Shift
	}
	else{
		event.target.value = '';
	}
}

const getAllInputsText = () => {
	return Array.from(document.querySelectorAll("input[type='text']"));
}
const isDigit = data => (data >= '0' && data <= '9');
