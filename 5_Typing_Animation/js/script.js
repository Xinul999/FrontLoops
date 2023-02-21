const sleep = delay => {
    return new Promise(resolve => setTimeout(resolve, delay));
}


const deleteCars = async (reference, nbCars) => {
    const lg = reference.textContent.length - 1;
    for(let i = 1; i <= nbCars; ++i){
        reference.textContent = reference.textContent.slice(0, lg - i + 1);
        await sleep(200);
    }
}
const addString = async (reference, string) => {
    for(let i = 0; i < string.length; ++i) {
        reference.textContent += string[i];
        await sleep(180);
    }
}
const deleteAll = async reference => {
    const max = reference.textContent.length;
    await deleteCars(reference, max);
}

const execution = async (ref) => {
    const string = "It's time for learning javascript!";
    for (let i = 0; i <= 10; ++i){
        await sleep(1000);
        await deleteCars(ref, 7).then();
        await addString(ref, " programming.").then();
        await deleteCars(ref, 12).then();
        await addString(ref, " and nodeJs.").then();
        await deleteAll(ref).then();
        await addString(ref, string).then();
    }

}
window.addEventListener('DOMContentLoaded', () => {
    const div = document.createElement('div');
    div.classList.add("container");
    const p = document.createElement('p');
    p.textContent = "We can help you with design.";
    div.appendChild(p);
    document.body.appendChild(div);
    execution(p).then();
});
