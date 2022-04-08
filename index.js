const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0, canvas.width, canvas.height)

const gravity = 0.7

class Sprite {

	constructor({position,velocity}){
		this.position = position
		this.velocity = velocity
		this.height = 150
		this.lastKey
	}
	draw(){
		c.fillStyle = 'red';
		c.fillRect(this.position.x, this.position.y, 50, this.height)
	}

	update(){
		this.draw()
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y


		if(this.position.y + this.height + this.velocity.y >= canvas.height){
			this.velocity.y= 0;
		}else 	this.velocity.y += gravity
	}
}

//Creacion de Personajes

const player = new Sprite({
position:{
	x:0,
	y:0
},
velocity:{
	x:0,
	y:0
  }
})

const player2 = new Sprite({
position:{
	x:400,
	y:100
},
velocity:{
	x:0,
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


//Animaciones
function animate(){
	window.requestAnimationFrame(animate)

	//limpiar la pantalla 
	c.fillStyle = 'black'
	c.fillRect(0,0,canvas.width, canvas.height)

	//Crear Sprite
	player.update();
	player2.update();

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
		

}


animate()

// AL PRESIONAR 
window.addEventListener('keydown', (event) =>{
	console.log(event);
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
	}

	console.log(event.key);

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
		breakd

		//PLAYER 2 TECLAS 
		case 'ArrowLeft':
		keys.ArrowLeft.pressed = false
		break

		case 'ArrowRight':
		keys.ArrowRight.pressed = false
		break
	}

	console.log(event.key);

})
