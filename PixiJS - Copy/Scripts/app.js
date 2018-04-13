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
.add(["images/player.png", "images/player2.png"])
.load(setup);

var state, menuScene, gameScene, gameOverScene, characterSelectScene;
let mainMenuClass, characterSelectionClass, inGameClass, gameOverClass; 
//Define any variables that are used in more than one function
let player, scoreTextAmount, endScoreTextAmount;
let trees = [];
let playerTextureIndex = 0;
let characterSelectionSprite;

function setup() 
{
    //create the scene containers
    menuScene = new Container();
    app.stage.addChild(menuScene);
    //menu scene
    mainMenuClass = new MainMenu();
    mainMenuClass.setup();
    //end menu scene


    //characterSelectScene
    characterSelectScene = new Container();
    app.stage.addChild(characterSelectScene);
    characterSelectScene.visible = false;

    let textures = ["images/player.png", "images/player2.png"];
    characterSelectionClass = new CharacterSelection(textures);
    characterSelectionClass.setup();

    //game scene
    //create gameScene container
    gameScene = new Container();
    app.stage.addChild(gameScene);
    gameScene.visible = false;
    //init game variables
    inGameClass = new InGame();
    inGameClass.setup();

    //setup keyboard controls
    let spacebar = keyboard(32);
    spacebar.release =  function()
    {
        inGameClass._player.changeDirection();
    }
    //end game scene

    //gameover scene
    gameOverScene = new Container();
    app.stage.addChild(gameOverScene);
    gameOverScene.visible = false;
    //init gameover variables;
    gameOverClass = new GameOver();
    gameOverClass.setup();
    //end gameover scene

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
    inGameClass.update(delta);
}

function menu(delta)
{
    //main menu logic
}

function end(delta)
{
    //gameover logic
    gameOverClass.updateText(inGameClass._player.score, inGameClass._player.score);
}

function characterSelection()
{
    //character selection logic
}


//The `keyboard` helper function
function keyboard(keyCode) 
{
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function(event) 
    {
        if (event.keyCode === key.code) 
        {
            //if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };
    //The `upHandler`
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
    //Attach event listeners
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);
    return key;
}
