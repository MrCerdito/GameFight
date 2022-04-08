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
	x:0,
	y:0
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
  scale: 5,
  offset:{
  	x:215,
  	y:180
  }
})

const player2 = new Fight({
position:{
	x:400,
	y:100
},
velocity:{
	x:0,
	y:0
  },
  color: 'blue',
  offset:{
  	x:-50,
  	y:0
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
	//player2.update();

	player.velocity.x = 0
	player2.velocity.x = 0

	//CONTROL PLAYER 1

	if(keys.a.pressed && player.LastKey === 'a'){
		player.velocity.x = -10
		
	}else if(keys.d.pressed && player.LastKey === 'd'){
		player.velocity.x = 10
	}
	

	//CONTROL PLAYER 2	

	if(keys.ArrowLeft.pressed && player2.LastKey === 'ArrowLeft'){
		player2.velocity.x = -10
		
	}else if(keys.ArrowRight.pressed && player2.LastKey === 'ArrowRight'){
		player2.velocity.x = 10
	}



	//ATAQUE PLAYER
	if(rectangularCollision({
		rectangle1:player,
		rectangle2:player2
	}) && player.isAttacking){
		player.isAttacking = false
		player2.health -= 5
		document.querySelector('#HealthP2').style.width = player2.health + '%'
	}
	//ATAQUE PLAYER 2
	if(rectangularCollision({
		rectangle1:player2,
		rectangle2:player
	}) && player2.isAttacking){
		player2.isAttacking = false
		player.health -= 5
		document.querySelector('#HealthP').style.width = player.health + '%'
	}


	if(player.health <= 0 || player2.health <= 0){
		determineWinner({player,player2,timerId})
	}

		

}


animate()

// AL PRESIONAR 
window.addEventListener('keydown', (event) =>{
	switch (event.key){
		//PLAYER 1 TECLAS
		case 'd':
		keys.d.pressed = true
		player.LastKey = 'd'
		break

		case 'a':
		keys.a.pressed = true
		player.LastKey = 'a'
		break

		case 'w':
		player.velocity.y = -10;
		break

		case ' ':
		player.attack()
		break


		//PLAYER 2 TECLAS

		case 'ArrowLeft':
		keys.ArrowLeft.pressed = true
		player2.LastKey = 'ArrowLeft'
		break

		case 'ArrowRight':
		keys.ArrowRight.pressed = true
		player2.LastKey = 'ArrowRight'
		break

		case 'ArrowUp':
		player2.velocity.y = -10;
		break

		case '1':
		player2.attack()
		break
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
