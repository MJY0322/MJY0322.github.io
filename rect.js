var canvas = document.getElementById('canvas');
 /** @type {CanvasRenderingContext2D} */ 

var ctx = canvas.getContext('2d');

// 캔버스 너비, 높이, 테투리 설정
canvas.width = 1300;
canvas.height = 800;
canvas.style.border = '1px solid black';

// 사각형 기본 설정
const rect = {
    x : 100,
    y : 100,
    width : 20,
    height : 20,
    speed : 10
};

const keys = {};

let prevRect = {
    x : rect.x,
    y : rect.y
};

window.addEventListener('keydown',(e)=>{
    keys[e.code] = true;
});

window.addEventListener('keyup',(e)=>{
    keys[e.code] = false;
});

/*function clearPrevRectangle(){
    ctx.clearRect(prevRect.x - rect.width / 2,prevRect.y - rect.height /2, rect.width, rect.height);
}
*/
function drawRectangle(){
    //clearPrevRectangle();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(rect.x - rect.width / 2,rect.y - rect.height /2,rect.width,rect.height);
}

function updatedrawCoordinates(){
    let transformedY = canvas.height - rect.y; // y 좌표를 캔버스 하단 기준으로 변환
    document.getElementById('coordinates').textContent = `x: ${rect.x.toFixed(0)}, y: ${transformedY.toFixed(0)}`;
}

function update(){
    
    let dx = 0;
    let dy = 0;

    if(keys['KeyW']) dy -= rect.speed;
    if(keys['KeyS']) dy += rect.speed;
    if(keys['KeyA']) dx -= rect.speed;
    if(keys['KeyD']) dx += rect.speed;

    if(dx !== 0 && dy !== 0){
        dx /= Math.sqrt(2);
        dy /= Math.sqrt(2);
    }

    /*prevRect = {
        x : rect.x,
        y : rect.y
    };
    */
    rect.x += dx;
    rect.y += dy;

    rect.x = Math.max(rect.width / 2, Math.min(canvas.width - rect.width / 2, rect.x));
    rect.y = Math.max(rect.height / 2, Math.min(canvas.height - rect.height / 2, rect.y));

   
    
}

/*function gameLoop(){
    update(); 
    drawRectangle();
    updatedrawCoordinates();

    requestAnimationFrame(gameLoop);
}

gameLoop();
*/