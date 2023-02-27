
class Point{
    constructor(x= 0, y= 0){
        this.x = x;
        this.y = y;
    }
    getX(){ return this.x; }
    getY(){ return this.y; }
    setX(x){ this.x = x; }
    setY(y){ this.y = y; }
    set(x, y){
        this.x = x;
        this.y = y;
    }
    toString(){ return `(${this.x}, ${this.y})`; }
}

const initApp = () => {
    createApp();
    const ref = document.querySelector('.root');
    const objSquare = getItemBox(ref);
    let clickSquare = false;
    const mousePoint = new Point();
    document.addEventListener('mousedown', (e) => {
        if ( (e.target.className === 'root') ||
            (e.clientX >= objSquare.x && e.clientX <= objSquare.x + objSquare.width) &&
            (e.clientY >= objSquare.y && e.clientY <= objSquare.y + objSquare.height)){
            clickSquare = !clickSquare;
        }
    });
    document.addEventListener('mousemove', (e) => mouseMoveEvent(e, clickSquare, mousePoint, ref));

}
const mouseMoveEvent = (e, clickSquare, mousePoint, ref) => {
    if(clickSquare){
        mousePoint.set(e.clientX, e.clientY);
        window.requestAnimationFrame(() => {
            getDegreeFromPoint(mousePoint, ref);
        });
    }
}
const createApp = () => {
    const body = document.body;
    const divContainer = document.createElement('div');
    const divSquare = document.createElement('div');
    divContainer.classList.add('container');
    divSquare.classList.add('root');
    divContainer.appendChild(divSquare);
    body.appendChild(divContainer);
}

const getItemBox = ref => ref?.getBoundingClientRect();
const getDegreeFromPoint = (pointMouse, ref) => {
    const item = getItemBox(ref);
    let dy = (pointMouse.getX() - item.x - (item.width / 2)) / 25;
    let dx = -1 * (pointMouse.getY() - item.y - (item.height / 2)) / 25;
    ref.style.transform = `rotateX(${dx}deg) rotateY(${dy}deg)`;
}
window.addEventListener('DOMContentLoaded', initApp);