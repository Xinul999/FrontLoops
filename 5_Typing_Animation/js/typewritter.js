

class TypeWritter{
    #selectElement = undefined;
    #EventQueue;
    constructor(element){
        this.#EventQueue = [];
        this.#selectElement = element;
    }
    typeString(str){
        this.#EventQueue.push(() => {
            this.#selectElement.innerHTML += str;
        });
        return this;
    }
    deleteAll(){
        this.#EventQueue.push(async () => {
            let size = this.#selectElement.innerHTML.length;
            for (let i = 0; i < size; ++i) {
                this.#selectElement.innerHTML = this.#selectElement.innerHTML.slice(0, size - i - 1);
                await this.#sleep(180);
            }
        });
        return this;
    }
    deleteChars(nbCars){
        this.#EventQueue.push(async () =>  {
            const lg = this.#selectElement.innerHTML.length - nbCars;
            this.#selectElement.innerHTML = this.#selectElement.innerHTML.substring(0, lg);
            await this.#sleep(200);
        });

        return this;
    }
    addCars(str){
         this.#EventQueue.push(async () =>  {
            for(let j=0;j<str.length;++j){
                this.#selectElement.innerHTML += str[j];
                await this.#sleep(200);
            }
            
        });
        return this
    }
    pauseFor(delay) {
        this.#EventQueue.push(async () => await this.#sleep(delay));
        return this;
    }
         
    async start(){
        for(let loop = 0; loop < 100; ++loop){
             for(let i = 0; i < this.#EventQueue.length; ++i){
                const cb = this.#EventQueue[i];
                console.log(cb);
                await cb();
            }
        }
       
    }
    #sleep(time){
        return new  Promise( resolve => setTimeout(resolve, time));
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const div = document.createElement('div');
    div.classList.add("container");
    const p = document.createElement('p');
    div.appendChild(p);
    document.body.append(div);
    const tw = new TypeWritter(p)
        .addCars("We can help you with design.")
        .pauseFor(1000)
        .deleteChars(7)
        .typeString(" programming.")
        .deleteChars(12)
        .typeString(" js.")
        .deleteAll()
        .typeString("We can help you with design.")
        .deleteAll()
        .start();
});
