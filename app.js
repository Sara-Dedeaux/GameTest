//BUG LIST
// If capLock is on controls do not work

//TO DO LIST



//ESTABLISH AND FORMAT CANVAS ELEMENT
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

//ESTABISH AND FORMAT PLAYER IMAGES
const playerDownImage= new Image()
playerDownImage.src = "./img/playerDown.png"

const playerUpImage= new Image()
playerUpImage.src = "./img/playerUp.png"

const playerLeftImage= new Image()
playerLeftImage.src = "./img/playerLeft.png"

const playerRightImage= new Image()
playerRightImage.src = "./img/playerRight.png"

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

//ESTABLISH AND FORMAT MAP IMAGE
const mapImg= new Image()
mapImg.src = "img/GameMapUpdated.png"

//SET OBJECT FOR IMAGE ALIGNMENTS
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



//ESTABLISH ARRAY TO HOLD JSON DATA FOR MINI-GAME ZONES
const collisionsMapArr = [];
const wormZoneMap = [];
const flowerZoneMap = []; 
const boatZoneMap = []; 
const herbZoneMap = []; 
const treeZoneMap = [];
const fishZoneMap = []; 


//FILL ARRAYS WITH ZONE DATA
condenseZoneArray(collisionsMapArr, collisions)
condenseZoneArray(boatZoneMap, boatZoneData)
condenseZoneArray(fishZoneMap, fishZoneData)
condenseZoneArray(flowerZoneMap, flowerZoneData)
condenseZoneArray(herbZoneMap, herbZoneData)
condenseZoneArray(treeZoneMap, treeZoneData)
condenseZoneArray(wormZoneMap, wormZoneData)

function condenseZoneArray (zoneArr, zoneData) {
    for (let i = 0; i < zoneData.length; i += 70) {
        zoneArr.push(zoneData.slice( i, 70 + i))
    }
}

//USE ZONE DATA TO CREATE AN ARRAY OF MAP BOUNDARIES
const boundaries = [];
const boatZones = [];
const fishZones = [];
const flowerZones = [];
const herbZones = [];
const treeZones = [];
const wormZones = []; 

defineBoundaries(collisionsMapArr, boundaries)
defineBoundaries(boatZoneMap, boatZones )
defineBoundaries(fishZoneMap, fishZones )
defineBoundaries(flowerZoneMap, flowerZones )
defineBoundaries(herbZoneMap, herbZones )
defineBoundaries(treeZoneMap, treeZones )
defineBoundaries(wormZoneMap, wormZones)

