class MainMenu
{
    constructor()
    {

    }

    setup()
    {
        //create play button and add button press event
        this._playButton = new ButtonElement(menuScene, "images/playButton2.png", WIDTH / 2, HEIGHT - HEIGHT / 8, 1);
        this._playButton.isClickable(true);
        this._playButton.clicked(function ()
        {
            console.log("PlayButtonClicked");
            state = play;
            gameScene.visible = true;
            menuScene.visible = false;
        });

        this._characterSelectButton = new ButtonElement(menuScene, "images/playButton2.png", WIDTH / 2, HEIGHT - HEIGHT / 3.5, .6);
        this._characterSelectButton.isClickable(true);
        this._characterSelectButton.clicked(function ()
        {
            console.log("CharButtonClicked");
            state = characterSelection;
            characterSelectScene.visible = true;
            menuScene.visible = false;
        });

        this._logo = new ButtonElement(menuScene, "images/Logo.png", WIDTH / 2, HEIGHT / 3);
        this._logo.scale.set(0.9);
    }

    update()
    {

    }
}