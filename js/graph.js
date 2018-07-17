
class Graph {

  constructor(vertices, edges, name, tx,ty) {
    this.vertices = vertices || [];
    this.edges = edges || [];
    this.name = name || "noname";
    this.textX = tx || 0;
    this.textY = ty || 0;
    this.selectedVertex = null;
    this.selectRange = 20;
    this.drawRange = 80;
  }

  createEdge(v1,v2) {
    this.edges.push(new Edge(v1,v2, (this.edges.length * 2) + 1));
  }

  createVertex(e) {
    if (this.checkVertexRange(e)) {
      this.vertices.push(new Vertex(e.x,e.y,"V" + this.vertices.length.toString(),this.drawRange));
    }
  }

  drawVertices() {
    this.vertices.forEach(function(ver) {
      ver.draw();
      ver.allowedRange.draw();
    });
  }

  drawEdges() {
    this.edges.forEach(function(edg) {
      edg.draw();
    });
  }

  closestVertex(e) {
    return this.vertices.length > 0 ? this.vertices.map(ver => [Math.hypot(ver.x-e.x, ver.y-e.y), ver]).sort((a, b) => { return a[0] - b[0] })[0] : null;
  }

  checkVertexRange(e) {
    return this.vertices.filter(ver => Math.hypot(ver.x-e.x, ver.y-e.y) < this.drawRange).map(ver => ver.drawRange()).length > 0 ? false : true;
  }

  selectVertex(e) {
    let distance, vertex;
    [ distance, vertex ] = this.closestVertex(e) || [];
    if (distance < this.selectRange) {
      if (this.selectedVertex != null) {
        //this.selectedVertex.unSelect();
        this.createEdge(this.selectedVertex, vertex);
        this.selectedVertex.unSelect();
      }
      this.selectedVertex = vertex.select();
    }
    else {
      if (this.selectedVertex != null) {
        this.selectedVertex.unSelect();
        this.selectedVertex = null;
      }
    }
  }

  listEdges() {
    for (const [i, edg] of this.edges.entries()) {
      edg.list(this.textX,this.textY + i*16);
    }
  }

  draw() {
    this.drawEdges();
    this.drawVertices();
    this.listEdges();
  }

}