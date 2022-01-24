const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 900;
canvas.height = 600;
//global variables
const cellSize = 50;
const cellGap = 3;
const gameGrid=[];
const blocks = [];
let start = [0,300] ;
let goal = [900,300];

//mouse
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
// canvas.addEventListener('mouseleave', function(){
//     mouse.x = undefined;
//     mouse.y = undefined;
// });


//game board

class Cell {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }
    drawGrid (){     
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        
    }   
}
function createGrid(){
    for(let y = cellSize; y < canvas.height-cellSize; y+= cellSize){
        for(let x = cellSize; x < canvas.width -cellSize; x += cellSize){
            gameGrid.push(new Cell(x, y));
        }
    }
}

//Blocks
class Block{
    constructor(x, y){
        this.x = x
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }
    drawBlock(){
        ctx.fillStyle = 'blue',
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
}
canvas.addEventListener("click", function(){
    const gridPositionX = mouse.x - (mouse.x % cellSize);
    const gridPositionY = mouse.y -(mouse.y % cellSize);
    if(gridPositionY < cellSize) return;
    else{
    blocks.push(new Block(gridPositionX, gridPositionY));
    }
})
function drawStart(a,b){
    console.log('drawStart')
        ctx.fillStyle = 'red',
        ctx.fillRect(a,b,this.width,this.height);
    }
function    drawGoal(a,b){
    console.log('drawGoal')
        ctx.fillStyle = 'red',
        ctx.fillRect(a-(a % cellSize),b-(b%cellSize),this.width,this.height)
    }

createGrid()

function handleGameGrid(){
    for(let i = 0; i< gameGrid.length; i++){
        gameGrid[i].drawGrid();
    }
}




function handleBlocks(){
    for(let i = 0; i< blocks.length; i++){
        blocks[i].drawBlock();
    }
}

function animate(){
    drawGoal(goal)
    drawStart(start)
    handleBlocks()
    handleGameGrid()
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
window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
    })