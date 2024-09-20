//#region CREATE GAME MAP

//CAPTURE CANVAS ELEMENT FROM HTML - <canvas> is a bitmapped area in HTML page. JavaScript uses Canvas API to draw graphics on the canvas
const canvas = document.querySelector('canvas');

//TO DRAW IN CANVAS A 2D CONTEXT OBJECT MUST BE CREATED
const c = canvas.getContext('2d')

//SETTING THE WIDTH AND HEIGHT OF THE CANVAS
canvas.width = 1024
canvas.height = 576

class Boundry {
    static width = 48
    static height = 48
    constructor({position}){
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}



const boundaries = [];
const offset = {
    x: -70,
    y: -200
}


const collisionsMapArr = [];
//CREATE 2D ARRAY USING NESTED LOOPS TO PREP FOR COLLISION DETECTION -70 comes from 70 tiles set by map
// for (let i = 0; i < collisions.length; i += 70) {
    
//     collisionsMapArr.push(collisions.slice( i, 70 + i))
//     console.log(collisionsMapArr)
    
// }

collisionsMapArr.forEach((row, i) => {
    row.forEach ((Symbol, j) => {
        if(Symbol === 1025)
        boundaries.push(
            new Boundry({
                position:{
                    x: j * Boundry.width + offset.x,
                    y: i * Boundry.height + offset.y
                }
            })
        )
    })
});

console.log(boundaries)
//.FILLRECT SETS (X COORD, Y COORD, WIDTH, HEIGHT)
c.fillRect(0,0,canvas.width, canvas.height)

//CHANGE COLOR OF CANVAS
c.fillStyle = "white"

//SET NEW IMAGE ELEMENT CALLED mapImg 
const mapImg= new Image()
mapImg.src = "./img/GameMap.png"
console.log(mapImg)

//CREATE NEW IMAGE CALLED playerImage 
const playerImage= new Image()
playerImage.src = "./img/playerDown.png"
console.log(playerImage)

//pulling data from collisionMap.js
console.log(collisions)

//.ON-LOAD WORKS LIKE ASYNC TO ALLOW FOR IMAGE TO LOAD BEFORE IT IS "DRAWN" ONTO THE CANVAS - OTHERWISE THE CODE RUNS BEFORE THE IMG IS LOADED AND NOTHING APPEARS


//#endregion

//#region PLAYER MOVEMENT

//FUNCTION CREATED TO CREATE AN INFINITE LOOP SO THE ILLUSION OF PLAYER MOVEMENT CAN HAPPEN - FUNCTION CALLS ITSELF OVER AND OVER

//CREATE A CLASS FOR SPRITES - AN OBJECT IS PASSED IN AS A CONSTRUCTOR
class Sprite {
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}


const background = new Sprite({
    position: {
        x:offset.x,
        y:offset.y
    },
    image: mapImg
})

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

function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        // boundary.draw
        console.log(boundary)
        
    })
    c.drawImage(
        playerImage, 
        //to crop player image sprites
        //x-coord
        0,
        //y-coord
        0,
        //width
        playerImage.width / 4,
        //height
        playerImage.height, 

        //location image is placed on canvas     
        canvas.width / 2 - (playerImage.width / 4) /2, 
        canvas.height / 2 - playerImage.height / 2,

        //how image should be rendered - actual width and height
         //width
         playerImage.width / 4,
         //height
         playerImage.height, 
    )

    if (keys.w.pressed && lastKey === 'w') background.position.y += 3;
    else if(keys.s.pressed && lastKey === 's') background.position.y -= 3;
    else if(keys.d.pressed && lastKey === 'd') background.position.x -= 3;
    else if(keys.a.pressed && lastKey === 'a') background.position.x += 3;
    
        
    
}

animate()

let lastKey = ''
//ESTABLISH CONTROLS
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

    console.log(keys)
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

    console.log(keys)
})

