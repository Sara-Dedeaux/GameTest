//GRAB ELEMENTS FROM DOCUMENT
const gameInstructions = document.getElementById("gameDiscription")
const mobileDirections = document.getElementById("mobileDir")
const largeBrowserDirections = document.getElementById("largeDispDir")
const playBtn = document.getElementById("play")
const returnBtn =  document.getElementById("return")
const betBtn = document.getElementById("bet")
const wormGameDiv = document.querySelector(".wormGame")
const collectedWorms = document.getElementById("wormCollect")




//#region WORM GAME
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

   //GAME LOGIC - 1 OF THREE IMGS WILL BE DISPLAYED - DIRT: NO CHANGE, WORM: ++ WORM  FROG: -- WORM 
   playBtn.addEventListener("click", () => {
    digOutcome= Math.floor(Math.random() * 3) 
    console.log(digOutcome)
    battleBackground.draw()
    switch (digOutcome) {
        case 0:
            dirt.draw(); 
            console.log("dirt")
            console.log("wormcount:" + wormCount)
            collectedWorms.innerHTML = "Worms Collected: " + wormCount
            break;
        case 1:
            frog.draw();
            console.log("frog")
            wormCount --
            if (wormCount <= 0 ) wormCount = 0;
            if (wormCount < 2) betBtn.classList.add("d-none")
                console.log("wormcount:" + wormCount)
             collectedWorms.innerHTML = "Worms Collected: " + wormCount


            break;
        case 2:
            worm.draw();
            console.log("worm")
            wormCount ++
            console.log("wormcount:" + wormCount)
            collectedWorms.innerHTML = "Worms Collected: " + wormCount

            break;
        default:
        break;
    }

    //IF 2 + WORMS HAVE BEEN COLLECTED GAMBLE FEATURE IS ADDED
    if ( wormCount >= 2) betBtn.classList.remove("d-none")
})

//RETURN TO MAP FEATURE
returnBtn.addEventListener("click", () => {
    wormGameDiv.classList.add("d-none")
    gameTrigger.initiated = false
    wormTrigger.initiated = false
    // battleBackgroundImg.src = ""
    // battleBackground.draw()
    animate()
})

 //GAMBLE - 1 OF 2 IMGS DISPLAYED - FROG: WORMS = 0, WORM: WORMS DOUBLED
 betBtn.addEventListener("click", ()=> {
    let betOutcome = Math.floor(Math.random()*2)
    if (betOutcome == 0) {
        battleBackground.draw()
    worm.draw()
        wormCount = wormCount * 2; 
        collectedWorms.innerHTML = "Worms Collected: " + wormCount
    }
    else {
        battleBackground.draw()
        frog.draw()
        wormCount = 0;   
        collectedWorms.innerHTML = "Worms Collected: " + wormCount
    }  
    if (wormCount < 2) betBtn.classList.add("d-none")
})


function wormCatchGame() {
    //DRAW IMAGES FOR START OF GAME
    battleBackground.draw()
    shovel.draw();
    wormGameDiv.classList.remove("d-none")
    //MANIPULATE HTML ELEMENTS
    battleBackgroundImg.src = "img/ground-7855872_1280.png"
    mobileDirections.classList.remove("d-md-block", "d-sm-block", "d-lg-none")
    largeBrowserDirections.classList.remove("d-lg-block"); 
    collectedWorms.classList.remove("d-none")
    gameInstructions.innerHTML = "Watch out for frogs! They'll steal your worms!"
    playBtn.innerHTML = "Dig!"
}
//#endregion

//#region FISHING GAME

function fishGame(){
    console.log("fish game activated")
}

function flowerGame(){
    console.log(" flower game activated")
}

function boatGame(){
    console.log("boat game activated")
}

function herbGame(){
    console.log("herb game activated")
}

function treeGame(){
    console.log("tree game activated")
}
