var game = new Phaser.Game(800, 800, Phaser.AUTO, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});


function preload() {
    socket = io.connect('http://localhost:8081');

    game.load.image('green', 'assets/green.png');
    game.load.image('red', 'assets/red.png');
    game.load.image('blue', 'assets/blue.png');
    game.load.image('orange', 'assets/orange.png');
}

var green;
var red;
var blues;
var orange;

var button;
var change;

function create() {
    change = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#f1826a';

    //on new player emission create player
    green = game.add.sprite(100, 100, 'green');
    green.anchor.setTo(0.5, 0.5);
    game.physics.enable(green, Phaser.Physics.ARCADE);
    green.body.allowRotation = false;
    green.body.collideWorldBounds = true;

    blues = game.add.group();
    blues.enableBody = true;
    for (var i = 0; i < 30; i++) {
        var blue = blues.create(game.world.randomX, game.world.randomY, 'blue');
        blue.scale.setTo(0.25, 0.25);
    }

    button = game.add.button(600, 700, 'red', actionOnClick, this, 2, 1, 0);

    button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);
    button.onInputUp.add(up, this);
}

function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function actionOnClick() {
    change = !change;
    for (var i = 0; i < 30; i++) {
        var blue = blues.create(game.world.randomX, game.world.randomY, 'blue');
        blue.scale.setTo(0.25, 0.25);
    }
}

function update() {

    green.rotation = game.physics.arcade.moveToPointer(green, 10, game.input.activePointer, 250);
    if (change) {
        game.stage.backgroundColor = '#f1826a';
    } else {
        game.stage.backgroundColor = '#21826a';
    }

    game.physics.arcade.collide(green, blues);

}

function render() {
    game.debug.spriteInfo(green, 32, 32);

}