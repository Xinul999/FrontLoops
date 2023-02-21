
const ButtonInfo = {
    Next: 1,
    Previous: 0
};
class Tag{
    #tag;
    constructor(){ this.#tag = undefined; }
    add(classDetails, textDetails) {
        if (classDetails) { this.#tag.classList.add(classDetails);}
        if (textDetails) { this.#tag.innerText = textDetails;}
        return this;
    }
    attachChildNode(child){
        this.#tag.append(child.tag);
        return this;
    }
    create(tag){
        this.#tag = document.createElement(tag);
        return this;
    }
    get tag(){ return this.#tag;}

}

class State{
    #AllLis;
    #liState
    #index
    constructor(){
        this.#liState = undefined;
        this.#index = undefined;
        this.#AllLis = [];
    }
    setLi(li){this.#liState = li;}
    setIndex(index){this.#index = index;}
    setLis(lis){
        for(const li of lis)
            this.#AllLis.push(li);
    }
    getLi(){return this.#liState;}
    getIndex(){return this.#index;}
    getLis(){return this.#AllLis;}
}
window.addEventListener("DOMContentLoaded", () => {
    const states = new State();
    createWindow(states);

});

const createWindow = states => {
    const step = 1;
    states.setIndex(step);
    const root = new Tag().create("div").add("container");
    const containerBlock = new Tag().create("div").add("root");
    const containerLeft = createLeftContainer(states);
    const containerRight = createRightContainer(states, step);
    containerBlock.attachChildNode(containerLeft);
    containerBlock.attachChildNode(containerRight);
    root.attachChildNode(containerBlock);
    document.body.append(root.tag);
};

const createLeftContainer = (states) => {
    const containerLeft = new Tag().create("div");
    const ol = new Tag().create("ol")
    const li1 = new Tag().create("li").add("checked", "Choose title");
    const li2 = new Tag().create("li").add(undefined, "Choose description");
    const li3 = new Tag().create("li").add(undefined, "Confirm data");
    ol.attachChildNode(li1).attachChildNode(li2).attachChildNode(li3);
    containerLeft.attachChildNode(ol);
    li1.tag.addEventListener("click", () => liEvent(li1, 1, states));
    li2.tag.addEventListener("click", () => liEvent(li2, 2, states));
    li3.tag.addEventListener("click", () => liEvent(li3, 3, states));
    states.setLis([li1,li2,li3]);
    states.setLi(li1);
    return containerLeft;
};
const createRightContainer = (states, step) => {
    const containerRight =  new Tag().create("div").add("container-right", undefined);
    const p = new Tag().create("p");
    const containerBtn = new Tag().create("div");
    if(step === 1){
        p.add(undefined, "Choose title content");
        const btn1 = new Tag().create("button").add(undefined, "Submit title");
        containerBtn.attachChildNode(btn1);
        containerRight.attachChildNode(p);
        containerRight.attachChildNode(containerBtn);
        btn1.tag.addEventListener("click", () => btnEvent(btn1, ButtonInfo.Next, 1, states));
    }else if(step === 2){
        p.add(undefined, "Choose description content");
        containerBtn.add("flex-container", undefined);
        const btn1 = new Tag().create("button").add(undefined, "Back");
        const btn2 = new Tag().create("button").add(undefined, "Submit description");
        containerBtn.attachChildNode(btn1);
        containerBtn.attachChildNode(btn2);
        containerRight.attachChildNode(p);
        containerRight.attachChildNode(containerBtn);
        btn1.tag.addEventListener("click", () => btnEvent(btn1, ButtonInfo.Previous, 2, states));
        btn2.tag.addEventListener("click", () => btnEvent(btn2, ButtonInfo.Next, 2, states));
    }else if(step === 3){
        p.add(undefined, "Are you happy now");
        containerBtn.add("flex-container", undefined);
        const btn1 = new Tag().create("button").add(undefined, "No, go back");
        const btn2 = new Tag().create("button").add(undefined, "Yes, go ahead");
        containerBtn.attachChildNode(btn1);
        containerBtn.attachChildNode(btn2);
        containerRight.attachChildNode(p);
        containerRight.attachChildNode(containerBtn);
        btn1.tag.addEventListener("click", () => btnEvent(btn1, ButtonInfo.Previous, 3, states));
        btn2.tag.addEventListener("click", () => btnEvent(btn2, ButtonInfo.Next, 3, states));
    }else{
        p.add(undefined, "Ok, we're done. Thanks for sending us your data!");
        containerRight.attachChildNode(p);
    }
    return containerRight;
};
const removeItem = search => {
    [...document.querySelectorAll(search)].forEach(item => {item.remove();});
};
const liEvent = (current, step, objState) => {
    const possible = (Math.abs(step - objState.getIndex()) === 1)
    if(objState.getIndex() !== step && possible){
        if((step - objState.getIndex()) > 0 ){
            current.tag.classList.add("checked");
        }else{
            if(step < objState.getLis().length) {
                const removeLi = objState.getLis()[step];
                removeLi.tag.classList.remove("checked");
            }
        }
        objState.setIndex(step);
        objState.setLi(current);
        removeItem(".container-right");
        const divBloc = document.querySelector(".root");
        const containerRight = createRightContainer(objState, objState.getIndex());
        divBloc.appendChild(containerRight.tag);
    }
};

const btnEvent = (current, type, step, objState) => {
    let stepOp;
    const divBloc = document.querySelector(".root");
    if(ButtonInfo.Next === type){
        stepOp = step + 1;
        if(step < objState.getLis().length){
            const nextLi = objState.getLis()[step];
            nextLi.tag.classList.add("checked");
        }
    }else{ /* ButtonInfo.Previous */
        stepOp = step - 1;
        const prevLi = objState.getLis()[step - 1];
        prevLi.tag.classList.toggle("checked");
    }
    objState.setIndex(stepOp);
    removeItem(".container-right");
    const containerRight = createRightContainer(objState, objState.getIndex());
    divBloc.appendChild(containerRight.tag);
};
