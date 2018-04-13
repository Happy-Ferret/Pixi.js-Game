class InGame
{
    constructor()
    {

    }

    setup()
    {
        this._player = new Player(gameScene, "images/player.png", 1, WIDTH / 1.9, HEIGHT / 4);
        this._player.scale.set(0.6);


        let style = new PIXI.TextStyle(
        {
            fontFamily: 'Century Gothic',
            fontSize: 40,
            fill: 0x8ed1db,
            align: 'center'
        });

        // create score text
        this._scoreText = new PIXI.Text('0', style);
        this._scoreText.anchor.set(0.5);
        this._scoreText.position.set(WIDTH / 2, HEIGHT / 13);
        gameScene.addChild(this._scoreText);
    }

    update(delta)
    {
        this._player.update(delta);

        if(this._player.checkBounds())
        {
            //go to game over
        }
    }
}