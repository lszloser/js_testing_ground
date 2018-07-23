
class Graph {

  constructor(vertices, edges, name, tx,ty, isSimple) {
    this.vertices = vertices || [];
    this.edges = edges || [];
    this.name = name || "noname";
    this.textX = tx || 0;
    this.textY = ty || 0;
    this.selectedVertex = null;
    this.selectRange = 20;
    this.drawRange = 80;
    this.isSimple = (typeof isSimple === 'undefined') ? true : isSimple;
    this.debug = false;
  }

  createEdge(v1,v2) {
    if (this.isSimple) {
      if (!this.edgeExists(v1,v2) && !this.selfLoop(v1,v2)) {
        this.edges.push(new Edge(v1,v2, (this.edges.length * 2) + 1));
      }
    }
  }

  edgeExists(v1,v2) {
    return this.edges.some(edg => (edg.v1 == v1 && edg.v2 == v2) || (edg.v1 == v2 && edg.v2 == v1));
  }

  selfLoop(v1,v2) {
    return v1 == v2;
  }

  createVertex(x,y) {
    if (this.checkVertexRange(x,y)) {
      this.vertices.push(new Vertex(x,y,"V" + this.vertices.length.toString(),this.drawRange));
    }
  }

  drawVertices() {
    this.vertices.forEach(function(ver) {
      ver.draw();
      //ver.allowedRange.draw();
    });
  }

  updateVertices() {
    this.vertices.forEach(function(ver) {
      ver.update();
    });
  }

  updateEdges() {
    this.edges.forEach(function(edg) {
      edg.update();
    });
  }

  drawEdges() {
    this.edges.forEach(function(edg) {
      edg.draw();
    });
  }

  drawDebug() {
    this.vertices.forEach(function(ver) {
      ver.drawDebug();
    });
  }

  closestVertex(x,y) {
    return this.vertices.length > 0 ? this.vertices.map(ver => [Math.hypot(ver.x-x, ver.y-y), ver]).sort((a, b) => { return a[0] - b[0]; })[0] : null;
  }

  checkVertexRange(x,y) {
    return this.vertices.filter(ver => Math.hypot(ver.x-x, ver.y-y) < this.drawRange).map(ver => ver.showRange()).length > 0 ? false : true;
  }

  mouseEvent(x,y) {
    let distance, vertex;
    [ distance, vertex ] = this.closestVertex(x,y) || [];
    if (distance > this.selectRange || vertex == null) {
      if (this.selectedVertex != null) {
        this.selectedVertex.unSelect();
        this.selectedVertex = null;
      }
      this.createVertex(x, y)
    }
    else {
      if (this.selectedVertex != null) {
        this.createEdge(this.selectedVertex, vertex);
        this.selectedVertex.unSelect();
      }
      this.selectedVertex = vertex.select();
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
    if (this.debug) {
      this.drawDebug();
    }
    //this.listEdges();
  }

  clear() {
    this.vertices=[];
    this.edges=[];
  }
  
  update() {
    this.updateVertices();
    this.updateEdges();
  }

}
