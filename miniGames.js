//GRAB ELEMENTS FROM DOCUMENT
const gameInstructions = document.getElementById("gameDiscription")
const mobileDirections = document.getElementById("mobileDir")
const largeBrowserDirections = document.getElementById("largeDispDir")
const fishPlayBtn = document.getElementById("play")
const returnBtn =  document.getElementById("return")
const betBtn = document.getElementById("bet")
const miniGameDiv = document.querySelector(".miniGame")
const collectedWorms = document.getElementById("wormCollect")
const useCloverBtn = document.getElementById("luck")
const wormPlayBtn= document.getElementById("dig")
const wormGameDiv=document.querySelector(".wormGame")
const collectedFish = document.getElementById("fishCollect")
const collectedClover = document.getElementById("cloverCollect")
const collectedHerbs = document.getElementById("herbCollect")
const forestGameDiv = document.getElementById("forestGame")
const forageBtn = document.getElementById("forageBtn")
const cookFishBtn = document.getElementById("cookFish")
const collectedTinder = document.getElementById("tinderCollect")
const collectedLogs = document.getElementById("logCollect") 
const collectedFlint = document.getElementById("flintcollected")
const fishGameDiv = document.querySelector(".fishingGame")

let clover=0
let cloverUsed = false; 
useCloverBtn.addEventListener("click", () => {
    clover--
    collectedClover.innerHTML = `Clovers Collected: ${clover}`
    if(clover <=0){
        clover = 0; 
        useCloverBtn.classList.add("d-none")
    } 
    cloverUsed = true; 

})


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
   wormPlayBtn.addEventListener("click", () => {
    digOutcome= Math.floor(Math.random() * 3) 
    if(cloverUsed === true) {
        digOutcome = 2
        cloverUsed = false; 
    }
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
    if (clover>0) {
        useCloverBtn.classList.remove("d-none")
        
    }else {
        useCloverBtn.classList.add("d-none")
    }
})

