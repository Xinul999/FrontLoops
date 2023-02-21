document.addEventListener("DOMContentLoaded",() => {
    createInterface();
});

const createInterface = () => {
    const article = document.createElement("article");
    const div = document.createElement("div");
    const divLine = document.createElement("div");
    const divInfo = document.createElement("div");
    const input = document.createElement("input");
    const button = document.createElement("button");
    const p = document.createElement("p");

    div.classList.add("d-flex", "align-items", "justify-content");

    input.setAttribute("placeholder", "Enter tab index");

    button.textContent = "Change tab";

    divLine.classList.add("line", "border-bottom-grey");

    helperSpans(divInfo);

    divInfo.classList.add("padding-18");
    p.textContent = divInfo.firstElementChild.dataset["info"];


    div.appendChild(input);
    div.appendChild(button);
    div.appendChild(divLine);
    article.appendChild(div);
    article.appendChild(divLine);
    article.appendChild(divInfo);
    article.appendChild(p);
    document.body.appendChild(article);

    helperEventListener();

}
const helperEventListener = () => {
    const input = document.querySelector('input');
    const button = document.querySelector('button');
    input.addEventListener("focusin", focusInput);
    input.addEventListener("focusout", unFocusInput);
    button.addEventListener("click", toogleTab);
    [...document.querySelectorAll('[data-info]')].forEach(span => span.addEventListener("click", spanEvent));
}
const helperSpans = parent => {
    const spanPositive = document.createElement("span");
    const spanNegative = document.createElement("span");
    const spanNeutral = document.createElement("span");
    spanPositive.textContent = "POSITIVE";
    spanPositive.dataset.info = "Positive content";
    spanPositive.setAttribute("selected", true);
    spanNegative.textContent = "NEGATIVE";
    spanNegative.dataset.info = "Negative content";
    spanNeutral.textContent = "NEUTRAL";
    spanNeutral.dataset.info = "Neutral content";
    parent.appendChild(spanPositive);
    parent.appendChild(spanNegative);
    parent.appendChild(spanNeutral);

}
const toogleTab = () => {
    // change spans [positive, negative, neutral]
    // console.debug(`Clicked button toogling ${event.target}`);
    const allSpans = [...document.querySelectorAll("span")];
    const index = Number(document.querySelector("input").value);

    if(index > 0 && index <= allSpans.length){
            removeSpanSelected();
            const currentSpan = allSpans[index - 1];
            const p = document.querySelector("p");
            currentSpan.setAttribute("selected", true);
            p.textContent = currentSpan.dataset["info"];

    }else{
        createModal("Tabs index", `Index ${index} is not correct!`);
        // window.alert("Index not existing");
    }

}

const focusInput = event => {
    event.target.setAttribute("type", "number");
    const line = document.querySelector(".line");
    line.classList.add("border-bottom-black");
    line.classList.remove("border-bottom-white");
}

const unFocusInput = event => {
    event.target.setAttribute("type", "text");
    const line = document.querySelector(".line");
    line.classList.add("border-bottom-grey");
    line.classList.remove("border-bottom-black");
}

const spanEvent = event => {
    const text = event.target.dataset["info"];
    removeSpanSelected();
    event.target.setAttribute("selected", true);
    const p = document.querySelector("p");
    if(!text){return;}
    if(!p){return;}
    p.textContent = text;
}

const removeSpanSelected = () => {
    Array.from(document.querySelectorAll("span")).forEach(span => span.removeAttribute("selected"));
}

const removeModal = () => {
    [...document.querySelectorAll("#modal")].forEach(data => data.remove());
}
const createModal = (title, content) => {
    removeModal();
    const divContainer = document.createElement("div");
    const divHeader = document.createElement("div");
    const divContainerInfo = document.createElement("div");
    const divInfo = document.createElement("div");
    const button = document.createElement("button");


    divContainer.style.width = "400px";
    divContainer.style.position = "absolute";
    divContainer.style.backgroundColor = "white";
    divContainer.style.borderRadius = "6px";
    divContainer.style.padding = "12px";
    divContainer.style.zIndex = "100";
    divContainer.id = "modal";
    divHeader.textContent = title;

    divContainerInfo.style.display = "flex";
    divContainerInfo.style.justifyContent = "space-between";
    divContainerInfo.style.alignItems = "center";

    divInfo.textContent = content;
    button.textContent = "OK";
    button.style.backgroundColor = "teal";
    button.style.padding = "10px 16px";
    button.style.color = "white";

    divContainer.appendChild(divHeader);
    divContainerInfo.appendChild(divInfo);
    divContainerInfo.appendChild(button);
    divContainer.appendChild(divContainerInfo);
    document.body.insertAdjacentElement("beforeend", divContainer);

    button.addEventListener("click",() => {
        removeModal();
    });

    const [px,py] = [window.screen.width, window.screen.height];
    divContainer.style.top = (py - divContainer.getBoundingClientRect().height)/2 + "px";
    divContainer.style.left = (px - divContainer.getBoundingClientRect().width)/2 + "px";
}
