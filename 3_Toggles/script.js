// When page is loaded
window.addEventListener("DOMContentLoaded", () => {
    createElements();
    addListener(document.querySelectorAll("span"));
});


const createElements = (nb_elements = 5) => {
    const divContainer = document.createElement('div');
    const divCenter = document.createElement('div');
    divContainer.classList.add('container');
    divCenter.classList.add('center');
    for(let i = 0; i < nb_elements; i++) {
        const divSwitcher = document.createElement('div');
        divSwitcher.classList.add('switcher');
        const span = document.createElement('span');
        divSwitcher.appendChild(span);
        divCenter.appendChild(divSwitcher);
    }
    divContainer.appendChild(divCenter);
    document.body.appendChild(divContainer);
}

const addListener = tagsEvent => {
  [...tagsEvent].forEach(tag => tag.addEventListener("click", trigger));
};

const trigger = event => {
    const current = event.currentTarget;
    const excludeCurrent = [...document.querySelectorAll("span")].filter(span => span !== current);
    const iter = ramdom(excludeCurrent.length);
    switchData(current);
    /*console.debug(`Random ${iter}`);*/
    for(let i = 0; i < iter; ++i){
        switchData(excludeCurrent[i]);
    }
};

const switchData = target => {
    if(!target.classList.contains("slide")){
        target.classList.add("slide");
    }else{
        target.classList.remove("slide");
    }
};

const ramdom = max => {
    return Math.floor(Math.random() * max) + 1;
}
