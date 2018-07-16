
class Range {

  constructor(x, y) {
    this.lifeTime = 0;
    this.x = x;
    this.y = y;
    this.radius = 50;
    this.color = "rgba(255, 0, 0, 1)";
  }

  draw() {
    this.lifeTime++;
    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.strokeStyle = "rgba(255, 0, 0," + 1/this.lifeTime + ")";
    ctx.stroke(); 
  }

}
