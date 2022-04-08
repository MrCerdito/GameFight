function rectangularCollision({rectangle1, rectangle2}){
return(
	player.attackBox.position.x + player.attackBox.width >= player2.attackBox.position.x && 
	player.attackBox.position.x <= player2.position.x + player2.width &&
	player.attackBox.position.y + player.attackBox.height >= player2.position.y &&
	player.attackBox.position.y <= player2.position.y + player2.height)


}
function determineWinner({player, player2, timerId}) {
	clearTimeout(timerId)
	document.querySelector('#displayText').style.display = 'flex'
	if(player.health === player2.health){
		document.querySelector('#displayText').innerHTML = 'EMPATE'
	} else if(player.health > player2.health){
			document.querySelector('#displayText').innerHTML = 'GANA JUGADOR 1'
	}else if(player.health < player2.health){
		document.querySelector('#displayText').innerHTML = 'GANA JUGADOR 2'

	}
}
//TIEMPO
let timer = 60
let timerId
function decreaseTimer() {
	
	if(timer>0){
	timerId = setTimeout(decreaseTimer,1000)
	timer--
	document.querySelector('#timer').innerHTML = timer
	}

	if(timer === 0){
		determineWinner({player,player2,timerId})
	}


}