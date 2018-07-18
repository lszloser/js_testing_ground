
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

  drawVisual() {
    gctx.beginPath();
    gctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    gctx.closePath();
    gctx.fillStyle = this.color;
    gctx.fill();
  }

  drawLabel() {
    this.label.draw()
  }

  draw() {
    this.drawVisual();
    this.drawLabel();
  }

  update() {   
    this.drawVisual();
    this.drawLabel();
  }

  drawRange() {
    this.allowedRange.lifeTime = 0;
    this.updateRange();
  }

  updateRange() {
    this.allowedRange.draw();
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

  static addVertex(e) {
    vertices.push(new Vertex(e.x,e.y,"V" + vertices.length.toString()));
  }



  static canAdd(e) {
    return vertices.filter(ver => Math.hypot(ver.x-e.x, ver.y-e.y) < 50).map(ver => ver.drawRange()).length > 0 ? false : true;
  }

  static select(e) {
    var selected = null;
    vertices.forEach(function(ver) {
      if (Math.hypot(ver.x-e.x, ver.y-e.y) < 20) {
        selected = ver.select();
      }
      else {
        ver.unSelect();
      }
    });
    return selected;
  }

  static drawVertices() {
    vertices.forEach(function(ver) {
      ver.draw();
      ver.allowedRange.draw();
    });
  }
}
