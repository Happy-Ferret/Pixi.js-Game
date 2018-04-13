PIXI.utils.sayHello();

var WIDTH = 285;
var HEIGHT = 508;

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;
    
var app = new PIXI.Application(WIDTH, HEIGHT, 
{
    backgroundColor : 0xffffff,
    antialias: true
});
document.getElementById('Canvas').appendChild(app.view);

loader
.add("images/logo.png")
.load(setup);

var state, menuScene, gameScene, gameOverScene, characterSelectScene;
let mainMenuObj, characterSelectionObj, inGameObj, gameOverObj; 

function setup() 
{
    //menu scene - setup

    //create the scene containers
    menuScene = new Container();
    app.stage.addChild(menuScene);

    //create class object
    mainMenuObj = new MainMenu();
    mainMenuObj.setup();

    //end menu scene - setup

    //characterSelection scene - setup
    characterSelectScene = new Container();
    app.stage.addChild(characterSelectScene);
    characterSelectScene.visible = false;

    //textures used for player
    let textures = ["images/player1Large.png", "images/player2Large.png"];
    characterSelectionObj = new CharacterSelection(textures);
    characterSelectionObj.setup();

    //end characterSelection - setup

    //game scene - setup

    //create gameScene container
    gameScene = new Container();
    app.stage.addChild(gameScene);
    gameScene.visible = false;
    //init game variables
    inGameObj = new InGame();
    inGameObj.setup();

    //setup keyboard controls
    let spacebar = keyboard(32);
    spacebar.release =  function()
    {
        inGameObj._player.changeDirection();
    }

    //end game scene - setup


    //gameover scene - setup
    gameOverScene = new Container();
    app.stage.addChild(gameOverScene);
    gameOverScene.visible = false;
    //init gameover variables;
    gameOverObj = new GameOver();
    gameOverObj.setup();

    //end gameover scene - setup


    //Set the game state
    state = menu;
 
    //Start the game loop 
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta)
{
  //Update the current game state:
  state(delta);
}

function play(delta)
{
    inGameObj.update(delta);
}

function menu(delta)
{
    //main menu logic
}

function end(delta)
{
    //gameover logic
}

function characterSelection()
{
    //character selection logic
    inGameObj._player.updateTexture(characterSelectionObj._currentlySelected);
}


//keyboard controller
function keyboard(keyCode) 
{
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.release = undefined;

    //downhandler
    key.downHandler = function(event) 
    {
        if (event.keyCode === key.code) 
        {
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };
    
    //uphandler
    key.upHandler = function(event) 
    {
        if (event.keyCode === key.code) 
        {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    // event listeners
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);
    return key;
}
