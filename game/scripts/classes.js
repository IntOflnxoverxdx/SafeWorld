function angle(cx, cy, ex, ey) {
    let dy = ey - cy;
    let dx = ex - cx;
    let theta = Math.atan2(dy, dx);
    return theta;
}
function collision([x1,y1,w1,h1],[x2,y2,w2,h2]){
    var XColl=false;
    var YColl=false;
  
    if ((x1 + w1 >= x2) && (x1 <= x2 + w2)) XColl = true;
    if ((y1 + h1 >= y2) && (y1 <= y2 + h2)) YColl = true;
  
    if (XColl&YColl){return true;}
    return false;
  }


const floor_switch =  document.querySelector(".floor-switch")
let mousePos = {x:0,y:0};
const r2 = Math.SQRT2


class Player{
    constructor(){
        this.size = 80
        this.width = this.size;
        this.height = this.size;
        this.animation_speed = 10;
        this.hitbox = [0,0,this.width,this.height];
        this.x = 8600;
        this.y = 1170;
        this.canMove = true;
        this.floor = 2;




        this.camera_hitbox =  [-170,-132,170,132];
        this.camera_stable = 0

        this.offsetX = 0;
        this.offsetY = 0;

        this.legs = [];

        
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
        this.legs_frame = 0;
        this.legs_angle = 0;
        this.canJump = true;

        this.last_collision = {x:0,y:0};
        this.speed = 500;
        this.current_speed = this.speed;



        this.torso = Object.assign(new Image(), { src: `game/sprites/player/torso.png`, width: 25, height: 26});
        
        


        for (let i = 1; i <= 8; i++) {
            this.legs.push(Object.assign(new Image(), { src: `game/sprites/player/legs/${i}.png`, width: 25, height: 26}));
        }
    }
    play_torso(){
        this.torso_canvas = document.createElement("canvas");
        this.torso_canvas.width = 25;
        this.torso_canvas.height = 25;
        this.torso_canvas_context = this.torso_canvas.getContext("2d");
        this.torso_canvas_context.webkitImageSmoothingEnabled = false;
        this.torso_canvas_context.mozImageSmoothingEnabled = false;
        this.torso_canvas_context.imageSmoothingEnabled = false;
        this.torso_canvas_context.clearRect(0,0,this.torso_canvas.width,this.torso_canvas.height);
        this.torso_canvas_context.translate(this.torso_canvas.width/2, this.torso_canvas.height/2);
        this.torso_canvas_context.rotate(angle(this.x+this.width/2,this.y+this.height/2,mousePos.x,mousePos.y));
        this.torso_canvas_context.translate(-this.torso_canvas.width/2, -this.torso_canvas.height/2);
        this.torso_canvas_context.drawImage(this.torso, 0, 0, this.torso_canvas.width, this.torso_canvas.height);
        
    }
    play_legs(){
        this.legs_canvas = document.createElement("canvas");
        this.legs_canvas.width = 86;
        this.legs_canvas.height = 86;
        this.legs_canvas_context = this.legs_canvas.getContext("2d");
        this.legs_canvas_context.webkitImageSmoothingEnabled = false;
        this.legs_canvas_context.mozImageSmoothingEnabled = false;
        this.legs_canvas_context.imageSmoothingEnabled = false;
        this.legs_canvas_context.clearRect(0,0,this.legs_canvas.width,this.legs_canvas.height);
        this.legs_canvas_context.translate(this.legs_canvas.width/2, this.legs_canvas.height/2);
        this.legs_canvas_context.rotate(this.legs_angle);
        this.legs_canvas_context.translate(-this.legs_canvas.width/2, -this.legs_canvas.height/2);
        this.legs_canvas_context.drawImage(this.legs[this.legs_frame], 0, this.legs_canvas.height*29/172, this.legs_canvas.width, this.legs_canvas.height/86*57);
    }
    play_animation(){
        this.ctx.fillStyle = "black"
        this.play_torso();
        this.play_legs();
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.ctx.drawImage(this.legs_canvas,0,0,this.width,this.height);
        this.ctx.drawImage(this.torso_canvas,0,0,this.width,this.height);




        return this.canvas;
    }

