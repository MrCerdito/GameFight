const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0, canvas.width, canvas.height)

const gravity = 0.7

class Sprite {

	constructor({position,velocity, color = 'red', offset}){
		this.position = position
		this.velocity = velocity
		this.width = 50
		this.height = 150
		this.lastKey
		this.attackBox = {
			position: {
				x: this.position.x,
				y: this.position.y

			},
			offset,
			width: 100,
			height: 50

		}
		this.color = color
		this.isAttacking 
	}
	draw(){
		c.fillStyle = this.color;
		c.fillRect(this.position.x, this.position.y,this.width, this.height)

		//CAJA ATAQUE
		if(this.isAttacking){
		c.fillStyle = 'green'
		c.fillRect(this.attackBox.position.x, 
			this.attackBox.position.y,
			this.attackBox.width, 
			this.attackBox.height )
		}
		
	}

	update(){
		this.draw()
		this.attackBox.position.x = this.position.x + this.attackBox.offset.x
		this.attackBox.position.y = this.position.y

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y


		if(this.position.y + this.height + this.velocity.y >= canvas.height){
			this.velocity.y= 0;
		}else 	this.velocity.y += gravity
	}

	//ATACANDO 
	attack(){
		this.isAttacking = true
		setTimeout(()=>{
			this.isAttacking = false
		},100)

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
  },
  offset:{
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

function rectangularCollision({rectangle1, rectangle2}){
return(
	player.attackBox.position.x + player.attackBox.width >= player2.attackBox.position.x && 
	player.attackBox.position.x <= player2.position.x + player2.width &&
	player.attackBox.position.y + player.attackBox.height >= player2.position.y &&
	player.attackBox.position.y <= player2.position.y + player2.height)


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



	//ATAQUE PLAYER
	if(rectangularCollision({
		rectangle1:player,
		rectangle2:player2
	}) && player.isAttacking){
		player.isAttacking = false
		console.log("ATACADO");
	}
	//ATAQUE PLAYER 2
	if(rectangularCollision({
		rectangle1:player2,
		rectangle2:player
	}) && player2.isAttacking){
		player2.isAttacking = false
		console.log("ATACADO PLAYER2");
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
