document.querySelector(".floor-switch__close").onclick = ()=>{
    floor_switch.style = "display:none;"
    player.canMove = true;
}


document.querySelectorAll(".floor-switch__variant").forEach(variant =>{
    variant.onclick = ()=>{
        player.canMove = true;
        console.log(variant.textContent)
        player.floor = variant.textContent
        if (player.trigger.pavillion == 1) player.floor++;
        floor_switch.style = "display:none;"
    }
});