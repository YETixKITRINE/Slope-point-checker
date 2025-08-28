// Utility to get random integer in range
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random point and slope
function generateProblem() {
    const x = randInt(-8, 8);
    const y = randInt(-8, 8);
    const m = randInt(-5, 5);
    const b = randInt(-8, 8);
    return { point: { x, y }, m, b };
}

// Draw graph axes
function drawAxes(ctx) {
    ctx.clearRect(0, 0, 400, 400);
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 1;
    // Draw grid
    for (let i = 0; i <= 20; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 20, 0);
        ctx.lineTo(i * 20, 400);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * 20);
        ctx.lineTo(400, i * 20);
        ctx.stroke();
    }
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 400);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 200);
    ctx.lineTo(400, 200);
    ctx.stroke();
}

// Convert graph coords to canvas coords
function toCanvas(x, y) {
    return { cx: 200 + x * 20, cy: 200 - y * 20 };
}

// Draw point
function drawPoint(ctx, x, y, color = 'red') {
    const { cx, cy } = toCanvas(x, y);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, 2 * Math.PI);
    ctx.fill();
}

// Draw line y = mx + b
function drawLine(ctx, m, b, color = 'blue') {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    // Find two points on the line within graph bounds
    let x1 = -10, x2 = 10;
    let y1 = m * x1 + b;
    let y2 = m * x2 + b;
    // Clip y to graph bounds
    y1 = Math.max(Math.min(y1, 10), -10);
    y2 = Math.max(Math.min(y2, 10), -10);
    const p1 = toCanvas(x1, y1);
    const p2 = toCanvas(x2, y2);
    ctx.beginPath();
    ctx.moveTo(p1.cx, p1.cy);
    ctx.lineTo(p2.cx, p2.cy);
    ctx.stroke();
}

// Main logic
let currentProblem = generateProblem();

function showProblem() {
    document.getElementById('point').textContent = `Point: (${currentProblem.point.x}, ${currentProblem.point.y})`;
    document.getElementById('equation').textContent = `Equation: y = ${currentProblem.m}x + ${currentProblem.b}`;
}

function showAnswer() {
    const ctx = document.getElementById('answer-graph').getContext('2d');
    drawAxes(ctx);
    drawLine(ctx, currentProblem.m, currentProblem.b);
    drawPoint(ctx, currentProblem.point.x, currentProblem.point.y);
    // Label the point
    const { cx, cy } = toCanvas(currentProblem.point.x, currentProblem.point.y);
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`(${currentProblem.point.x}, ${currentProblem.point.y})`, cx + 10, cy - 10);
    // Label the equation
    ctx.fillStyle = 'blue';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`y = ${currentProblem.m}x + ${currentProblem.b}`, 20, 30);
    document.getElementById('answer-container').style.display = 'block';
}

document.getElementById('new-problem').onclick = function() {
    currentProblem = generateProblem();
    showProblem();
    document.getElementById('answer-container').style.display = 'none';
};
document.getElementById('reveal').onclick = showAnswer;
// Initial render
showProblem();