    move(keys,dtime,dt){
        
        if (rendered_walls.length > 0){
            rendered_walls.sort((a,b)=>{
                let x1 = Math.sqrt(Math.pow(a.x - this.offsetX+a.width/2-this.x+this.width/2,2)+Math.pow(a.y - this.offsetY+a.height/2-this.y+this.height/2,2));
                let y1 = Math.sqrt(Math.pow(b.x - this.offsetX+b.width/2-this.x+this.width/2,2)+Math.pow(b.y - this.offsetY+b.height/2-this.y+this.height/2,2));
                if(x1>y1){return 1;} 
                if(x1<y1){return -1;}
                return 0;
            })
        }
        let collisions = 0;
        map[this.floor].triggers.forEach((trigger,i) =>{
            if (collision([this.x,this.y,this.width,this.height],[trigger.x - this.offsetX,trigger.y - this.offsetY,trigger.tile_size*trigger.width,trigger.tile_size*trigger.height])){
                collisions ++;
                if (this.canJump == true){
                    this.canJump = false;
                    floor_switch.style = "display:grid";
                    this.canMove = false;
                    this.trigger = trigger
                    if (trigger.pavillion == 1){
                        document.querySelectorAll(".floor-switch__variant").forEach((v,i) => {
                            if (i == 4){
                                v.style = "display:none;"
                            }
                        })
                    }
                    else if (trigger.pavillion == 0){
                        document.querySelectorAll(".floor-switch__variant").forEach((v,i) => {
                            v.style = "display:flex;"
                        })
                    }
                }
            }
        })
        if (collisions == 0){
            this.canJump = true;
        }
        
        this.nearest_walls = rendered_walls.slice(0,16)
        if (this.canMove){

            if (keys[controls["right"]]){
                this.legs_angle = 0;
                this.x += this.current_speed*dt;
                this.nearest_walls.forEach(wall => {
                    if (collision([this.x,this.y,this.width,this.height],[wall.x - this.offsetX,wall.y - this.offsetY,wall.width,wall.height])){
                        this.x -= this.current_speed*dt;
                    }
                });
                
                
            }
            if (keys[controls["left"]]){
                this.x -= this.current_speed*dt;
                this.legs_angle = 2*Math.PI
                this.nearest_walls.forEach(wall => {
                    if (collision([this.x,this.y,this.width,this.height],[wall.x - this.offsetX,wall.y - this.offsetY,wall.width,wall.height])){
                        this.x += this.current_speed*dt; 
                    }
                });
            }
            if (keys[controls["up"]]){
                this.y -= this.current_speed*dt;
                this.legs_angle = Math.PI/2;
                this.nearest_walls.forEach(wall => {
                    if (collision([this.x,this.y,this.width,this.height],[wall.x - this.offsetX,wall.y - this.offsetY,wall.width,wall.height])){
                        this.y += this.current_speed*dt; 
                    }
                });
            }
            if (keys[controls["down"]]){
                this.legs_angle = Math.PI/2;
                this.y += this.current_speed*dt;
                this.nearest_walls.forEach(wall => {
                    if (collision([this.x,this.y,this.width,this.height],[wall.x - this.offsetX,wall.y - this.offsetY,wall.width,wall.height])){
                        this.y -= this.current_speed*dt;
                    }
                });
            }
        }
        
        if (keys[controls["down"]]&&keys[controls["left"]]||keys[controls["up"]]&&keys[controls["right"]]){
            this.legs_angle = 3*Math.PI/4;
        }
        else if (keys[controls["down"]]&&keys[controls["right"]]||keys[controls["up"]]&&keys[controls["left"]]){
            this.legs_angle = Math.PI/4;
            
        }
        
        
        if (!keys[controls["right"]]&&!keys[controls["left"]]&&!keys[controls["up"]]&&!keys[controls["down"]]){
            this.legs_frame = 3;
            this.legs_angle = angle(this.x+this.width/2,this.y+this.height/2,mousePos.x,mousePos.y);
        }
        else{
            this.legs_frame = Math.floor(dtime*this.animation_speed%8);
        }
        

        if (this.x <= canvas.width/2 + this.camera_hitbox[0]){
            this.offsetX -= this.current_speed*dt;
            this.x += this.current_speed*dt;
        }
        else if (this.x + this.width >= canvas.width/2 + this.camera_hitbox[2]){
            this.offsetX += this.current_speed*dt;
            this.x -= this.current_speed*dt;
        }
        if (this.y <= canvas.height/2 + this.camera_hitbox[1]){
            this.offsetY -= this.current_speed*dt;
            this.y += this.current_speed*dt;
        }
        if (this.y + this.height >= canvas.height/2 + this.camera_hitbox[3]){
            this.offsetY += this.current_speed*dt;
            this.y -= this.current_speed*dt;
        }


       
        if (!this.camera_stable){
            this.offsetX = this.x - canvas.width/2 + this.width;
            this.x = canvas.width/2 - this.width;

            this.offsetY = this.y - canvas.height/2 + this.height;
            this.y = (canvas.height/2 - this.height);
            this.camera_stable = true;
        }
       
        this.current_speed = this.speed;
    }
}


