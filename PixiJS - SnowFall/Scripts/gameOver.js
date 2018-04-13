class GameOver
{
    constructor()
    {
        //text styles
        this._scoreTextstyle = new PIXI.TextStyle({
            fontFamily: 'Century Gothic',
            fontSize: 35,
            fill: 'black',
            align: 'center'
        });
        this._scoreAmountStyle = new PIXI.TextStyle({
            fontFamily: 'Century Gothic',
            fontSize: 40,
            fill: 'black',
            align: 'center'
        });
        this._highScoreTextStyle = new PIXI.TextStyle({
            fontFamily: 'Century Gothic',
            fontSize: 15,
            fill: 'black',
            align: 'center'
        });
        this._highScoreAmountStyle = new PIXI.TextStyle({
            fontFamily: 'Century Gothic',
            fontSize: 25,
            fill: 'black',
            align: 'center'
        });
    }

    setup()
    {
        this._logo = new ButtonElement(gameOverScene, "images/Snowflake.png", WIDTH / 2, HEIGHT / 4, 1);

        this._playAgainButton = new ButtonElement(gameOverScene, "images/playButton.png", WIDTH - WIDTH / 4, HEIGHT - HEIGHT / 8, 1);
        this._playAgainButton.isClickable(true);
        this._playAgainButton.clicked(function()
        {
            state = play;
            gameScene.visible = true;
            gameOverScene.visible = false;
        });

        this._returnToMenuButton = new ButtonElement(gameOverScene, "images/menuButton.png", WIDTH / 4, HEIGHT - HEIGHT / 8, 1);
        this._returnToMenuButton.isClickable(true);
        this._returnToMenuButton.clicked(function()
        {
            state = menu;
            menuScene.visible = true;
            gameOverScene.visible = false;
        });

        let scoreText = this.CreateText("Score", this._scoreTextstyle, WIDTH / 2, HEIGHT / 2);
        gameOverScene.addChild(scoreText);

        this._scoreAmount = this.CreateText("0", this._scoreAmountStyle, WIDTH / 2, HEIGHT / 1.7);
        gameOverScene.addChild(this._scoreAmount);

        let highScoreText = this.CreateText("High Score", this._highScoreTextStyle, WIDTH / 2, HEIGHT / 1.5); 
        gameOverScene.addChild(highScoreText);

        this._highScoreAmount = this.CreateText("0", this._highScoreAmountStyle, WIDTH / 2, HEIGHT / 1.4);
        gameOverScene.addChild(this._highScoreAmount);
    }

    //return text object
    CreateText(text, style, posX, posY)
    {
        let newText = new PIXI.Text(text, style);
        newText.anchor.set(0.5);
        newText.position.set(posX, posY);
        return newText;
    }

    //sets score text
    updateScores(score, highScore)
    {
        //update the score and highscore text
        this._scoreAmount.text = score;
        this._highScoreAmount.text = highScore;
    }
}