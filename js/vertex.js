
class Vertex {

  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.radius = 3;
    this.color = "blue";
    this.Range = new Range(this.x, this.y);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  drawRange() {
    this.Range.lifeTime = 0;
    this.updateRange();
  }

  updateRange() {
    if (this.Range.lifeTime < 20) {
      this.Range.draw();
    }
  }

  static addVertex(e) {
    vertices.push(new Vertex(e.x,e.y,"V" + vertices.length.toString()));
  }

  static canAdd(e) {
    for (i = 0; i < vertices.length; i++) {
      if (Math.hypot(vertices[i].x-e.x, vertices[i].y-e.y) < 50) {
        vertices[i].drawRange();
        return false;
      }
    }
    return true;
  }

  static drawVertices() {
    for (i = 0; i < vertices.length; i++) {
      vertices[i].draw();
      vertices[i].Range.draw();
    }
  }
}
