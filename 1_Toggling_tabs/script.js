
const getText = () => {
    return ['Sort by price', 'Sort by name', 'Sort by relevance'];
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth >= 1100){
        initUl(getText(), document.body, document.createElement('div'));
    }else{
        initSelect(getText(), document.body, document.createElement('div'));
    }

    const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            const width = entry.borderBoxSize[0].inlineSize;
            helperLogic(width);
        }
    });

    resizeObserver.observe(document.querySelector('body'), {box: 'border-box'});
});

const helperLogic = (width) => {
    const getDiv = document.querySelector('div');
    const getTag = getDiv.firstElementChild;
    if(!getTag) return;
    
    if(width < 1100){
        if (getTag.tagName.toLowerCase() === "ul") {
            const text = getTag.querySelector('li.selected')?.textContent || undefined;
            const idx = getIndex(document.querySelectorAll('li'), text);
            remove("div > *");
            initSelect(getText(), document.body, getDiv)
            if(text!== undefined && idx !== undefined){
                const allOptions = document.querySelectorAll('option');
                allOptions[idx].setAttribute("selected", true);
            }
        }
    }
    else{
        if (getTag.tagName.toLowerCase() === "select") {
            const text = getTag.querySelector('option[selected]') ?.textContent || undefined;
            const idx = getIndex(document.querySelectorAll('option'), text);
            remove("div > *");
            initUl(getText(), document.body, getDiv);
            if(text!== undefined && idx !== undefined){
                const allLi = document.querySelectorAll('li');
                allLi[idx].classList.add('selected');
            }
        }
    }
    
}

const getIndex = (nodeHtml, search) => {
    if(!search) return undefined;
    if(nodeHtml.length === 0) return undefined;
    return Array.from(nodeHtml).findIndex(f => f.textContent.toLowerCase() === search.toLowerCase());
}
const initUl = (arrText, body, div) => {
    const ul = document.createElement('ul');
    for(const t of arrText){
        ul.appendChild(createTagWithText('li',t));
    }
    div.appendChild(ul);
    div.classList.add("root");
    body.appendChild(div);
    addClickEvent(document.querySelectorAll('li'), toogle);
}
const initSelect = (arrText, body, div) => {
    const select = document.createElement('select');
    for(const t of arrText){
        const option = createTagWithText('option', t);
        option.value = t.toLowerCase();
        select.appendChild(option);
    }
    div.appendChild(select);
    div.classList.add("root");
    body.appendChild(div);
    addClickEvent(document.querySelectorAll('option'), changeAttribute);
}
const createTagWithText = (tag, text) => {
    const customTag = document.createElement(tag);
    customTag.textContent = text;
    return customTag;
}
const addClickEvent = (nodeListOf, callback) => {
    nodeListOf.forEach(data => data.addEventListener('click', callback));
}
const toogle = target => {
    [...document.querySelectorAll('li')].forEach(value => value.classList.remove("selected"));
    const current = target.currentTarget;
    if(current.classList.contains("selected")){
        current.classList.remove("selected");
    }else{
        current.classList.add("selected");
    }
}
const changeAttribute = target => {
    Array.from(document.querySelectorAll('option')).forEach(value => value.removeAttribute('selected'));
    if (target) {
    target.currentTarget.setAttribute("selected", true);
    }
}
const remove = selector => {
    [...document.querySelectorAll(selector)].forEach(rem => rem.remove());
}






