import {loadLevel} from './loaders.js';
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js';
import Compositor from './Compositor.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1')
]).then(([marioSprite, sprites, level]) => {
  const comp = new Compositor();

  const pos = {
    x: 64,
    y: 64
  };

  const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites);
  const spriteLayer = createSpriteLayer(marioSprite, pos);

  comp.layers.push(backgroundLayer);
  comp.layers.push(spriteLayer);

  function update () {
    comp.draw(context);
    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }

  update();
});
