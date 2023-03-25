// Change name of player ship & enemy ship 
const newName = document.querySelectorAll('.nameBox')
newName[0].textContent = "USS Assembly"
newName[1].textContent = 'Alien Invader'

// Player's Spaceship Properties
let ussAssembly = {
    hull: 20,
    firepower: 5,
    accuracy: 0.7,
} 
// Show initial player stats
document.querySelector('.playerStats').textContent = `\n Hull:${ussAssembly.hull} \n FirePower:${ussAssembly.firepower} \n Accuracy: ${ussAssembly.accuracy * 100}%`

// Factory that will generate random alien ship properties for AlienInvader class 
class createUFO {
    hullGenerator(min,max){
        return Math.round((Math.random() * (max - min) + min))
    }
    firepowerGenerator(min, max){
        return Math.round((Math.random() * (max - min) + min))
    }
    accuracyGenerator(min, max){
        return Math.round(10 * (Math.random() * (max - min) + min))/10;
    }
}

// Alien Invader class with random properties generated from UFO Factory 
class AlienInvader extends createUFO{
    hull = this.hullGenerator(3, 6) 
    firepower = this.firepowerGenerator(2, 4) 
    accuracy = this.accuracyGenerator(.6, .8) 
    enemiesLeft = aliens.length 
}

// Blank array to hold aliens
const aliens = []

// Loop to generate 6 alien enemies at random 
for (i=0; i<6; i++){
    aliens.push(new AlienInvader)
}

// Function that the event will use when a new alien invader is needed
function newAlien(){
    return aliens[0]
}

// Show initial enemy stats
document.querySelector('.enemyStats').textContent = `\n Hull:${aliens[0].hull} \n FirePower:${aliens[0].firepower} \n Accuracy: ${aliens[0].accuracy * 100}% \n Enemies: ${aliens.length}`

// Buttons to start the game/battle or retreat when prompted 
const battleBtn = document.querySelector('.button')
const retreatBtn = document.querySelector('.button2')

// Game title, instructions, and start message in the console 
console.log('%cWelcome to Space Battle!', 'font-size: xx-large; border: 4mm ridge #AAAAAA; padding: 5px')
console.log("%cUsing your spaceship: The USS Assembly, you're going to take on a fleet of 6 alien invaders; each possessing different health, firepower, and accuracy. With each battle, either you or the alien invader will come out on top. If the alien invader wins the battle, your hull is reduced by the amount of firepower the alien has and vice versa. The game is complete once you have defeated all 6 invaders OR the invaders have defeated you (your spaceship's hull hits 0). Let the Space Battle begin!", "border: 2mm ridge #AAAAAA; padding: 3px")
console.log("%cCLICK 'Battle!' BUTTON TO START", "font-size: large; border: thick double blue; padding: 2px")

// Event for retreating. If selecting to retreat, message displays and game is reset, otherwise, game continues on 
retreatBtn.addEventListener('click', ()=> {
    let choice = confirm('WHAT!? Earth NEEDS YOU! Are you sure you want to retreat?')
    if (choice === true){
        alert("Okay, fine. Alien's have won the space battle, but not the space war!")
        location.reload()
    } else {
        alert('Way to stay in the fight! Continue on to victory!')
    }
})

// Event below for battle 
    // Either:
        // Alien delivers hit and remaining player ship health is shown (when the player ship still has health), otherwise, game is reset 
    // Or:
        // Player spaceship delivers hits and remaining alien health shown (when alien ship still has health)
        // If no aliens left, game won and reset, otherwise, current invader is defeated, removed from the array, and then the next alien in the array is called 

battleBtn.addEventListener ('click', function battle(){ 
    retreatBtn.style.visibility = 'hidden' // re-hides retreat button shown by line 107 if player elects to continue battle after an alien is defeated 
    if ((Math.random() < aliens[0].accuracy) && (aliens[0].accuracy >= ussAssembly.accuracy)){ // The alien's accuracy must also be at or above the players to give player an advantage when their accuracy is higher than the current alien's
        ussAssembly.hull -= aliens[0].firepower // reduces and sets new hull total for player ship based on aliens firepower 
        if (ussAssembly.hull > 0){ 
            console.log (`%cOh no%c, you have been hit! Continue battle with %c${ussAssembly.hull}%c health remaining...`, `color: red; font-size: medium`,``, `color: red; font-size: medium`, ``)
            // player stat update
            document.querySelector('.playerStats').textContent = `\n Hull:${ussAssembly.hull} \n FirePower:${ussAssembly.firepower} \n Accuracy: ${ussAssembly.accuracy * 100}%` 
        } else { 
            alert('NOOOO! You have been defeated by the alien invaders! The aliens win this time...')
            location.reload() // refresh page
        }
    } else { 
        aliens[0].hull -= ussAssembly.firepower // reduces and sets new hull total for alien ship based on players firepower 
        if (aliens[0].hull > 0){ 
            console.log(`%cNice%c, you damaged the alien invader! The invader now has %c${aliens[0].hull}%c health remaining!`, `color: #55FF55; font-size: medium`, ``, `color: #55FF55; font-size: medium`, ``)
            // enemy stat update
            document.querySelector('.enemyStats').textContent = `\n Hull:${aliens[0].hull} \n FirePower:${aliens[0].firepower} \n Accuracy: ${aliens[0].accuracy * 100}% \n Enemies: ${aliens.length}`
        } else {
            aliens.shift() // removes defeated alien from aliens array 
            if (aliens.length === 0){
                alert("Congratulations, you've defeated all the alien invaders and saved Earth! Click 'OK' to save earth again!")
                location.reload() // refresh page   
            } else {
                console.log(`%cNice%c, you defeated an alien invader! %cHowever%c, you still have %c${aliens.length}%c left... Continue %cBATTLE%c to victory or %cRETREAT%c to fight another day?`, `color: #55FF55; font-size: medium`, ``, `color: red; font-size: medium`,``, `color: red; font-size: medium`, ``,`font-size: medium; color: #55FF55`, ``, `font-size: medium; color: red`, ``)
                newAlien() // calling function on line 45 
                // enemy stat update 
                document.querySelector('.enemyStats').textContent = `\n Hull:${aliens[0].hull} \n FirePower:${aliens[0].firepower} \n Accuracy: ${aliens[0].accuracy * 100}% \n Enemies: ${aliens.length}`
                retreatBtn.style.visibility = 'visible' // Player now given option to retreat 
            }
        }
    } 
})


