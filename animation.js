// 업데이트 함수
const fps = 120;
const interval = 1000 / fps;
let lastTime = 0;

function gameLoop(timestamp) {
    // 처음 호출되었을 때 lastTime을 설정
    if (!lastTime) {
        lastTime = timestamp;
    }

    const elapsed = timestamp - lastTime;
    const deltaTime = elapsed / interval;

    if (elapsed > interval) {
        lastTime = timestamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 지우기

        update(deltaTime); // 네모 이동 함수
        drawRectangle(); // 네모 그리기
        updatedrawCoordinates(); // 네모 좌표 표시
        drawRedCircle(); // 빨간색 원 그리기
        drawGreenCircle(); // 초록색 원 그리기

        if (collisionPoint) {
            detectedPoint(collisionPoint.x, collisionPoint.y); // 충돌 지점에 검은 점 그리기
        }
    }

    requestAnimationFrame(gameLoop); // 다음 프레임 요청
}

gameLoop(0);