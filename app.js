
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
            console.log(this.width)
            console.log(this.height)

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
    x: -70,
    y: -200
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
        c.fillStyle = 'red'
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





const testBoundary = new Boundary({
    position: {
        x:400,
        y:400
    }
})

const movables = [background, testBoundary]

function animate(){
    window.requestAnimationFrame(animate)
    background.draw()

    // boundaries.forEach((boundary) => {
    //     boundary.draw()
    //     console.log(boundary)
        
    // })

    testBoundary.draw()
    player.draw()

    

    if(player.position.x + player.width >= testBoundary.position.x && player.position.x <= testBoundary.position.x + testBoundary.width && player.position.y <= testBoundary.position.y + testBoundary.height && player.position.y + player.height >= testBoundary.position.y) {
        console.log("colliding")
    }

    if (keys.w.pressed && lastKey === 'w') {
        movables.forEach(movable => {movable.position.y += 3})
     }else if(keys.s.pressed && lastKey === 's') {
        movables.forEach(movable => {movable.position.y -= 3})
     }else if(keys.d.pressed && lastKey === 'd') {
        movables.forEach(movable => {movable.position.x -= 3})
     }else if(keys.a.pressed && lastKey === 'a') {
        movables.forEach(movable => {movable.position.x += 3})
    }
}




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

















