//variables
var bg, bgimg
var ss, ssimg
var alien, alien1, alien2, alien3, alien4, alien5, alien6, alien7, alien8
var score = 0
var gameState = "play"
var aliengroup, lasergroup
var laser
var edges
function preload() {
//loading images
    bgimg = loadImage("Assets/BG-1.jpg")
    ssimg = loadImage("Assets/Spaceship 10.png")
    alien1 = loadImage("Assets/Alien1.png")
    alien2 = loadImage("Assets/Alien2.png")
    alien3 = loadImage("Assets/Alien3.png")
    alien4 = loadImage("Assets/Alien4.png")
    alien5 = loadImage("Assets/Alien5.png")
    alien6 = loadImage("Assets/Alien6.png")
    alien7 = loadImage("Assets/Alien7.png")
    alien8 = loadImage("Assets/Alien8.png")
}
function setup() {
    createCanvas(1920,1080)
    bg = createSprite(800,350,1600,700)
    bg.addImage(bgimg)
    ss = createSprite(100,350)
    ss.addImage(ssimg)
    aliengroup = new Group();
    lasergroup = new Group();
}
function draw() {
    
    background(0);
    drawSprites()
    fill(255);
    textSize(30);
    text("Score: "+score,50,50)
    if(gameState==="play") {
        if(keyDown(UP_ARROW)) {
            ss.y-=5
        }
        if(keyDown(DOWN_ARROW)) {
            ss.y+=5
        }
        if(keyDown("space")) {
            releaseLaser()
        }
        if(aliengroup.isTouching(ss))
            gameState="end"
        lasergroup.isTouching(aliengroup, destroyalien)
        spawnAliens()
    }
    if(gameState=="end") {
        gameOver()
    }
    
}
function spawnAliens() {
    if(frameCount%150===0) {
        var rand = Math.round(random(100,600))
        alien=createSprite(2000,rand)
        alien.velocityX = -4
        var randimg = Math.round(random(1,8))
        switch(randimg) {
            case 1:
                alien.addImage(alien1)
                alien.velocityX=-12
                alien.scale = 0.75
                break
            case 2:
                alien.addImage(alien2) 
                alien.velocityX=-12 
                alien.scale = 0.75  
                break
            case 3:
                alien.addImage(alien3)
                alien.velocityX=-12
                alien.scale = 0.75
                break    
            case 4:
                alien.addImage(alien4)
                alien.velocityX=-12
                alien.scale = 0.75
                break
            case 5:
                alien.addImage(alien5)
                alien.velocityX=-12
                alien.scale = 0.75
                break
            case 6:
                alien.addImage(alien6)
                alien.velocityX=-12
                alien.scale = 0.75    
                break
            case 7:
                alien.addImage(alien7) 
                alien.velocityX=-12
                alien.scale = 0.75
                break
            case 8:
                alien.addImage(alien8)
                alien.velocityX=-12
                alien.scale = 0.75
                break


        }
         alien.lifetime = 400
        aliengroup.add(alien)
    }
}
function releaseLaser() {
    laser = createSprite(200,ss.position.y,60,5)
    laser.shapeColor = "red"
    laser.velocityX=10
    laser.lifetime = 160
    lasergroup.add(laser)

}
function destroyalien(laser, alien) {
    alien.destroy()
    lasergroup.destroyEach()
    score+=10
}
function gameOver() {
    aliengroup.destroyEach()  

swal({
    title:`Game over`,
    text:`You lost the game`,
    imageUrl:"Assets/capture.png",
    imageSize:"150x150",
    confirmButtonText:"Play again"
},
function (isConfirmed){
    if(isConfirmed) {
        location.reload()
    }
})
}