function defineBoundaries(zoneMap, zones) {
    zoneMap.forEach((row, i)=> {
        row.forEach ((symbol, j) => {
            if(symbol != 0)
            zones.push(
                new Boundary({
                    position:{
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        })
    });   
}

//CREATE OBJECT FOR KEYS FOR PLAYER MOVEMENT CONTROLS
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
console.log(upBtn)
const leftBtn=document.getElementById("left");
console.log(leftBtn)
const rightBtn=document.getElementById("right");
console.log(rightBtn)
const downBtn=document.getElementById("down");
console.log(downBtn)



//ESTABLISH AN ARRAY SO MAP CAN BE FORMATTED. THESE ITEMS SHOULD MOVE AS ONE TO GIVE THE ILLUSION THAT THE PLAYER IS MOVING
const movables = [background, ...boundaries, ...wormZones ]

function rectangularCollision({rectangle1, rectangle2}){
    //CHECKS TO SEE HOW MUCH OF THE PLAYER AND BOUNDARY ARE OVERLAPPING BASED ON X & Y COORDS AND IF THE PLAYER HAS MOVED FAR ENOUGH INTO THE BOUNDARY IT WILL RETURN TRUE ( THIS PREVENTS ACCIDENTAL OR OVER TRIGGERING OF GAME ZONE)
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x && rectangle1.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.position.y <= rectangle2.position.y + rectangle2.height && rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}

//ESTABLISH OBJECT THAT CAN HOLD A BOOLEAN TO SWITCH ON AND OFF IF A MINI-GAME HAS BEEN ACTIVATED
const battle = {
    initiated: false
}



function animate(){
   //CREATES AN INFINITE LOOP TO GIVE THE ILLUSION OF MOVEMENT -
   const animationID = window.requestAnimationFrame(animate)

   //DRAW MAP, ZONE BOUNDARIES, AND PLAYER ON CANVAS
    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()
    })
    wormZones.forEach((battlezone) => {
        battlezone.draw()
    })  
    player.draw()


    //ESTABLISHES BOOLEAN TO ALLOW OR PREVENT PLAYER MOVEMENT
    let moving = true

    //THIS STOPS PLAYER IMAGE FROM CYCYLING THROUGH SPRITE FRAMES WHEN STANDING STILL
    player.moving = false; 
    
    //IF A MINI-GAME HAS BEEN TRIGGERED THIS WILL PREVENT PLAYER FROM MOVING SO THE GAME CAN BE PLAYED
    if (battle.initiated) return
    
    //CHECKS FOR PLAYER COLLISION WITH MAP BOUNDARIES AND IF PLAYER IS OVERLAPPING ENOUGH WITH ZONE, THE MINI-GAME WILL BE ACTIVATED AND THE ANIMATE LOOP WILL BE BROKEN TO ALLOW FOR MINI-GAME SCREEN TO SHOW
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed || upBtnPressed === true || downBtnPressed === true || leftBtnPressed === true || rightBtnPressed === true) {
        for (let i = 0; i < wormZones.length; i++) {
            const battlezone = wormZones[i];
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
                Math.random() < 0.1
            ) {
                battle.initiated = true
                if (battle.initiated){
                    //deactivate current animation loop 
                    window.cancelAnimationFrame(animationID)


                    // wormCatchGame()

                    fishingGame()
                }
            }
        }
    }
    
    //DETERMINE DIRECTION OF PLAYER MOVEMENT BASED ON KEY PRESS AND BOUNDARY DETECTIONS
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
        if (moving) movables.forEach(movable => {
            movable.position.y += 3
            })
        } else if(keys.s.pressed && lastKey === 's' || downBtnPressed === true) {
            player.moving = true 
            player.image = player.sprites.down

            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i];

                if (rectangularCollision({
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

        } else if(keys.d.pressed && lastKey === 'd' || rightBtnPressed === true){
            player.moving = true 
            player.image = player.sprites.right

            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i];

                if (rectangularCollision({
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
        if (moving) movables.forEach(movable => {movable.position.x -= 3})
    } else if (keys.a.pressed && lastKey === 'a' || leftBtnPressed === true) {
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
            ){
                moving = false;
                break;
            }
            
        }
        if (moving) movables.forEach(movable => {movable.position.x += 3})
    }
}//END ANIMATE FUNCTION

//CREATE WORM MINI-GAME IMAGES AND SPRITES
const battleBackgroundImg = new Image(); 
battleBackgroundImg.src = "img/ground-7855872_1280.png"
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    }, 
    image: battleBackgroundImg
})

const shovelImg = new Image();
shovelImg.src = "img/shovel-test.png"
shovelImg.classList.add("wormImgs")
const shovel = new Sprite ({
    position: {
        x: 300,
        y: 50
    },
    image: shovelImg
})

const dirtImg = new Image();
dirtImg.src = "img/dirt-test.png"
dirtImg.classList.add("wormImgs")
const dirt = new Sprite ({
    position: {
        x: 300,
        y: 150
    },
    image: dirtImg
})

const pondImg = new Image();
pondImg.src = "img/pond-test.png"
pondImg.classList.add("pondImgs")
const pond = new Sprite ({
    position: {
        x: -250,
        y: -200
    },
    image: pondImg
})

