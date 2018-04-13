class CharacterSelection
{
    constructor(textures)
    {
        this._playerTextures = textures;
        this._currentlySelected = 0;
    }

    setup()
    {
        let style = new PIXI.TextStyle(
        {
            fontFamily: 'Century Gothic',
            fontSize: 40,
            fill: 'black',
            align: 'center'
        });

        //title text
        this._characterText = new PIXI.Text('Select\nCharacter', style);
        this._characterText.position.set( WIDTH / 2, HEIGHT / 8);
        this._characterText.anchor.set(0.5);
        characterSelectScene.addChild(this._characterText);

        //visible player sprite
        this.characterSprite = new PIXI.Sprite(PIXI.Texture.fromImage(this._playerTextures[this._currentlySelected]));
        this.characterSprite.position.set(WIDTH / 2 + 10, HEIGHT / 2);
        this.characterSprite.anchor.set(0.5);
        characterSelectScene.addChild(this.characterSprite);

        //returns to main menu
        this._confirmSelection = new ButtonElement(characterSelectScene, "images/confirmButton.png", WIDTH / 2, HEIGHT - HEIGHT / 8, 1);
        this._confirmSelection.isClickable(true);
        this._confirmSelection.clicked(function()
        {
            //change scene back to menu
            state = menu;
            characterSelectScene.visible = false;
            menuScene.visible = true;
        });

        //updates currently selected
        this._nextCharacterLeft = new ButtonElement(characterSelectScene, "images/leftSelectButton.png", WIDTH / 6, HEIGHT - HEIGHT / 8, .6);
        this._nextCharacterLeft.isClickable(true);
        this._nextCharacterLeft.on("pointerup", () => 
        {
            this._nextCharacterLeft.y -= 2;

            //update characterSprite
            this._currentlySelected--;
            if(this._currentlySelected < 0)
            {
                this._currentlySelected = this._playerTextures.length - 1;
            }
                            
            this.characterSprite.texture = PIXI.Texture.fromImage(this._playerTextures[this._currentlySelected]);
        });
        this._nextCharacterLeft.on("pointerdown", ()=>
        {
            this._nextCharacterLeft.y += 2;
        });

        //updates currentlyselected
        this._nextCharacterRight = new ButtonElement(characterSelectScene, "images/rightSelectButton.png", WIDTH - WIDTH / 6, HEIGHT - HEIGHT / 8, .6);
        this._nextCharacterRight.isClickable(true);
        this._nextCharacterRight.on("pointerup", () => 
        {
            this._nextCharacterRight.y -= 2;

            //update characterSprite
            this._currentlySelected++;
            if(this._currentlySelected > this._playerTextures.length - 1)
            {
                this._currentlySelected = 0;
            }
                            
            this.characterSprite.texture = PIXI.Texture.fromImage(this._playerTextures[this._currentlySelected]);
        });
        this._nextCharacterRight.on("pointerdown", ()=>
        {
            this._nextCharacterRight.y += 2;
        });
    }

    update()
    {

    }
}