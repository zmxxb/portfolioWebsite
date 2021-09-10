const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Star {
    constructor(ctx, r, x, y, rot, borderWidth, borderStyle, fillStyle, opacity) {
        this.ctx = ctx;
        this.r = r;
        this.ratio = 1.875;
        this.r2 = r * this.ratio
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.borderWidth = borderWidth;
        this.borderStyle = borderStyle;
        this.fillStyle = fillStyle;
        this.opacity = opacity;

    }
    draw() {
        this.ctx.beginPath();
        for (var i = 0; i < 5; i++) {
            this.ctx.lineTo(Math.cos((18 + 72 * i - this.rot) / 180 * Math.PI) * this.r2 + this.x, - Math.sin((18 + 72 * i - this.rot) / 180 * Math.PI) * this.r2 + this.y);
            this.ctx.lineTo(Math.cos((54 + 72 * i - this.rot) / 180 * Math.PI) * this.r + this.x, - Math.sin((54 + 72 * i - this.rot) / 180 * Math.PI) * this.r + this.y);
        }
        this.ctx.closePath();
        this.ctx.lineWidth = this.borderWidth;
        this.ctx.strokeStyle = this.borderStyle;
        this.ctx.fillStyle = this.fillStyle;
        if (this.fillStyle != null) { this.ctx.fill(); }
        if (this.borderStyle != null) {
            this.ctx.stroke();
        }

    }

}

let mouse = {
    x: undefined,
    y: undefined,
}

let mouseClick = {
    x: undefined,
    y: undefined
}

let sprayClick = {
    x: undefined,
    y: undefined
}

let positions = []
let clickPositions = []
let sprayPositions = []
let d = 0;
let dtrigger = 50;

let lastTrigger = null;
let move = null;
let radius = 100;
let colors = chroma.scale(['#fca3cc', '#bce6eb'])
    .mode('lch').colors(6)

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x + Math.random() * 15 - 7
    mouse.y = event.y + Math.random() * 15 - 7
    move = Math.floor(Math.sqrt(event.movementX * event.movementX + event.movementY * event.movementY))

})

window.addEventListener('click', function (event) {
    mouseClick.x = event.x
    mouseClick.y = event.y
    sprayClick.x = event.x
    sprayClick.y = event.y
})

function save(xPos, yPos, radius) {
    positions.push({
        x: xPos,
        y: yPos,
        r: radius
    })
}

function clickSave(xPos, yPos, radius, opacity) {
    clickPositions.push({
        x: xPos,
        y: yPos,
        r: radius,
        o: opacity
    })
}

function spraySave(xPos, yPos, color) {
    sprayPositions.push({
        x: xPos,
        y: yPos,
        r: updateRadius(),
        color: color,
        x_offset: updateOffset(),
        y_offset: updateOffset(),
        step: RandomNumBoth(0.2, 0.4)
    })
}

function updateRadius() {
    return Math.floor(Math.random() * 3) + 3.5
}

function updateOffset() {
    let offset = (Math.random() * 5);
    let signal = (Math.random() - 0.5);
    if (signal <= 0) {
        offset = - offset
    }
    return offset
}



function RandomNumBoth(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}

function animate() {

    ctx.clearRect(0, 0, innerWidth, innerHeight);
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    for (var i = 0; i < positions.length; i++) {
        if (0 == positions[i].r) {
            positions.splice(i, i + 1)
        } else {
            let star = new Star(ctx, positions[i].r, positions[i].x, positions[i].y, 0, "2", "white", null)
            positions[i].r -= 1;
            star.draw()
        }
    }

    if (0 == move || null == move) {
    } else {
        d += move;
        move = 0;
        let trigger = d % dtrigger


        if (trigger < lastTrigger) {
            let star = new Star(ctx, 6, mouse.x, mouse.y, 0, "2", "white", null)
            star.draw();
            save(mouse.x, mouse.y, 6)


        }


        lastTrigger = trigger
    }

    for (var i = 0; i < clickPositions.length; i++) {
        if (clickPositions[i].r > 30) {
            clickPositions.splice(i, i + 1)
        } else {
            let star = new Star(ctx, clickPositions[i].r, clickPositions[i].x, clickPositions[i].y, 0, "2", `rgba(255, 255, 255, ${clickPositions[i].o})`, null)
            clickPositions[i].r += 1.5;
            clickPositions[i].o -= 0.06;
            star.draw();
        }
    }
    // Spary---Start
    for (var i = 0; i < sprayPositions.length; i++) {
        let star = new Star(ctx, sprayPositions[i].r, sprayPositions[i].x, sprayPositions[i].y, 0, "2", null, sprayPositions[i].color)
        star.draw();
        if (sprayPositions[i].r >= 0) {
            sprayPositions[i].x += sprayPositions[i].x_offset
            sprayPositions[i].y += sprayPositions[i].y_offset
            sprayPositions[i].r -= sprayPositions[i].step;
        } else {
            sprayPositions.splice(i, i + 1)
        }


    }

    if (sprayClick.x != undefined) {
        for (var i = 0; i < 5; i++) {
            let color = colors[Math.floor(Math.random() * 5)]
            // console.log(color)
            let star = new Star(ctx, 10, sprayClick.x, sprayClick.y, 0, "2", null, color)
            star.draw();
            spraySave(sprayClick.x, sprayClick.y, color)
        }
        sprayClick.x = undefined;
        sprayClick.y = undefined;
    }
    //Spary--End

    if (mouseClick.x != undefined) {

        let star = new Star(ctx, 0, mouseClick.x, mouseClick.y, 0, "2", "rgba(255, 255, 255, 1)", null)
        star.draw();
        clickSave(mouseClick.x, mouseClick.y, 0, 1)
        mouseClick.x = undefined;
        mouseClick.y = undefined;
    }


    requestAnimationFrame(animate);

}

animate();
