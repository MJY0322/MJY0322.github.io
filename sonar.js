 /** @type {CanvasRenderingContext2D} */ 
const redCircle = {
    x: 0,
    y: 0,
    radius: 0
};

let redGrowing = false;

// 새 초록색 원 관련 변수
const greenCircle = {
    x: 0,
    y: 0,
    radius: 0
};

let greenGrowing = false;
let greenCircleTimeout; // 타이머 ID
let greenCircleRandomDelay = 0;
let growingSpeed = 5;
let collisionDetected = false;

let collisionPoint = null;

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {

        collisionDetected = false;
        collisionPoint = null;
        greenCircleRandomDelay = Math.random() * 1000;
        console.log(collisionDetected);
        
        redGrowing = false;
        greenGrowing = false

        redCircle.x = rect.x;
        redCircle.y = rect.y;
        redCircle.radius = 0;
        redGrowing = true;
        console.log(`RedCircle Point: x=${redCircle.x.toFixed(2)}, y=${redCircle.y.toFixed(2)}`);
        
        if (greenCircleTimeout){
            clearTimeout(greenCircleTimeout);
        }
        greenCircle.radius = 0; // 초기 반지름
            greenCircleTimeout = setTimeout(() => {
                greenCircle.x = Math.random() * canvas.width;
                greenCircle.y = Math.random() * canvas.height;
                //greenCircle.x = 500;
                //greenCircle.y = 500;
                greenGrowing = true;
                console.log(`GreenCircle Point: x=${greenCircle.x.toFixed(2)}, y=${greenCircle.y.toFixed(2)}`);
            }, greenCircleRandomDelay); // 1초 지연
            console.log(`RandomDelay: ${greenCircleRandomDelay.toFixed(0)}`);
    }
});

// 빨간색 원 그리기 함수
function drawRedCircle() {
    if (redGrowing) {
        redCircle.radius += growingSpeed; // 반지름을 증가시킴
        if (redCircle.radius > canvas.width) { // 반지름이 너무 커지면 멈추기
            redGrowing = false;
        }
    }

    ctx.beginPath();
    ctx.arc(redCircle.x, redCircle.y, redCircle.radius, 0, Math.PI * 2); // rect 위치에 원 그리기
    ctx.strokeStyle = 'red'; // 원의 색상
    ctx.stroke();
    ctx.closePath();
}

// 초록색 원 그리기 함수
function drawGreenCircle() {
    if (greenGrowing) {
        greenCircle.radius += growingSpeed; // 반지름을 증가시킴
        if (greenCircle.radius > canvas.width) { // 반지름이 너무 커지면 멈추기
            greenGrowing = false;
        }
    }

    ctx.beginPath();
    ctx.arc(greenCircle.x, greenCircle.y, greenCircle.radius, 0, Math.PI * 2); // 랜덤 위치에 원 그리기
    ctx.strokeStyle = 'green'; // 원의 색상
    ctx.stroke();
    ctx.closePath();
}

function detectedPoint(x,y){
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI * 2); 
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
    console.log("실행됨");
}

function detectCollision() {
    if(collisionDetected){
        return;
    }
    
    const dx = redCircle.x - greenCircle.x;
    const dy = redCircle.y - greenCircle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if(distance <= redCircle.radius){
        return;
    }

    if(distance <= redCircle.radius + greenCircle.radius){
       
        collisionDetected = true;
        
        const totalRadius = redCircle.radius + greenCircle.radius;
        const collisionX = redCircle.x + redCircle.radius * ((greenCircle.x - redCircle.x)/totalRadius);
        const collisionY = redCircle.y + redCircle.radius * ((greenCircle.y - redCircle.y)/totalRadius);
        collisionPoint = {x : collisionX, y : collisionY};

        console.log("Collision detected!");
        console.log(`RedCircle Point: radius=${redCircle.radius.toFixed(2)}`);
        console.log(`GreenCircle Point: radius=${greenCircle.radius.toFixed(2)}`);
        console.log(`Collision Point: x=${collisionPoint.x.toFixed(2)}, y=${collisionPoint.y.toFixed(2)}`);

        redGrowing = false;
        greenGrowing = false;
        
    }
}

setInterval(() => {
    detectCollision(); // 충돌 감지 호출
}, 1); // 약 60 FPS로 감지 (1000ms / 60 ≈ 16ms)

/*
// 업데이트 함수
const fps = 60;
const interval = 1000 / fps;
let lastTime = 0;

function updateSonar(timestamp) {
    // 처음 호출되었을 때 lastTime을 설정
    if (!lastTime) {
        lastTime = timestamp;
    }

    const elapsed = timestamp - lastTime;

    if (elapsed > interval) {
        lastTime = timestamp;

        //ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 지우기

        drawRedCircle(); // 빨간색 원 그리기
        drawGreenCircle(); // 초록색 원 그리기

        if (collisionPoint) {
            detectedPoint(collisionPoint.x, collisionPoint.y); // 충돌 지점에 검은 점 그리기
        }
    }

    requestAnimationFrame(updateSonar); // 다음 프레임 요청
}

updateSonar(0);
*/