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

//Define any variables that are used in more than one function
let state, menuScene, gameScene, gameOverScene, characterSelectScene, player, scoreTextAmount, endScoreTextAmount;
let trees = [];
let playerTextureIndex = 0;
let characterSelectionSprite;

function setup() 
{
    let style = new PIXI.TextStyle({
        fontFamily: 'Century Gothic',
        fontSize: 35,
        fill: 'black',
        align: 'center'
    });
    let style2 = new PIXI.TextStyle({
        fontFamily: 'Century Gothic',
        fontSize: 40,
        fill: 'black',
        align: 'center'
    });
    let style3 = new PIXI.TextStyle({
        fontFamily: 'Century Gothic',
        fontSize: 15,
        fill: 'black',
        align: 'center'
    });
    let style5 = new PIXI.TextStyle({
        fontFamily: 'Century Gothic',
        fontSize: 40,
        fill: 0x8ed1db,
        align: 'center'
    });
    let style4 = new PIXI.TextStyle({
        fontFamily: 'Century Gothic',
        fontSize: 25,
        fill: 'black',
        align: 'center'
    });

    //create the scene containers
    menuScene = new Container();
    app.stage.addChild(menuScene);

    //menu scene

    //create play button and add button press event
    let playButton = new ButtonElement(menuScene, "images/playButton2.png", WIDTH / 2, HEIGHT - HEIGHT / 8, 1);
    playButton.isClickable(true);
    playButton.clicked(function ()
    {
        console.log("PlayButtonClicked");
        state = play;
        gameScene.visible = true;
        menuScene.visible = false;
     });

     let characterSelectButton = new ButtonElement(menuScene, "images/playButton2.png", WIDTH / 2, HEIGHT - HEIGHT / 3.5, .6);
     characterSelectButton.isClickable(true);
     characterSelectButton.clicked(function ()
     {
         console.log("CharButtonClicked");
         state = characterSelection;
         characterSelectScene.visible = true;
         menuScene.visible = false;
      });

    let logo = new ButtonElement(menuScene, "images/Logo.png", WIDTH / 2, HEIGHT / 3);
    logo.scale.set(0.9);
    // let muteButton = new SpriteElement(menuScene, "images/muteButton.png", WIDTH / 4, HEIGHT - HEIGHT + 29);
    //end menu scene


    //game scene
    //create gameScene container
    gameScene = new Container();
    app.stage.addChild(gameScene);
    gameScene.visible = false;

    //create player and setup keyboard control
    player = new Player(gameScene, "images/player.png", 1, WIDTH / 1.9, HEIGHT / 4);
    player.scale.set(0.6);
    let spacebar = keyboard(32);
    spacebar.release =  function()
    {
        player.changeDirection();
    }

    for(var i = 0; i < 20; i++)
    {
        let tree = new Tree(gameScene, "images/tree2.png", 3);
        tree.scale.set(0.7);
        trees.push(tree);
    }

    //add in game ui
    // let pauseButton = new ButtonElement(gameScene, "images/pauseButton.png", WIDTH / 7, HEIGHT / 12, 1);
    // pauseButton.isClickable(true);
    // pauseButton.clicked(function ()
    // {
    //     console.log("PauseButtonClicked");
    //  });

    // create score text
    scoreText = new PIXI.Text('0', style5);
    //scoreText.position.set( WIDTH - WIDTH / 6, HEIGHT / 21);
    scoreText.anchor.set(0.5);
    scoreText.position.set(WIDTH / 2, HEIGHT / 13);
    gameScene.addChild(scoreText);

    //end game scene

    //gameover scene
    gameOverScene = new Container();
    app.stage.addChild(gameOverScene);
    gameOverScene.visible = false;

    let logo2 = new ButtonElement(gameOverScene, "images/Snowflake.png", WIDTH / 2, HEIGHT / 4, 1);

    let gameOverPlayButton = new ButtonElement(gameOverScene, "images/playButton.png", WIDTH - WIDTH / 4, HEIGHT - HEIGHT / 8, 1);
    gameOverPlayButton.isClickable(true);
    gameOverPlayButton.clicked(function()
    {
        state = play;
        for(var i = 0; i < trees.length; i++)
        {
            trees[i].calcPosition();
        }
        gameScene.visible = true;
        gameOverScene.visible = false;
        player.resetPlayer();
    });

    let gameOverMenuButton = new ButtonElement(gameOverScene, "images/menuButton.png", WIDTH / 4, HEIGHT - HEIGHT / 8, 1);
    gameOverMenuButton.isClickable(true);
    gameOverMenuButton.clicked(function()
    {
        state = menu;
        for(var i = 0; i < trees.length; i++)
        {
            trees[i].calcPosition();
        }
        player.resetPlayer();
        menuScene.visible = true;
        gameOverScene.visible = false;
    });

    let endScoreText = new PIXI.Text('Score', style);
    endScoreText.position.set( WIDTH / 2, HEIGHT / 2);
    endScoreText.anchor.set(0.5);
    gameOverScene.addChild(endScoreText);

    endScoreAmount = new PIXI.Text('0', style2);
    endScoreAmount.anchor.set(0.5);
    endScoreAmount.position.set( WIDTH / 2, HEIGHT / 1.7);
    gameOverScene.addChild(endScoreAmount);

    let endHighScoreText = new PIXI.Text('High Score', style3);
    endHighScoreText.position.set( WIDTH / 2, HEIGHT / 1.5);
    endHighScoreText.anchor.set(0.5);
    gameOverScene.addChild(endHighScoreText);

    endHighScoreAmount = new PIXI.Text('0', style4);
    endHighScoreAmount.anchor.set(0.5);
    endHighScoreAmount.position.set( WIDTH / 2, HEIGHT / 1.4);
    gameOverScene.addChild(endHighScoreAmount);

    //end gameover scene

    //characterSelectScene
    characterSelectScene = new Container();
    app.stage.addChild(characterSelectScene);
    characterSelectScene.visible = false;

    let characterText = new PIXI.Text('Select\nCharacter', style2);
    characterText.position.set( WIDTH / 2, HEIGHT / 8);
    characterText.anchor.set(0.5);
    characterSelectScene.addChild(characterText);

    characterSelectionSprite = new PIXI.Sprite(loader.resources["images/player.png"].texture);
    characterSelectionSprite.scale.set(5);
    characterSelectionSprite.position.set(WIDTH / 2 + 30, HEIGHT / 2);
    characterSelectionSprite.anchor.set(0.5);
    characterSelectScene.addChild(characterSelectionSprite);

    let selectCharacter = new ButtonElement(characterSelectScene, "images/menuButton.png", WIDTH / 2, HEIGHT - HEIGHT / 8, 1);
    selectCharacter.isClickable(true);
    selectCharacter.clicked(function()
    {
        //set the texture for the character
        player.setTexture(characterSelectionSprite.texture);// updateTexture(playerTextureIndex);
        state = menu;
        characterSelectScene.visible = false;
        menuScene.visible = true;
    });

    let characterSelectLeft = new ButtonElement(characterSelectScene, "images/menuButton.png", WIDTH / 4, HEIGHT - HEIGHT / 8, .7);
    characterSelectLeft.isClickable(true);
    characterSelectLeft.clicked(function()
    {
        //update textureIndex
        playerTextureIndex--;
        if(playerTextureIndex < 0)
            playerTextureIndex = 0;

        //updateSpriteDisplayed
        characterSelectionSprite.setTexture(PIXI.Texture.fromImage(player.textures[playerTextureIndex]));
    });

    let characterSelectRight = new ButtonElement(characterSelectScene, "images/menuButton.png", WIDTH - WIDTH / 4, HEIGHT - HEIGHT / 8, .7);
    characterSelectRight.isClickable(true);
    characterSelectRight.clicked(function()
    {
        //update textureIndex
        playerTextureIndex++;
        if(playerTextureIndex > player.textures.length - 1)
            playerTextureIndex = player.textures.length - 1;

        //updateSpriteDisplayed
        characterSelectionSprite.setTexture(PIXI.Texture.fromImage(player.textures[playerTextureIndex]));
    });

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
    //in game logic
    player.update(delta);

    if(player.checkOutOfBounds())
    {
        gameScene.visible = false;
        gameOverScene.visible = true;
        state = end;
    }

    for (var i = 0; i < trees.length; i++)
    {
        trees[i].update();
        if(hitTestRectangle(player, trees[i]))
        {
            console.log("Hit Something");
            gameScene.visible = false;
            gameOverScene.visible = true;
            state = end;
        }
    }

    //update score
    scoreText.text = player.score;
}

function menu(delta)
{
    //main menu logic
}

function end(delta)
{
    //gameover logic
    endScoreAmount.text = player.score;
    endHighScoreAmount.text = player.highScore;
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

//The `hitTestRectangle` function
function hitTestRectangle(r1, r2) {
    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
    //hit will determine whether there's a collision
    hit = false;
    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2; 
    r1.centerY = r1.y + r1.height / 2; 
    r2.centerX = r2.x + r2.width / 2; 
    r2.centerY = r2.y + r2.height / 2; 
    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 3;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 5;
    r2.halfHeight = r2.height / 4;
    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;
    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;
    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
      //A collision might be occuring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
        //There's definitely a collision happening
        hit = true;
      } else {
        //There's no collision on the y axis
        hit = false;
      }
    } else {
      //There's no collision on the x axis
      hit = false;
    }
    //`hit` will be either `true` or `false`
    return hit;
  };



