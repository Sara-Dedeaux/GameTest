
//TIME OF VIDEO: 2:54:38

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

//SETTING THE WIDTH AND HEIGHT OF THE CANVAS
canvas.width = 1024
canvas.height = 576

//CREATE NEW IMAGE CALLED playerImage 
const playerImage= new Image()
playerImage.src = "./img/playerDown.png"




//SET NEW IMAGE ELEMENT CALLED mapImg 
const mapImg= new Image()
mapImg.src = "./img/GameMap.png"

class Sprite {
constructor({position, velocity, image, frames = { max: 1 }}) {
        this.position = position
        this.image = image
        this.frames = frames
        this.image.onload = () => {

            this.width = this.image.width / this.frames.max
            
            this.height = this.image.height

        }
    }

    draw(){
      
        c.drawImage(
            this.image, 
            0, //x-coord
            0, //y-coord
            //width
            this.image.width / this.frames.max,
            this.image.height, 
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
    }
}


//ESTABLISH ARRAY FOR BOUNDARIES

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 /2, 
        y: canvas.height / 2 - 68 / 2,
    }, 
    image: playerImage,
    frames: {
        max:4
    }
})

const offset = {
    x: -80,
    y: -250
}

const background = new Sprite({
    position: {
        x:offset.x,
        y:offset.y
    },
    image: mapImg
})

//ESTABLISH ARRAY FOR COLLISION MAP
const collisionsMapArr = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMapArr.push(collisions.slice( i, 70 + i))
}

class Boundary {
    
    static width = 48
    static height = 48
    constructor({position}){
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        c.fillStyle = 'rgba(255,0,0,0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = [];

collisionsMapArr.forEach((row, i)=> {
    row.forEach ((symbol, j) => {
        if(symbol === 1025)
        boundaries.push(
            new Boundary({
                position:{
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            })
        )
    })
});






const keys = {
    w: {
        pressed:false
    },
    s: {
        pressed:false
    },
    d: {
        pressed:false
    },
    a: {
        pressed:false
    }
}



const upBtn= document.getElementById("up"); 
const leftBtn=document.getElementById("left");
const rightBtn=document.getElementById("right");
const downBtn=document.getElementById("down");


const movables = [background, ...boundaries ]//...moves all elements seperately from boundaries array into movables- instead of creating 2-d array

function rectangularCollision({rectangle1, rectangle2}){
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x && rectangle1.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.position.y <= rectangle2.position.y + rectangle2.height && rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}

function animate(){




    
    let moving = true
    window.requestAnimationFrame(animate)
    background.draw()

    boundaries.forEach((boundary) => {
        boundary.draw()
              
    })

    player.draw()

  //DETERMINE BOUNDARIES AND TURN OFF MOVEMENT IF PLAYER COLLIDES WITH BARRIERS
    if (keys.w.pressed && lastKey === 'w' || upBtnPressed=== true) {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];

            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position:{
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    } 
                })
            ) {
                moving = false
                break
            }
            
        }

        
        if (moving)
        movables.forEach(movable => {
            movable.position.y += 3
        })
    }
    
    else if(keys.s.pressed && lastKey === 's' || downBtnPressed=== true) {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];

            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position:{
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                        }
                    } 
                })
            ) {
                moving = false;
                break;
            }
            
        }
        
        if (moving)
        movables.forEach(movable => {movable.position.y -= 3})

    } else if(keys.d.pressed && lastKey === 'd' || rightBtnPressed === true) {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];

            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position:{
                            x: boundary.position.x - 3,
                            y: boundary.position.y 
                        }
                    } 
                })
            ) {
                moving = false;
                break;
            }
            
        }

        if (moving)
        movables.forEach(movable => {movable.position.x -= 3})
     }else if(keys.a.pressed && lastKey === 'a' || leftBtnPressed === true) {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];

            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position:{
                            x: boundary.position.x + 3,
                            y: boundary.position.y
                        }
                    } 
                })
            ) {
                moving = false;
                break;
            }
            
        }

        if (moving)
        movables.forEach(movable => {movable.position.x += 3})
    }
}


//ESTABLISH CONTROLS FOR MOBILE 
let upBtnPressed; 
let leftBtnPressed;
let rightBtnPressed; 
let downBtnPressed; 


upBtn.addEventListener("mousedown", () => {
    console.log("top arrow down")

    upBtnPressed= true; 
    console.log(upBtnPressed)


})

upBtn.addEventListener("mouseup", () => {
    console.log("top arrow released")
    upBtnPressed= false; 
    console.log(upBtnPressed)
})

leftBtn.addEventListener("mousedown", () => {
    console.log("top arrow down")

    leftBtnPressed= true; 
    console.log(upBtnPressed)


})

leftBtn.addEventListener("mouseup", () => {
    console.log("top arrow released")
    leftBtnPressed= false; 
    console.log(upBtnPressed)
})

rightBtn.addEventListener("mousedown", () => {
    console.log("top arrow down")

    rightBtnPressed= true; 
    console.log(upBtnPressed)


})

rightBtn.addEventListener("mouseup", () => {
    console.log("top arrow released")
    rightBtnPressed= false; 
    console.log(upBtnPressed)
})

downBtn.addEventListener("mousedown", () => {
    console.log("top arrow down")

    downBtnPressed= true; 
    console.log(upBtnPressed)


})

downBtn.addEventListener("mouseup", () => {
    console.log("top arrow released")
    downBtnPressed= false; 
    console.log(upBtnPressed)
})


    
//ESTABLISH CONTROLS FOR FULL-SCREEN
let lastKey = ''
window.addEventListener('keydown', (e)=>{
    
    switch (e.key) {
        case "w":
            keys.w.pressed = true
            lastKey = 'w'

            break;
        case "a":
            keys.a.pressed = true
            lastKey = 'a'
            break;
        case "s":
            keys.s.pressed = true
            lastKey = 's'
            break;
        case "d":
            keys.d.pressed = true
            lastKey = 'd'
            break;

        default:
            break;
    }

})

window.addEventListener('keyup', (e)=>{
    
    switch (e.key) {
        case "w":
            keys.w.pressed = false
            break;
        case "a":
            keys.a.pressed = false
            break;
        case "s":
            keys.s.pressed = false
            break;
        case "d":
            keys.d.pressed = false
            break;

        default:
            break;
    }

})




animate()

















