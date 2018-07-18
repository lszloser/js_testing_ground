
class Label {

  constructor(x, y, text) {
    this.x = x;
    this.y = y;
    this.color = "black";
    this.text = text;
  }

  draw() {
    gctx.font="12px Georgia";
    gctx.fillText(this.text,this.x,this.y);
  }

  update(x,y) {
    this.x=x;
    this.y=y;
  }
}
