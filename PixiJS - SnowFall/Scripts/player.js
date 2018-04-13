//needs collision detection
class Player extends PIXI.Sprite
{
    constructor(parent=null, image, speed, posX, posY)
    {
        super(PIXI.Texture.fromImage(image));

        this.position.set(posX, posY);
        this.pivot.set(0.5);
        this.anchor.set(0.5);
        this.speed = speed;
        this.vx = 0;
        this.score = 0;
        this.highScore = 0;
        this.textures = ["images/player.png", "images/player2.png"];

        if(parent)
        {
            parent.addChild(this);
        }

        this.timer = 100;
    }

    updateTexture(index)
    {
        this.texture = PIXI.Texture.fromImage(this.textures[index]);
    }

    update(delta)
    {
        this.x += this.vx;
        this.timer -= delta;
        if(this.timer < 0)
        {
            this.timer = 100;
            this.updateScore();
        }
    }

    changeDirection()
    {
        console.log("EnteredChangeDirectoin");
        if(this.vx == 0)
        {
            this.vx = this.speed;
        }        
        else
        {
            this.vx = -this.vx;
        }
           
    }  
     
    resetPlayer()
    {
        this.x = WIDTH / 1.9;
        this.y = HEIGHT / 4;
        this.vx = 0;
        this.score = 0;
        this.timer = 100;
    }

    updateScore()
    {
        this.score += 1;

        if(this.score > this.highScore)
            this.highScore = this.score;
    }

    checkOutOfBounds()
    {
        if(this.x > WIDTH || this.x < 0)
        {
            console.log("Out of bounds")
            return true;
        }
        return false;
    }
}