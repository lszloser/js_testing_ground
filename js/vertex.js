class Vertex {

  constructor(x, y, name, range) {
    this.x = x;
    this.y = y;
    this.isSelected = false;
    this.name = name;
    this.radius = 3;
    this.color = "blue";
    this.allowedRange = new Range(this.x, this.y, range, true);
    this.label = new Label(this.x - 10, this.y - 15, this.name);
    this.draged = false;
    //this.SelectedRange = new Range(this.x, this.y, 20, false);
  }

  update() {   
    this.updateRange();
    this.updateLabel();
  }

  drawVisual() {
    gctx.beginPath();
    gctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    gctx.closePath();
    gctx.fillStyle = this.color;
    gctx.fill();
  }

  drawDebug() {
    gctx.font="12px Georgia";
    gctx.fillStyle="black";
    gctx.fillText("x:" + this.x + ", y:" + this.y,this.x + 5,this.y + 10);

  }

  drawLabel() {
    this.label.draw();
    this.updateLabel();
  }

  draw() {
    this.drawVisual();
    this.drawLabel();
    this.drawRange();
  }
  
  drawRange() {
    this.allowedRange.draw();
  }

  updateRange() {
    this.allowedRange.update(this.x,this.y);
  }

  showRange() {
    this.allowedRange.lifeTime = 0;
  }

  updateLabel() {
    this.label.update(this.x-10,this.y-15);
  }

  select() {
    this.isSelected = true;
    this.color = "green";
    this.radius = 5;
    return this;
  }

  unSelect() {
    this.isSelected = true;
    this.color = "blue";
    this.radius = 3;
  }
}
