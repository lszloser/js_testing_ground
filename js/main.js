
var graphCanvas = document.getElementById('graphCanvas');
var gctx = graphCanvas.getContext('2d');
var textCanvas = document.getElementById('textCanvas');
var tctx = textCanvas.getContext('2d');
var vertices = [];
var selectedVertex;
var i = 0;

function clear() {
  gctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  gctx.fillRect(0,0,graphCanvas.width,graphCanvas.height);
}

graphCanvas.addEventListener('click', function(e) {
  selectedVertex = Vertex.select(e);
  //console.log(selectedVertex);
  if (Vertex.canAdd(e)) {
    Vertex.addVertex(e);
  }
});

function draw() {
  Vertex.drawVertices();
}

function loop(timestamp) {
  var progress = (timestamp - lastRender)

  clear()
  draw()
  
  lastRender = timestamp
  window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)
