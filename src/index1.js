import 'phaser';
//import pkg from 'phaser/package.json';
import sky from './img/sky.png';
import ground from './img/platform.png';
import star from './img/star.png';
import bomb from './img/bomb.png';
import dude from './img/dude.png';


// This is the entry point of your game.

const width = 800;
const height = 600;

let config = {
  width,
  height,
  type: Phaser.AUTO,
  physics:{
    default: 'arcade',
  arcade:{
    gravity: {y: 300},
    debug: false
  }
  },
  scene: { 
    preload: preload,
    create:create ,
    update:update
   }
};

let game = new Phaser.Game(config);
let platforms;
let player;
let cursors;
let stars;

function preload() {
  this.load.image('sky', sky);
  this.load.image('ground', ground);
  this.load.image('star',star);
  this.load.image('bomb',bomb);
  this.load.spritesheet('dude',dude,{frameWidth:32,frameHeight:48});
  //this.load.image('study', introImage);
}


function create() {
  this.add.image(400,300,'sky');
  platforms = this.physics.add.staticGroup();
  platforms.create(400,568,'ground').setScale(2).refreshBody();
  platforms.create(600,400,'ground');
  platforms.create(50,250,'ground');
  platforms.create(750,220,'ground');
  this.add.image(200, 300, 'star');
  this.add.image(300, 300, 'star');
  this.add.image(400, 200, 'star');

  
player = this.physics.add.sprite(100,450,'dude');
player.setBounce(0.2);
player.setCollideWorldBounds (true);
this.anims.create({
  key:'left',
  frames: this.anims.generateFrameNumbers('dude',{start: 0,end: 3}),
  frameRate:10,
  repeat:-1
});
this.anims.create({
  key:'turn',
  frames:[{key:'dude',frame:4}],
  frameRate:20
});
this.anims.create({
  key:'right',
  frames:this.anims.generateFrameNumbers('dude',{start:5,end:8}),
  framesRate:10,
  repeat:-1
});
cursors = this.input.keyboard.createCursorKeys();
stars = this.physics.add.group({
  key: 'star',
  repeat: 11,
  setXY: {x: 12,y:0, stepX: 70}
});
stars.children.iterate(function(child){
  child.setBounceY(Phaser.Math.FloatBetween(0.4,0.8))
});
}
this.physics.add.collider(player,platforms);
this.physics.add.collider(stars, platforms);
this.physics.add.overlap(player, stars, collectStar, null, this);




/*const centerX = width / 2;
  const centerY = height / 2;
  const welcomeMessage = `Welcome to Phaser ${pkg.version}`;

  this.add.image(centerX, centerY * 1.2, 'study');

  this.add
    .text(centerX, centerY * 0.8, welcomeMessage, { font: "bold 19px Arial", fill: "#fff" })
    .setOrigin(0.5, 0.5);*/

    function update ()
    {
      if (cursors.left.isDown)
    {
    player.setVelocityX(-160);
    player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
    player.setVelocityX(160);
    player.anims.play('right', true);
    }
    else
    {
    player.setVelocityX(0);
    player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
    player.setVelocityY(-330);
    }
    function collectStar(player, star) { 
      star.disableBody (true, true);
    }
    }
    