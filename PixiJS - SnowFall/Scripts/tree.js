class Tree extends PIXI.Sprite
{
    constructor(parent=null, image, speed)
    {
        super(PIXI.Texture.fromImage(image));

        this.position.set(this.calcPosition());
        this.scale.set(Math.floor(Math.random() * 1) + .7);
        this.pivot.set(0.0, 0.5);
        this.anchor.set(0.0, 0.5);
        this.vy = speed;

        if(parent)
        {
            parent.addChild(this);
        }
    }

    togglePause(isPaused)
    {
        if(isPaused)
            this.tempspeed = this.vy;
        else
            this.vy = this.tempspeed;
    }

    update()
    {
        this.y -= this.vy;

        if(this.y < 0)
        {     
           this.calcPosition();
           this.scale.set(Math.floor(Math.random() * 1) + .7);
        }
    }

    calcPosition()
    {
        this.position.set(this.getRandomInt(WIDTH), this.getRandomInt(HEIGHT) + HEIGHT);
    }

    getRandomInt(max) 
    {
        return Math.floor(Math.random() * Math.floor(max));
    };

}