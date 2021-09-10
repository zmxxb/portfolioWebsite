const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')


class Star {
    constructor(ctx, r, x, y, rot, borderWidth, borderStyle, fillStyle, opacity) {
        this.ctx = ctx;
        this.r = x;
        this.ratio = 1.875
        this.R = r * this.ratio
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.borderWidth = borderWidth;
        this.borderStyle = borderStyle;
        this.fillStyle = fillStyle;
        this.opacity = opacity;
        this.position = []
    }
    draw() {
        this.ctx.beginPath();
        for (var i = 0; i < 5; i++) {
            this.ctx.lineTo(Math.cos((18 + 72 * i - this.rot) / 180 * Math.PI) * this.R + this.x, - Math.sin((18 + 72 * i - this.rot) / 180 * Math.PI) * this.R + this.y);
            this.ctx.lineTo(Math.cos((54 + 72 * i - this.rot) / 180 * Math.PI) * this.r + this.x, - Math.sin((54 + 72 * i - this.rot) / 180 * Math.PI) * this.r + this.y);
        }
        this.ctx.closePath();

        this.ctx.lineWidth = borderWidth;
        this.ctx.strokeStyle = borderStyle;
        this.ctx.fillStyle = fillStyle;

        if (this.fillStyle != null) { this.ctx.fill(); }
        ctx.stroke();
    }


}



// function drawStar(ctx, r, x, y, rot, borderWidth, borderStyle, fillStyle) {
//     ratio = 1.875
//     R = r * ratio
//     ctx.beginPath();
//     for (var i = 0; i < 5; i++) {
//         ctx.lineTo(Math.cos((18 + 72 * i - rot) / 180 * Math.PI) * R + x, - Math.sin((18 + 72 * i - rot) / 180 * Math.PI) * R + y);
//         ctx.lineTo(Math.cos((54 + 72 * i - rot) / 180 * Math.PI) * r + x, - Math.sin((54 + 72 * i - rot) / 180 * Math.PI) * r + y);
//     }
//     ctx.closePath();

//     ctx.lineWidth = borderWidth;
//     ctx.strokeStyle = borderStyle;
//     ctx.fillStyle = fillStyle;

//     if (fillStyle != null) { ctx.fill(); }
//     ctx.stroke();
//     ctx.stroke();
// }


let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x
    mouse.y = event.y
})

radius = 200;

var motionTrailLength = 1;
var positions = [];

function storeLastPosition(xPos, yPos) {
    // push an item
    positions.push({
        x: xPos,
        y: yPos
    });

    //get rid of first item
    if (positions.length > motionTrailLength) {
        positions.shift();
    }
}

function animate() {

    ctx.clearRect(0, 0, innerWidth, innerHeight);





    for (var i = 0; i < positions.length; i++) {
        const star = new Star(ctx, radius, positions[i].x, positions[i].y, 0, "2", "#F5270B", null)
        star.draw();

        // drawStar(ctx, radius, positions[i].x, positions[i].y, 0, "2", "#F5270B", null)
    }






    // storeLastPosition(mouse.x, mouse.y)
    requestAnimationFrame(animate);

}

animate();