let invisible_is_visible = false;






class Floor{
    constructor(x=0,y=0,material="planks"){
        this.material=material;
        this.tile_size = 50;
        this.originalX = x*this.tile_size;
        this.originalY = y*this.tile_size;
        this.x = x*this.tile_size;
        this.y = y*this.tile_size;
        this.animation = floor_materials[material]
    }
    play_animation(dtime){
        return this.animation.frames[Math.floor(dtime*this.animation.speed%this.animation.duration)];
    }
}

class Wall{
    constructor(x=0,y=0,material="planks",type="ver"){
        this.tile_size = 50;
        this.material=material;
        this.type=type;
        if (type == "ver"){
            this.height = 50;
            this.width = 8;
            this.originalX = x*this.tile_size - this.width/2;
            this.originalY = y*this.tile_size;
        }else{
            this.height = 8;
            this.width = 50;
            this.originalX = x*this.tile_size;
            this.originalY = y*this.tile_size - this.height/2;
        }
        this.x = this.originalX;
        this.y = this.originalY;
        this.animation = wall_materials[material]
    }
    play_animation(dtime){
        return this.animation.frames[Math.floor(dtime*this.animation.speed%this.animation.duration)];
    }
}


class Floor_trigger{
    constructor(x,y,width,height,pavillion=0){
        this.pavillion = pavillion
        this.tile_size = 50;
        this.x = x*this.tile_size;
        this.y = y*this.tile_size;
        this.width = width
        this.height = height
    }
}





class Camera{
    constructor(hitbox){
        this.hitbox = hitbox;
    }
    draw_map(x,y,floor){
        map[floor].floor.forEach(tile => {
            if (collision([tile.originalX - x,tile.originalY - y,tile.tile_size,tile.tile_size],[0,0,canvas.width,canvas.height])){
                ctx.drawImage(tile.play_animation(dtime), tile.originalX - x, tile.originalY - y, tile.tile_size,tile.tile_size);
            }            
            
        });
        rendered_walls = []
        map[floor].walls.forEach(wall => {
            
            if (collision([wall.originalX - x,wall.originalY - y,wall.width,wall.height],[0,0,canvas.width,canvas.height])){
                rendered_walls.push(wall)
                if (wall.material != "invisible"){
                    ctx.drawImage(wall.play_animation(dtime), 0, 0, wall.width-2, wall.height-2, wall.originalX - x, wall.originalY - y, wall.width, wall.height);
                }else if (invisible_is_visible){
                    ctx.fillStyle = "red";
                    ctx.fillRect(wall.originalX-x,wall.originalY - y,wall.width,wall.height)
                }
            }    
        });
        // map[floor].triggers.forEach(trigger => {
        //          if (invisible_is_visible){
        //              ctx.fillRect(trigger.x - x,trigger.y -y,trigger.tile_size*trigger.width,trigger.tile_size*trigger.height)
        //          }
        //  })
        ctx.fillStyle = "#000000"
        
    }
}


