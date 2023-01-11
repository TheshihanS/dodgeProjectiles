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

console.log(player)

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
    this.imageSource= "./Images/background.png"
    this.image = new Image()
    this.image.src = imageSource
    c.drawImage(this.image, 0, 0);
    function drawBox(x, y){
        this.imageSource = "./Images/barrierSprite.png"
        this.image = new Image()
        this.image.src = imageSource
        c.drawImage(this.image, x, y);
    }
    this.boxHeight = 25
    this.boxWidth = 25
    for (let i = 350; i < canvas.width; i += 25) {
        drawBox(i, 75)
        drawBox(i, 700)
        if (i > 1199) {
            break
        }
    }
    for (let l = 75; l < canvas.height; l += 25) {
        drawBox(350, l)
        drawBox(1200, l)
        if (l > 674) {
            break
        }
    }
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



function distance(x1, x2, y1, y2, width, height) {
    var distance
    distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    return distance
}
function health (health) {
    this.imageSource = "./Images/playerSprite.png"
    this.image = new Image()
    this.image.src = imageSource
    if (health === 3) {
        c.drawImage(this.image, 1300, 50);
        c.drawImage(this.image, 1350, 50);
        c.drawImage(this.image, 1400, 50);
    } else if (health === 2) {
        c.drawImage(this.image, 1300, 50);
        c.drawImage(this.image, 1350, 50);
    } else if (health === 1) {
        c.drawImage(this.image, 1300, 50);
    }
}
//animation
var score

function animate() {
    window.requestAnimationFrame(animate)
    
    background()
    
    player.update()

    health(player.health.h)
    
    if (enemy.health.h > 0) {
        enemy.update()
    }
    if (projectile.health.h > 0) {
        projectile.update()
    }
    if (missile.health.h > 0) {
        missile.update()
    }
    
    
    var distanceCheck = distance(player.position.x, enemy.position.x, player.position.y, enemy.position.y)
    if (distanceCheck < 25) {
        player.health.h = player.health.h - enemy.health.h
        enemy.health.h = enemy.health.h - 1
        score--
    }
    if (enemy.health.h === 0 || enemy.position.x > canvas.width) {
        enemy.health.h = 1
        enemy.position.x = 0
        enemy.position.y = (Math.random() * 550) + 100
        score++
    }
    
    distanceCheck = distance(player.position.x, projectile.position.x, player.position.y, projectile.position.y)
    if (distanceCheck < 25) {
        player.health.h = player.health.h - projectile.health.h
        projectile.health.h = projectile.health.h - 1
        score--
    }
    if (projectile.health.h === 0 || projectile.position.x > canvas.width) {
        projectile.health.h = 1
        projectile.position.x = 0
        projectile.position.y = (Math.random() * 550) + 100
        score++
    }
    
    distanceCheck = distance(player.position.x, missile.position.x, player.position.y, missile.position.y, missile.dimensions.height, missile.dimensions.width)
    
    
    if (player.position.x < missile.position.x + 100 && player.position.x + 12.5 > missile.position.x && player.position.y > missile.position.y && player.position.y + 12.5 < missile.position.y + 50 || distanceCheck < 25) {
        player.health.h = player.health.h - missile.health.h
        missile.health.h = missile.health.h - 1
        score--
    }
    if (missile.health.h === 0 || missile.position.x > canvas.width) {
        missile.health.h = 1
        missile.position.x = 0
        missile.position.y = player.position.y - 12.5
        score++
    }
    
    
    player.velocity.x = 0
    player.velocity.y = 0
    
    enemy.velocity.x = 0
    enemy.velocity.y = 0
    
    projectile.velocity.x = 0
    projectile.velocity.y = 0
    
    
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
    
    enemy.velocity.x = 6
    projectile.velocity.x = 10
    missile.velocity.x = 12
    
     
    
}

animate()

//determining which key is pressed
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
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

//problems to fix checklist
//need a projectile to get character so the character cannot stand still (done)
//add sprites (done)
//display health to user
//display score to user