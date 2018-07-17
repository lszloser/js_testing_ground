
class Edge {

  constructor(v1, v2, weight) {
    this.weight = weight;
    this.v1 = v1;
    this.v2 = v2;
    this.color = "rgba(0, 0, 255, 1)";
    this.name = v1.name + " -- " + weight + " -- " + v2.name;
  }

  draw() {
    gctx.beginPath();
    gctx.setLineDash([])
    gctx.lineWidth=this.weight;
    gctx.strokeStyle = "rgba(0, 0, 255, 1)";
    gctx.moveTo(this.v1.x,this.v1.y);
    gctx.lineTo(this.v2.x,this.v2.y);
    gctx.stroke();
    gctx.restore(); 
  }

  list(x,y) {
    tctx.font="12px Georgia";
    tctx.fillText(this.name,x,y);
  }

}
