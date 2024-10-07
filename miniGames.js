//GRAB ELEMENTS FROM DOCUMENT
const gameInstructions = document.getElementById("gameDiscription")
const mobileDirections = document.getElementById("mobileDir")
const largeBrowserDirections = document.getElementById("largeDispDir")
const playBtn = document.getElementById("play")
const returnBtn =  document.getElementById("return")
const betBtn = document.getElementById("bet")
const miniGameDiv = document.querySelector(".miniGame")
const collectedWorms = document.getElementById("wormCollect")
const useCloverBtn = document.getElementById("luck")


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

// if(clover >= 1) useCloverBtn.classList.remove("d-none")
//     else {useCloverBtn.classList.add("d-none") }

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
    miniGameDiv.classList.add("d-none")
    gameTrigger.initiated = false
    wormTrigger.initiated = false
    boatTrigger.initiated = false
    treeTrigger.initiated = false
    fishTrigger.initiated = false
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
    miniGameDiv.classList.remove("d-none")
    //MANIPULATE HTML ELEMENTS
    battleBackgroundImg.src = "img/ground-7855872_1280.png"
    mobileDirections.classList.remove("d-md-block", "d-sm-block", "d-lg-none")
    largeBrowserDirections.classList.remove("d-lg-block"); 
    collectedWorms.classList.remove("d-none")
    gameInstructions.innerHTML = "Watch out for frogs! They'll steal your worms!"
    playBtn.innerHTML = "Dig!"
    returnBtn.classList.remove('display-none')
}
//#endregion

//#region FLOWER GAME 

const apiQuotes_url ="";

async function fetchQuotesData(){
    let quotesURL= `https://thesimpsonsquoteapi.glitch.me/quotes`
    console.log(quotesURL)
    let quotes;
    let characters
    
    await fetch(quotesURL)
    .then(response => response.json())
    .then(data => {

        console.log(data)
        quotes = data[0].quote
        console.log(quotes)

        characters = data[0].character
        console.log(characters)
    })
    .catch(error => console.log('Authorization failed : ' + error.message));
    
    gameInstructions.innerHTML = quotes + " - " + characters
    setTimeout(() => {
        gameInstructions.innerHTML = ""
    }, 10000);
     
}

   
function flowerGame(){
    console.log("flower game activated")
    miniGameDiv.classList.remove("d-none")
    returnBtn.classList.add("d-none")
    fetchQuotesData()
    
}



//#endregion

//#region FISHING GAME

const fishPoleImg = new Image();
fishPoleImg.src = "img/fishing-rod-6856757_640medium.png"
const fishPole = new Sprite ({
    position: {
        x: 300,
        y: -100
    },
    image: fishPoleImg

})


const fishSchoolImg = new Image();
fishSchoolImg.src = "img/fishing-154745_640.png"
const fishSchool = new Sprite ({
    position: {
        x: 300,
        y: 150
    },
    image: fishSchoolImg

})

const fishCaughtImg = new Image();
fishCaughtImg.src = "img/frog-test.png"
const fishCaught = new Sprite ({
    position: {
        x: 300,
        y: 150
    },
    image: fishCaughtImg
})

const waterImg = new Image();
waterImg.src = "img/underwater-2615376_1280.jpg"
const water = new Sprite ({
    position: {
        x: 0,
        y: 0
    },
    image: waterImg
})

const fishBtn = document.getElementById("fishBtn")
const reelBtn = document.getElementById("reel")
fishBtn.addEventListener("click", ()=> {
    reelBtn.classList.remove("d-none")
    console.log("click")
    setTimeout(() => {
        reelBtn.classList.add("d-none")
    }, 1000);
       setTimeout(() => {
        reelBtn.classList.remove("d-none")
    }, 300);
})

let reelOutcome = 0
reelBtn.addEventListener("click", ()=> {
    reelOutcome= Math.floor(Math.random() * 3) 
    console.log(reelOutcome)
    water.draw()
    switch (reelOutcome) {
        case 0:
          console.log("caught a fish")
            break;
        case 1:
          console.log("Lost your bait")
            break;
        case 2:
            console.log("Caught a boot")
            break;
        default:
        break;
    }

})

function fishGame(){
console.log("fish game activated")
    //DRAW IMAGES FOR START OF GAME
    water.draw()
    fishPole.draw();
    miniGameDiv.classList.remove("d-none")
    //MANIPULATE HTML ELEMENTS
    mobileDirections.classList.remove("d-md-block", "d-sm-block", "d-lg-none")
    largeBrowserDirections.classList.remove("d-lg-block"); 
    collectedWorms.classList.remove("d-none")
    gameInstructions.innerHTML = "Cast your line to catch a fish - Reel it in quick before the fish gets away!"
    returnBtn.classList.remove('display-none')
    playBtn.classList.add("d-none")
    fishBtn.classList.remove("d-none")
}


function boatGame(){
    console.log("boat game activated")
    miniGameDiv.classList.remove("d-none")

}

let clover=0
let cookingHerbs=0



function herbGame(){
    console.log("herb game activated")
    miniGameDiv.classList.remove("d-none")
    returnBtn.classList.add("d-none")

   const foragedItem = Math.floor(Math.random()*4)
    console.log(foragedItem)
    let herbPicked = true; 
    
    switch (foragedItem) {
        case 1:
            clover++
            console.log(clover)

            break;
        case 2:
            cookingHerbs++
            console.log(cookingHerbs)
            break;
        default:
            break;
    }
    



}

function treeGame(){
    console.log("tree game activated")
    miniGameDiv.classList.remove("d-none")

}
