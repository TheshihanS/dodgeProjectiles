//Theshihan S
//2023-01-09
//Dodge projectiles game

  //////////////////////////////
 //// Declaring the canvas ////
//////////////////////////////
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//setting the width to 1800
canvas.width = 1800
//setting the height to 850
canvas.height = 850
//displaying the canvas to the screen
c.fillRect(0, 0, canvas.width, canvas.height);

  //////////////////////////
 //// Creating a class ////
//////////////////////////
//Instead of using function for my projectiles i wanted to try using a class
class Sprite {
    constructor({position, velocity, health, dimensions, imageSource}) {
        this.position = position
        this.velocity = velocity
        this.health = health
        this.dimensions = dimensions
        this.image = new Image()
        this.image.src = imageSource
    }
    //drawing player to the screen
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
    //updates the player (makes him move by adding velocity)
    update() {
        //invoking the draw method
        this.draw()
        //adding velocity to the position so the character can move
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}
  ///////////////////////////////////////
 //// Creating the player & enemies ////
///////////////////////////////////////
//declaring a const named "player" using the Sprite class created above, the user will be able to control this character
const player = new Sprite({
    //x & y position of player
    position: {
        x: 775,
        y: 400
    },
    //velocity of the player, starts at zero because he hasn't started moving yet
    velocity: {
        x: 0,
        y: 0
    },
    //starts with a health of three
    health: {
        h: 3
    },
    dimensions: {
        height: 25,
        width: 25
    },
    imageSource:  './Images/playerSprite.png'
})

//declaring a const named "laser" using the Sprite class created above, laser will be one of the "enemies" that the player must dodge
const enemy = new Sprite ({
    //
    position: {
        x: 0,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    health: {
        h: 1
    },
    dimensions: {
        height: 25,
        width: 25
    },
    imageSource:  './Images/enemySprite.png'
})
//declaring a const named "projectile" using the Sprite class created above.
//projectile will be one of the "enemies" that the player must dodge and will be moving at a faster rate
const projectile = new Sprite ({
    
    position: {
        x: 0,
        y: 200
    },
    velocity: {
        x: 0,
        y: 0
    },
    health: {
        h: 1
    },
    dimensions: {
        height: 10,
        width: 25
    },
    imageSource:  './Images/projectileSprite.png'
})
const missile = new Sprite ({
    
    position: {
        x: 0,
        y: player.position.y - 12.5
    },
    velocity: {
        x: 0,
        y: 0
    },
    health: {
        h: 1
    },
    dimensions: {
        height: 50,
        width: 100
    },
    imageSource:  './Images/missileSprite.png'
})



//creating variable for the last key pressed(future potential to make the keys better) //unused for now
let lastKey



const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    space: { //adding space if i want to add a powerup or ability
        pressed: false
    }
}

//background 
function background() {
    //importing background
    this.imageSource= "./Images/background.png"
    this.image = new Image()
    this.image.src = imageSource
    c.drawImage(this.image, 0, 0);
    function drawBox(x, y){
        //importing my image for each block
        this.imageSource = "./Images/barrierSprite.png"
        this.image = new Image()
        this.image.src = imageSource
        c.drawImage(this.image, x, y);
    }
    //drawing the box horizontal
    for (let i = 350; i < canvas.width; i += 25) {
        drawBox(i, 75)
        drawBox(i, 700)
        if (i > 1199) {
            break
        }
    }
    //drawing the box vertical
    for (let l = 75; l < canvas.height; l += 25) {
        drawBox(350, l)
        drawBox(1200, l)
        if (l > 674) {
            break
        }
    }
    //putting movement restrictions on the player 
    if (player.position.x < 375) {
        player.velocity.x = 0
        player.position.x = 375
    } else if (player.position.x > 1175) {
        player.velocity.x = 0
        player.position.x = 1175
    }
    if (player.position.y < 100) {
        player.velocity.y = 0
        player.position.y = 100
    } else if (player.position.y > 675) {
        player.velocity.y = 0
        player.position.y = 675
    }
}
function gameOver() {
    //displays the gameOver screen
    this.imageSource = "./Images/gameOver.png"
    this.image = new Image()
    this.image.src = imageSource
    c.drawImage(this.image, 0, 0);
}

function drawScore(score) {
    //displaying score to the user
    c.fillStyle = "white"
    c.font = "30px Courier";
    c.fillText( "Score: " + score , 200, 30);
}


function distance(x1, x2, y1, y2, width, height) {
    var distance
    //using distance formula
    distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    //returning the distance
    return distance
}

function drawHealth (health) {
    //importing my image 
    this.imageSource = "./Images/playerBigSprite.png"
    this.image = new Image()
    this.image.src = imageSource
    if (health === 3) {
        //drawing a "heart" to represent hp
        c.drawImage(this.image, canvas.width / 2 - 20, canvas.height - 100);
        c.drawImage(this.image, canvas.width / 2 - 95, canvas.height - 100);
        c.drawImage(this.image, canvas.width / 2 - 170 , canvas.height - 100);
    } else if (health === 2) {
        c.drawImage(this.image, canvas.width / 2 - 20, canvas.height - 100);
        c.drawImage(this.image, canvas.width / 2 - 95, canvas.height - 100);
    } else if (health === 1) {
        c.drawImage(this.image, canvas.width / 2- 20, canvas.height - 100);
    }
}
//animation
var score = 0
  ///////////\\\\\\\\\\\\--------------------------
 ////ANIMATE FUNCTION \\\\|||||||||||||||||||||||||
///////////   \\\\\\\\\\\\\------------------------

/**
 * Constantly animates whatever is in this function
 * @returns {undefined}
 */
function animate() {
    window.requestAnimationFrame(animate)
    var increaseSpeed = score / 10
    
    //invoking my background
    background()
    //constantly updating the player
    player.update()
    //invoking my health function
    drawHealth(player.health.h)
    
    
    //only updating the enemies if they are "alive"
    if (enemy.health.h > 0) {
        enemy.update()
    }
    if (projectile.health.h > 0) {
        projectile.update()
    }
    if (missile.health.h > 0) {
        missile.update()
    }
    
    //checking distance
    var distanceCheck = distance(player.position.x, enemy.position.x, player.position.y, enemy.position.y)
    //if its close to 25 pixel, even though it calculates distance from the top right, the enemy is moving too fast to notice
    if (distanceCheck < 25) {
        player.health.h = player.health.h - enemy.health.h
        enemy.health.h = enemy.health.h - 1
    }
    //if it "dies" it resets(, if it goes off the screen it resets and a player gains a point
    if (enemy.health.h === 0 || enemy.position.x > canvas.width) {
        enemy.health.h = 1
        enemy.position.x = 0
        enemy.position.y = (Math.random() * 550) + 100
        //after the player "dies" no longer adding to the score
        if (player.health.h >= 0) {
            score++
            
        }
        
    }
    //finding distance by invoking my distance function
    distanceCheck = distance(player.position.x, projectile.position.x, player.position.y, projectile.position.y)
    //if its close to 25 pixel, even though it calculates distance from the top right, the enemy is moving too fast to notice
    if (distanceCheck < 25) {
        player.health.h = player.health.h - projectile.health.h
        projectile.health.h = projectile.health.h - 1
    }
    //same conditions mentioned above
    if (projectile.health.h === 0 || projectile.position.x > canvas.width) {
        projectile.health.h = 1
        projectile.position.x = 0
        projectile.position.y = (Math.random() * 650) + 100
        if (player.health.h >= 0) {
            score++
            
        }
        
        
    }
    
    distanceCheck = distance(player.position.x, missile.position.x, player.position.y, missile.position.y, missile.dimensions.height, missile.dimensions.width)
    
    //using a bunch of conditions
    if (player.position.x < missile.position.x + 100 && player.position.x + 12.5 > missile.position.x && player.position.y > missile.position.y && player.position.y + 12.5 < missile.position.y + 50 || distanceCheck < 25) {
        player.health.h = player.health.h - missile.health.h
        missile.health.h = missile.health.h - 1
    }
    //same conditions mentioned above
    if (missile.health.h === 0 || missile.position.x > canvas.width) {
        missile.health.h = 1
        missile.position.x = 0
        missile.position.y = player.position.y - 12.5
        
        if (player.health.h >= 0) {
            score++
            
        }
        
    }
    
    
    player.velocity.x = 0
    player.velocity.y = 0
    
    enemy.velocity.x = 0
    enemy.velocity.y = 0
    
    projectile.velocity.x = 0
    projectile.velocity.y = 0
    
    //if said key such as a,d,w,s is pressed the character would move in their respectable direction
    if (keys.a.pressed) {
        player.velocity.x = -3;
    }
    if (keys.d.pressed) {
        player.velocity.x = 3;
    }
    if (keys.w.pressed) {
        player.velocity.y = -3;
    }
    if (keys.s.pressed) {
        player.velocity.y = 3;
    }
    
    enemy.velocity.x = 8 + increaseSpeed
    projectile.velocity.x = 10 + increaseSpeed
    missile.velocity.x = 12 + increaseSpeed
    //draws the score when the palyer is alive
    if (player.health.h >= 0) {
        drawScore(score)
    }
    //draws the score in the top right if the player hasn't "died" yet
     if (player.health.h < 0) {
        gameOver()
        c.fillStyle = "red"
        c.font = "30px Courier";
        c.fillText( "Your score was: " + score , canvas.width / 2 - 200, 750);
    }
    
    
}

animate()

//determining which key is pressed
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            //last key if i wanted to improve the controls in the future
            lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case ' ':
            keys.space.pressed = true
            break
    }
    console.log(event.key)
})
//indicates when key is realeased 
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case ' ':
            keys.space.pressed = false
            break
    }
    console.log(event.key)
})

//problems to fix checklist T_T
//need a projectile to get character so the character cannot stand still (done)
//add sprites (done)
//display health to user (done)
//display score to user (done)
//commment :D (done?)