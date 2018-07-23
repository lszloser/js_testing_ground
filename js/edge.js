
class Edge {

  constructor(v1, v2) {
    this.weight = 1 + Math.floor(10*Math.random());
    this.v1 = v1;
    this.v2 = v2;
    this.color = "rgba(0, 0, 255, 1)";
    this.name = v1.name + " --- " + this.weight + " --- " + v2.name;
    this.middleX = (this.v1.x + this.v2.x)/2;
    this.middleY = (this.v1.y + this.v2.y)/2;
    this.linearCoef = (this.v2.y - this.v1.y)/(this.v2.x - this.v1.x);
    this.delta = 1/this.linearCoef;
    this.label = new Label(this.middleX, this.middleY, this.weight);
  }

  draw() {
    gctx.beginPath();
    gctx.setLineDash([])
    gctx.lineWidth = 0.3*this.weight;
    gctx.strokeStyle = "rgba(0, 0, 255, 1)";
    gctx.moveTo(this.v1.x,this.v1.y);
    gctx.lineTo(this.middleX-this.delta,this.middleY-(this.delta*this.linearCoef));
    gctx.stroke();
    this.label.draw();
    gctx.moveTo(this.middleX+this.delta,this.middleY+(this.delta*this.linearCoef));
    gctx.lineTo(this.v2.x,this.v2.y);
    gctx.stroke();
    gctx.restore(); 
  }

  list(x,y) {
    tctx.font="12px Georgia";
    tctx.fillStyle="black";
    tctx.fillText(this.name,x,y);
  }

  update() {
    this.middleX = (this.v1.x + this.v2.x)/2;
    this.middleY = (this.v1.y + this.v2.y)/2;
    this.label.update(this.middleX,this.middleY);
    this.linearCoef = (this.v2.y - this.v1.y)/(this.v2.x - this.v1.x);
    this.delta = this.v1.x < this.v2.x ? 15/(Math.sqrt(4 + this.linearCoef*this.linearCoef)) : -15/(Math.sqrt(4 + this.linearCoef*this.linearCoef));
  }

}
