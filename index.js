const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0, canvas.width, canvas.height)

const gravity = 0.7


const background = new Sprite({
	position:{
		x:0,
		y:0
	},
	imageSrc: './img/Background.png'
})


//Creacion de Personajes

const player = new Fight({
position:{
	x:100,
	y:100
},
velocity:{
	x:0,
	y:0
  },
  offset:{
  	x:0,
  	y:0
  },
  imageSrc: './img/Goblin/Idle.png',
  framesMax: 4,
  scale: 3.5,
  offset:{
  	x:215,
  	y:157
  },
  sprites:{
  	idle:{
  		 imageSrc: './img/Goblin/Idle.png',
  		 framesMax:4
  	},
  	run:{
  		 imageSrc: './img/Goblin/Run.png',
  		 framesMax:8,
  		 image: new Image()
  	},
  	jump:{
  		 imageSrc: './img/Goblin/Run.png',
  		 framesMax:8,
  		 image: new Image()
  	},
  	fall:{
  		 imageSrc: './img/Goblin/Run.png',
  		 framesMax:8,
  		 image: new Image()
  	},
  	attack1:{
  		 imageSrc: './img/Goblin/Attack.png',
  		 framesMax:8,
  		 image: new Image()
  	},
  	takeHit:{
  		 imageSrc: './img/Goblin/Hit.png',
  		 framesMax:4,
  		 image: new Image()
  	},
  	death:{
  		 imageSrc: './img/Goblin/Death.png',
  		 framesMax:4,
  		 image: new Image()
  	}
  },
  attackBox:{
  	offset:{
  		x:100,
  		y:100
  	},
  	width:100,
  	height: 50
  }
})

const player2 = new Fight({
position:{
	x:800,
	y:100
},
velocity:{
	x:0,
	y:0
  },
  offset:{
  	x:-50,
  	y:0
  },
  imageSrc: './img/Skeleton/Idle.png',
  framesMax: 4,
  scale: 3.5,
  offset:{
  	x:215,
  	y:157
  },
  sprites:{
  	idle:{
  		 imageSrc: './img/Skeleton/Idle.png',
  		 framesMax:4
  	},
  	run:{
  		 imageSrc: './img/Skeleton/Walk.png',
  		 framesMax:4,
  		 image: new Image()
  	},
  	jump:{
  		 imageSrc: './img/Skeleton/Run.png',
  		 framesMax:8,
  		 image: new Image()
  	},
  	fall:{
  		 imageSrc: './img/Skeleton/Run.png',
  		 framesMax:8,
  		 image: new Image()
  	},
  	attack1:{
  		 imageSrc: './img/Skeleton/Attack.png',
  		 framesMax:8,
  		 image: new Image()
  	},
  	takeHit:{
  		 imageSrc: './img/Skeleton/Hit.png',
  		 framesMax:4,
  		 image: new Image()
  	},
  	death:{
  		 imageSrc: './img/Skeleton/Death.png',
  		 framesMax:4,
  		 image: new Image()
  	}
  },
  attackBox:{
  	offset:{
  		x:-110,
  		y:100
  	},
  	width:100,
  	height: 50
  }
})



//Teclas que se van a usar

const keys = {
	a: {
		pressed:false
	},
	d:{
		pressed:false
	},
	ArrowLeft:{
		pressed:false
	},
	ArrowRight:{
		pressed:false
	}
}



decreaseTimer()

//Animaciones
function animate(){
	window.requestAnimationFrame(animate)

	//limpiar la pantalla 
	c.fillStyle = 'black'
	c.fillRect(0,0,canvas.width, canvas.height)
	//CrearFondo
	background.update();
	//Crear Sprite
	player.update();
	player2.update();

	player.velocity.x = 0
	player2.velocity.x = 0

	//CONTROL PLAYER 1

	if(keys.a.pressed && player.LastKey === 'a'){
		player.velocity.x = -5
		player.switchSprite('run')


	}else if(keys.d.pressed && player.LastKey === 'd'){
		player.velocity.x = 5
		player.switchSprite('run')
	}else{
		player.switchSprite('idle')
	}
	


	//salto y caida
	if(player.velocity.y < 0 ){
		//Sprite salto
	}else if (player.velocity.y > 0){
		//Sprite caida
	}





	//CONTROL PLAYER 2	

	if(keys.ArrowLeft.pressed && player2.LastKey === 'ArrowLeft'){
		player2.velocity.x = -5
		player2.switchSprite('run')
		
	}else if(keys.ArrowRight.pressed && player2.LastKey === 'ArrowRight'){
		player2.velocity.x = 5
		player2.switchSprite('run')
	}else{
		player2.switchSprite('idle')
	}



	//ATAQUE PLAYER
	if(rectangularCollision({
		rectangle1:player,
		rectangle2:player2
	}) && player.isAttacking && player.framesCurrent === 5){
		player2.takeHit();
		player.isAttacking = false
		document.querySelector('#HealthP2').style.width = player2.health + '%'
	}


	//no golpe
	if(player.isAttacking && player.framesCurrent === 5){
		player.isAttacking = false
	}



	//ATAQUE PLAYER 2 Y RECIBIENDO ATAQUE
		if(rectangularCollision({
		rectangle1:player2,
		rectangle2:player
	}) && player2.isAttacking && player2.framesCurrent === 4) {
		player.takeHit();
		player2.isAttacking = false
		document.querySelector('#HealthP').style.width = player.health + '%'
	}


	//no golpe
	if(player2.isAttacking && player2.framesCurrent === 5){
		player2.isAttacking = false
	}


	if(player.health <= 0 || player2.health <= 0){
		determineWinner({player,player2,timerId})
	}

		

}


animate()

// AL PRESIONAR 
window.addEventListener('keydown', (event) =>{
//PLAYER 1 TECLAS
	if(!player.dead){
		switch (event.key){
			
			case 'd':
			keys.d.pressed = true
			player.LastKey = 'd'
			break

			case 'a':
			keys.a.pressed = true
			player.LastKey = 'a'
			break

			case 'w':
			if(player.velocity.y === 0){
				player.velocity.y = -10;
			}
			break

			case ' ':
			player.attack()
			break

	}

}
	if(!player2.dead){
		switch (event.key){
			case 'ArrowLeft':
			keys.ArrowLeft.pressed = true
			player2.LastKey = 'ArrowLeft'
			break

			case 'ArrowRight':
			keys.ArrowRight.pressed = true
			player2.LastKey = 'ArrowRight'
			break

			case 'ArrowUp':
			if(player2.velocity.y === 0){
				player2.velocity.y = -10;
			}
			break
			case '1':
			player2.attack()
			break
	}
	
		
}

})

// AL SOLTAR
window.addEventListener('keyup', (event) =>{
	switch (event.key){

		//PLAYER 1 TECLAS
		case 'd':
		keys.d.pressed = false
		break
		
		case 'a':
		keys.a.pressed = false
		break

		

		//PLAYER 2 TECLAS 
		case 'ArrowLeft':
		keys.ArrowLeft.pressed = false
		break

		case 'ArrowRight':
		keys.ArrowRight.pressed = false
		break

		
	}

})