//RETURN TO MAP FEATURE
returnBtn.addEventListener("click", () => {
    miniGameDiv.classList.add("d-none")
    forestGameDiv.classList.add('d-none')
    wormGameDiv.classList.add('d-none')
    fishGameDiv.classList.add('d-none')
    collectedFish.classList.add('d-none')
    collectedFlint.classList.add('d-none')
    collectedHerbs.classList.add('d-none')
    collectedLogs.classList.add('d-none')
    collectedTinder.classList.add('d-none')
    gameInstructions.innerHTML = "Frolic through the flowers and grasses to see what you can find!"
    
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

    if (cloverUsed === true){
        betOutcome = 0; 
        cloverUsed = false; 
    }
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
    wormPlayBtn.classList.remove("d-none")
    returnBtn.classList.remove('d-none')
    wormGameDiv.classList.remove('d-none')
    forestGameDiv.classList.add("d-none")
    collectedFish.classList.add('d-none')
    collectedFlint.classList.add('d-none')
    collectedLogs.classList.add('d-none')
    collectedTinder.classList.add('d-none')
    forageBtn.classList.add('d-none')

    
    if (wormCount>0) {
        gameInstructions.innerHTML = "Watch out for frogs! They'll steal your worms!"
        
    } else {
        gameInstructions.innerHTML = "Use your worms as bait to catch fish! Explore the map to find a fishing hole."
    }

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

let fishCount=0;

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
fishCaughtImg.src = "img/caughtFishSM.png"
const fishCaught = new Sprite ({
    position: {
        x: 300,
        y: 150
    },
    image: fishCaughtImg
})

const bootCaughtImg = new Image();
bootCaughtImg.src = "img/boot.png"
const bootCaught = new Sprite ({
    position: {
        x: 300,
        y: 150
    },
    image: bootCaughtImg
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
    if (cloverUsed === true){
        reelOutcome = 0;
        cloverUsed = false;
    }
    console.log(reelOutcome)
    console.log(cloverUsed)
    water.draw()
    switch (reelOutcome) {
        case 0:
          console.log("caught a fish")
          wormCount--
          fishCount++
          fishCaught.draw();
          gameInstructions.innerHTML = "You caught a fish!"
          collectedWorms.innerHTML = "Worms Collected: " + wormCount
          collectedFish.innerHTML = `Fish Collected: ${fishCount}`
            break;
        case 1:
          console.log("Lost your bait")
          fishSchool.draw();
          wormCount--
          gameInstructions.innerHTML = "Fish Got Your Bait!"
          collectedWorms.innerHTML = "Worms Collected: " + wormCount
            break;
        case 2:
            console.log("Caught a boot")
            bootCaught.draw();
            gameInstructions.innerHTML = "Caught a Boot"
            collectedWorms.innerHTML = "Worms Collected: " + wormCount
            break;
        default:
        break;
    }
    if (wormCount<1){
        fishBtn.classList.add("d-none")  
    } 

    if (clover>0) {
        useCloverBtn.classList.remove("d-none")
        
    }else {
        useCloverBtn.classList.add("d-none")
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
    returnBtn.classList.remove('d-none')
    fishBtn.classList.remove("d-none")
    wormPlayBtn.classList.add("d-none")
    betBtn.classList.add("d-none")
    wormGameDiv.classList.add("d-none")
    collectedFish.classList.remove("d-none")
    forestGameDiv.classList.add("d-none")   
    collectedFlint.classList.add('d-none')
    collectedHerbs.classList.add('d-none')
    collectedLogs.classList.add('d-none')
    collectedTinder.classList.add('d-none')
    forageBtn.classList.add('d-none')
    fishGameDiv.classList.remove('d-none')


    
    if (wormCount>=0) {
        fishBtn.classList.remove("d-none")
        gameInstructions.innerHTML = "Cast your line to catch a fish - Reel it in quick before the fish gets away!"
      
    }else {
        fishBtn.classList.add("d-none");
        gameInstructions.innerHTML = "You must collect worms to use as bait - explore the map to find a worm pit!"

    }
    
}

//#endregion


function boatGame(){
    console.log("boat game activated")
    miniGameDiv.classList.remove("d-none")

}


//#region HERB GAME
let cookingHerbs=0


function herbGame(){
    console.log("herb game activated")
    miniGameDiv.classList.remove("d-none")
    returnBtn.classList.add("d-none")
    
    
    const foragedItem = Math.floor(Math.random()*3)
    console.log(foragedItem)
    
    switch (foragedItem) {
        case 1:
            collectedClover.classList.remove("d-none")
            clover++
            collectedClover.innerHTML = `Clovers Collected: ${clover}`
            gameInstructions.innerHTML = 'You found a 4 leaf clover! Use them for goodluck in your adventures!'
            
            console.log(clover)
            
            break;
         
        case 2:
            collectedHerbs.classList.remove("d-none")
            cookingHerbs++
            console.log(cookingHerbs)
            collectedHerbs.innerHTML = `Cooking Herbs Collected: ${cookingHerbs}`
            gameInstructions.innerHTML = 'You found cooking herbs! I bet it would make the fish taste great!'

            break;
        default:
            break;
    }
    
}

//#endregion

//#region FOREST GAME

let canBuildFire= false; 
let tinderCount = 0;
let logCount = 0;
let flintCount = 0;


const forestImg = new Image();
forestImg.src = "img/evergreen-2025158_1280.png"
const forest = new Sprite ({
    position: {
        x: 0,
        y: 0
    },
    image: forestImg
})

const logsImg = new Image();
logsImg.src = "img/logs.png"
const logs = new Sprite ({
    position: {
        x: 300,
        y: 150
    },
    image: logsImg
})

flintImg = new Image();
flintImg.src = "img/rock.png"
const flint = new Sprite ({
    position: {
        x: 300,
        y: 150
    },
    image: flintImg
})
const fireImg = new Image();
fireImg.src = "img/fire.png"
const fire = new Sprite ({
    position: {
        x: 300,
        y: 150
    },
    image: fireImg
})
const tinderImg = new Image();
tinderImg.src = "img/tender.png"
const tinder = new Sprite ({
    position: {
        x: 300,
        y: 150
    },
    image: tinderImg
})


function treeGame(){
    console.log("tree game activated")
    miniGameDiv.classList.remove("d-none")

    //DRAW IMAGES FOR START OF GAME
    forest.draw()
    miniGameDiv.classList.remove("d-none")
    //MANIPULATE HTML ELEMENTS
    mobileDirections.classList.remove("d-md-block", "d-sm-block", "d-lg-none")
    largeBrowserDirections.classList.remove("d-lg-block"); 
    collectedWorms.classList.add("d-none")
    returnBtn.classList.remove('d-none')
    wormPlayBtn.classList.add("d-none")
    betBtn.classList.add("d-none")
    wormGameDiv.classList.add("d-none")
    collectedFish.classList.remove("d-none")
    forageBtn.classList.remove("d-none")
    collectedFlint.classList.remove('d-none')
    collectedLogs.classList.remove('d-none')
    collectedTinder.classList.remove('d-none')
    fishBtn.classList.add('d-none')
    useCloverBtn.classList.add('d-none')
    forestGameDiv.classList.remove('d-none')
    collectedHerbs.classList.remove('d-none')
    gameInstructions.innerHTML = "Forage to find materials to build a fire!"
}

forageBtn.addEventListener("click", ()=> {
    const forestItem = Math.floor(Math.random()*3)
    console.log(forestItem)
    switch (forestItem) {
        case 0:
            forest.draw()
            logs.draw(); 
            logCount++
            collectedLogs.innerHTML = `Log bundles: ${logCount}`
            if (fishCount>0 && cookingHerbs>0 && logCount>0 && tinderCount>0 && flintCount>0) {
                cookFishBtn.classList.remove('d-none')
            }
            else {
                cookFishBtn.classList.add('d-none')
            }
            
            break;
        case 1:
            forest.draw()
            flint.draw(); 
            flintCount++
            collectedFlint.innerHTML = `Flint: ${flintCount} `
            if (fishCount>0 && cookingHerbs>0 && logCount>0 && tinderCount>0 && flintCount>0) {
                cookFishBtn.classList.remove('d-none')
            }
            else {
                cookFishBtn.classList.add('d-none')
            }
            break;
        case 2:
            forest.draw()
            tinder.draw(); 
            tinderCount++
            collectedTinder.innerHTML = `Tinder: ${tinderCount}`
            if (fishCount>0 && cookingHerbs>0 && logCount>0 && tinderCount>0 && flintCount>0) {
                cookFishBtn.classList.remove('d-none')
            }
            else {
                cookFishBtn.classList.add('d-none')
            }
            break;
            default: 
            break; 
            
        }
      
    })

cookFishBtn.addEventListener("click", ()=> {
    fire.draw(); 
    fishCount--
    cookingHerbs--
    flintCount--
    tinderCount--
    logCount--
     collectedTinder.innerHTML = `Tinder: ${tinderCount}`
     collectedFlint.innerHTML = `Flint: ${flintCount} `
     collectedLogs.innerHTML = `Log bundles: ${logCount}`
     collectedFish.innerHTML = `Fish collected: ${fishCount}`
     collectedHerbs.innerHTML = `Herbs Collected: ${cookingHerbs}`



    if (fishCount>0 && cookingHerbs>0 && logCount>0 && tinderCount>0 && flintCount>0){
        cookFishBtn.classList.remove('d-none')
    }
    else {cookFishBtn.classList.add('d-none')}
})

if (fishCount > 0 && cookingHerbs > 0 && canBuildFire === true ) {
    cookFishBtn.classList.remove("d-none")
   
 }else {
     cookFishBtn.classList.add("d-none");
     gameInstructions.innerHTML = "You must collect fish, herbs, tinder, logs, and flint to cook a fish."

 }




//#endregion