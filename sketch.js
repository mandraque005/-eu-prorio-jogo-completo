var cenario,cenarioImg
var barco_luffy, barco_luffyImg
var barco_barba_negra,barco_barba_negraImg
var recompensa,recompensaImg
var grupo_inimigo
var grupo_amigo 
var pontos = 0 
var vidas = 3
var gameState='play'

function preload(){
 cenarioImg=loadImage("sea.png")
barco_luffyImg=loadImage("luffy.png")
barco_barba_negraImg=loadImage("pirata2.png") 
recompensaImg=loadImage("bau (1).png")

}

function setup() {
    createCanvas(windowWidth,windowHeight);

    cenario= createSprite(width/2,height/2)
    cenario.addImage(cenarioImg)
    cenario.scale=1
    cenario.velocityX=-5;
  
    barco_luffy= createSprite(200,height-300)
    barco_luffy.addImage(barco_luffyImg)
    barco_luffy.scale=0.35
    
    grupo_inimigo=new Group()
    grupo_amigo=new Group()
}

function draw() {
    background("black")

    if(cenario.x<200){
        cenario.x=width/2
    }

    barco_luffy.x=mouseX;
    barco_luffy.y=mouseY;
    //console.log(barco_luffy.y)
    
    if(barco_luffy.y <=height-450){
        barco_luffy.y=height-450
    }

    if(barco_luffy.y >=height-100){
        barco_luffy.y=height-100
    }
    gerarInimigos();
    gerarRecompensa();

    if (grupo_inimigo.isTouching(barco_luffy)){
        if(vidas>0){
            vidas=vidas-1
            barco_barba_negra.destroy();
        }else{
            gameState="end"
        }
    }
    if (grupo_amigo.isTouching(barco_luffy)){
        pontos=pontos+5
        recompensa.destroy();
        
    }
    drawSprites();
    if(gameState=="end"){
        
        grupo_amigo.destroyEach();
        grupo_inimigo.destroyEach();
        cenario.velocityX=0
        
        textSize(40)
        fill("black")
        text("gameOver",width/2,height/2)

    }
    
    textSize(40)
    fill("black")
    text("vidas: "+vidas,width-200,150)
    text("pontos: "+pontos,width-200,100)
}


function gerarInimigos (){
    if(frameCount%60===0){
        barco_barba_negra=createSprite(width+100,Math.round(random(height-450,height-100)))
        barco_barba_negra.addImage(barco_barba_negraImg)
        barco_barba_negra.scale=0.25
        barco_barba_negra.velocityX=-5;
        grupo_inimigo.add(barco_barba_negra)
        barco_barba_negra.lifetime = width/5
    }
    
} 

function gerarRecompensa (){
    if(frameCount%120===0){
        recompensa=createSprite(width+100,Math.round(random(height-450,height-100)))
        recompensa.addImage(recompensaImg)
        recompensa.scale=0.25
        recompensa.velocityX=-5;
        grupo_amigo.add(recompensa)
        recompensa.lifetime = width/5

    }
    
} 