const frogImg = new Image();
frogImg.src = "img/frog-test.png"
frogImg.classList.add("wormImgs")
const frog = new Sprite ({
    position: {
        x: 300,
        y: 150
    },
    image: frogImg
})

const wormImg = new Image();
wormImg.src = "img/worm-test2.png"
wormImg.classList.add("wormImgs")
const worm = new Sprite ({
    position: {
        x: 100,
        y: 0
    },
    image: wormImg
})

//ESTABLISH WORM GAME VARIABLES
let digOutcome = 4;
let wormCount = 0; 

function wormCatchGame () {
    //DRAW IMAGES FOR START OF GAME
    battleBackground.draw()
    shovel.draw();

    //DOUBLE OR NOTHING FEATURE
    wormBetBtn.addEventListener("click", ()=> {
        let betOutcome = Math.floor(Math.random()*2)
        if (betOutcome == 0) {
            battleBackground.draw()
        worm.draw()
            wormCount = wormCount * 2; 
            wormCountElement.innerHTML = "Worm Count: " + wormCount
        }
        else {
            battleBackground.draw()
            frog.draw()
            wormCount = 0;   
            wormCountElement.innerHTML = "Worm Count: " + wormCount
        }  
        if (wormCount < 2) wormBetBtn.classList.add("wormBetOff")
    })
  
    //RETURN TO MAP FEATURE
    backToMapBtn.addEventListener("click", () => {
        battle.initiated = false
        animate();
    })

  
    digBtnElement.addEventListener("click", () => {
        digOutcome= Math.floor( Math.random() * 3) 
        console.log(digOutcome)
        battleBackground.draw()
            
        switch (digOutcome) {
            case 0:
                dirt.draw(); 
                break;

            case 1:
                frog.draw();
                wormCount --

                if (wormCount <= 0 ) wormCount = 0;
                if (wormCount < 2) wormBetBtn.classList.add("wormBetOff")

                break;

            case 2:
                worm.draw();
                wormCount ++
                break;
        
            default:
            break;
        }
        wormCountElement.innerHTML = "Worm Count: " + wormCount
        if ( wormCount >= 2) wormBetBtn.classList.remove("wormBetOff")
    })
}

function fishingGame(){

   

    //draw background for fish game
    pond.draw()
    //use worms to fish

    //create list of fish/ items to catch 

    //create game option to forage herbs, gather wood, gather flint rock, to build a fire and cook the fish

    //decide how many times a worm can be used as bait and the probability of outCome - if you forage a lucky clover your odds are better in a game - how long does the luck last? number of games played or chances taken?

    //enery levels decrease with each game played - energy increases with food - different games will require different energy levels - when at 0 energy the only activity you can do is forage for herbs for food to increase energy levels

}



//MOBILE CONTROL CHECKS
let upBtnPressed; 
let leftBtnPressed;
let rightBtnPressed; 
let downBtnPressed; 




//ARROW CONTROLS - TOUCH EVENTS 
upBtn.addEventListener("touchstart", (event) => {

    event.preventDefault();
    upBtnPressed= true; 
})

upBtn.addEventListener("touchend", (event) => {
    upBtnPressed= false; 
})

leftBtn.addEventListener("touchstart", (event) => {
    event.preventDefault();
    leftBtnPressed= true; 
})

leftBtn.addEventListener("touchend", () => {
    leftBtnPressed= false; 
})

rightBtn.addEventListener("touchstart", (event) => {
    event.preventDefault();
    rightBtnPressed= true; 
})

rightBtn.addEventListener("touchend", () => {
    rightBtnPressed= false; 
})

downBtn.addEventListener("touchstart", (event) => {
    event.preventDefault();
    downBtnPressed= true; 
})

downBtn.addEventListener("touchend", () => {
    downBtnPressed= false; 
})


//ARROW CONTROLS - MOUSE EVENTS 
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

















