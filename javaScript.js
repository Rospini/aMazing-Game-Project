const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 1100;
canvas.height = 800;

const cellSize = 100;
const cellGap = 3;
const gameGrid=[];

const mouse = {
    x: undefined,
    y: undefined,
    width: 0.1,
    height: 0.1,
}
let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener("mousemove", function(e){
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
});
canvas.addEventListener('mouseleave', function(){
    mouse.x = undefined;
    mouse.y = undefined;
});
canvas.addEventListener('click', function(){
    
})

const controlsBar = {
    width: canvas.width,
    height: cellSize,
}


class Cell {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }
    draw (){     
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        
    }   
    drawBlock (){
        if (collision(this, mouse)){
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}

function createGrid(){
    for(let y = cellSize; y < canvas.height; y+= cellSize){
        for(let x = 0; x < canvas.width; x += cellSize){
            gameGrid.push(new Cell(x, y));
        }
    }
}
createGrid()

function handleGameGrid(){
    console.log('work1')
    for(let i = 0; i< gameGrid.length; i++){
        gameGrid[i].draw();
    }
}

handleGameGrid()

console.log(gameGrid)

function animate(){
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle ='red';
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
    requestAnimationFrame(animate);
    
}
animate();

function collision(first, second){
    if(!(first.x> second.x + second.width||
        first.x +first.width < second.x||
        first.y> second.y + second.height||
        first.y+first.height< second.y)
    ){
        return true;
    }
}