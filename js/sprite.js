(function() {
  if (typeof Mario === 'undefined')
    window.Mario = {};

  var Sprite = Mario.Sprite = function(img, pos, size, speed, frames, once, scale) {
    this.pos = pos;
    this.size = size;
    this.speed = speed;
    this._index = 0;
    this.img = img;
    this.once = once;
    this.frames = frames;
    this.scale = scale || 1;
  }

  Sprite.prototype.update = function(dt, gameTime) {
    if (gameTime && gameTime == this.lastUpdated) return;
    this._index += this.speed*dt;
    if (gameTime) this.lastUpdated = gameTime;
  }

  Sprite.prototype.setFrame = function(frame) {
    this._index = frame;
  }

  Sprite.prototype.render = function(ctx, posx, posy, vX, vY) {
    var frame;

    if (this.speed > 0 && this.frames && this.frames.length > 0) {
      var max = this.frames.length;
      var idx = Math.floor(this._index);
      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        return;
      }
    } else {
      frame = 0;
    }

    var x = this.pos[0];
    var y = this.pos[1];

    x += frame * this.size[0];

    var s = this.scale;
    var sx = Math.round(x * s);
    var sy = Math.round(y * s);
    var sw = Math.round((x + this.size[0]) * s) - sx;
    var sh = Math.round((y + this.size[1]) * s) - sy;
    ctx.drawImage(resources.get(this.img),
      sx, sy, sw, sh,
      Math.round(posx - vX), Math.round(posy - vY),
      this.size[0], this.size[1]);
  }
})();
