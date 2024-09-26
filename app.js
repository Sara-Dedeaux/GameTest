
//Create function to generate question box

function userDecision () {
    const instructionBox = document.createElement("div")
    instructionBox.classList.add("instructions")

    const parentDiv = document.getElementById("overlappingDiv");

    parentDiv.append(instructionBox)



}



//TIME OF VIDEO: 2:54:38

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')




//SETTING THE WIDTH AND HEIGHT OF THE CANVAS
canvas.width = 1024
canvas.height = 576

//CREATE NEW IMAGE CALLED playerImage 
const playerDownImage= new Image()
playerDownImage.src = "./img/playerDown.png"

const playerUpImage= new Image()
playerUpImage.src = "./img/playerUp.png"

const playerLeftImage= new Image()
playerLeftImage.src = "./img/playerLeft.png"

const playerRightImage= new Image()
playerRightImage.src = "./img/playerRight.png"




//SET NEW IMAGE ELEMENT CALLED mapImg 
const mapImg= new Image()
mapImg.src = "./img/GameMap.png"




//ESTABLISH ARRAY FOR BOUNDARIES

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 /2, 
        y: canvas.height / 2 - 68 / 2,
    }, 
    image: playerDownImage,
    frames: {
        max:4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
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

const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice( i, 70 + i))
}

console.log(battleZonesMap)






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

const battleZones = []; 

battleZonesMap.forEach((row, i)=> {
    row.forEach ((symbol, j) => {
        if(symbol === 1025)
        battleZones.push(
            new Boundary({
                position:{
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            })
        )
    })
});

console.log(battleZones)

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

//MOBILE BUTTONS
const upBtn= document.getElementById("up"); 
const leftBtn=document.getElementById("left");
const rightBtn=document.getElementById("right");
const downBtn=document.getElementById("down");




const movables = [background, ...boundaries, ...battleZones ]//...moves all elements seperately from boundaries array into movables- instead of creating 2-d array

function rectangularCollision({rectangle1, rectangle2}){
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x && rectangle1.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.position.y <= rectangle2.position.y + rectangle2.height && rectangle1.position.y + rectangle1.height >= rectangle2.position.y)

    
}

const battle = {
    initiated: false
}

function animate(){




    
   const animationID = window.requestAnimationFrame(animate)
   console.log(animationID)
    background.draw()
    
    boundaries.forEach((boundary) => {
        boundary.draw()
        
    })

    battleZones.forEach((battlezone) => {
        battlezone.draw()
    })
    
    player.draw()

    let moving = true
    player.moving = false; 
    
    
    const cutScreen =  document.querySelector(".gameMapDiv")
    
   
    

    //this prevents player from continuing to move once a battle is activated
    console.log(animationID)
    if (battle.initiated) return
    
    //activate a battle
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed || upBtnPressed === true || downBtnPressed === true || leftBtnPressed === true || rightBtnPressed === true) {
        for (let i = 0; i < battleZones.length; i++) {
            const battlezone = battleZones[i];
            const overlappingArea = 
            (Math.min(
                player.position.x + player.width, 
                battlezone.position.x + battlezone.width
            ) - 
            Math.max(player.position.x, battlezone.position.x)) * 
            (Math.min(
                player.position.y + player.height, 
                battlezone.position.y + battlezone.height
            ) -
            Math.max(player.position.y, battlezone.position.y))

            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: battlezone
                }) &&
                overlappingArea > (player.width * player.height) / 2 &&
                Math.random() < 0.01
            ) {
                console.log("activate battle")
                battle.initiated = true
                
                if (battle.initiated){
                    cutScreen.style.opacity = .5;

                    //deactivate current animation loop 
                    window.cancelAnimationFrame(animationID)
                  
                    //activate a new animation loop 
                    animateBattle()
                }
            }


            
        }

    }
    
    //DETERMINE BOUNDARIES AND TURN OFF MOVEMENT IF PLAYER COLLIDES WITH BARRIERS
    
    if (keys.w.pressed && lastKey === 'w' || upBtnPressed=== true) {
        player.moving = true 
        player.image = player.sprites.up
       

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
    
    else if(keys.s.pressed && lastKey === 's' || downBtnPressed === true) {
        player.moving = true 
        player.image = player.sprites.down

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

    } else if(keys.d.pressed && lastKey === 'd' || rightBtnPressed === true)
        {
            player.moving = true 
            player.image = player.sprites.right

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
        player.moving = true 
        player.image = player.sprites.left


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

function animateBattle() {
    window.requestAnimationFrame(animateBattle)
    console.log('animating battle')
}

//MOBILE CONTROL CHECKS
let upBtnPressed; 
let leftBtnPressed;
let rightBtnPressed; 
let downBtnPressed; 


//ESTABLISH CONTROLS FOR MOBILE 
upBtn.addEventListener("mousedown", () => {
    upBtnPressed= true; 
})

upBtn.addEventListener("mouseup", () => {
    upBtnPressed= false; 
})

leftBtn.addEventListener("mousedown", () => {
    leftBtnPressed= true; 
})

leftBtn.addEventListener("mouseup", () => {
    leftBtnPressed= false; 
})

rightBtn.addEventListener("mousedown", () => {
    rightBtnPressed= true; 
})

rightBtn.addEventListener("mouseup", () => {
    rightBtnPressed= false; 
})

downBtn.addEventListener("mousedown", () => {
    downBtnPressed= true; 
})

downBtn.addEventListener("mouseup", () => {
    downBtnPressed= false; 
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

















