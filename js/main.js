
var graphCanvas = document.getElementById('graphCanvas');
var gctx = graphCanvas.getContext('2d');
var textCanvas = document.getElementById('textCanvas');
var tctx = textCanvas.getContext('2d');
var resetButton = document.getElementById("resetButton");
var vertices = [];
var selectedVertex;
var i = 0;
var G = new Graph([],[],"G1",10,10);



function clearGraph() {
  gctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  gctx.fillRect(0,0,graphCanvas.width,graphCanvas.height);
}

function clearText() {
  tctx.fillStyle = 'rgba(255, 255, 255,1)';
  tctx.fillRect(0,0,textCanvas.width,textCanvas.height);
}

resetButton.addEventListener('click', function(e) {
  //selectedVertex = Vertex.select(e);
  G.clear();
  clearText();
});

graphCanvas.addEventListener('keydown', function(e) {
  var code = e.key;
  console.log(e);
  switch (code) {
      case "z": G.edges.pop(); break; //Left key
      case 38: alert("Up"); break; //Up key
      case 39: alert("Right"); break; //Right key
      case 40: alert("Down"); break; //Down key
  }
}, false);



graphCanvas.addEventListener('mousedown', function(e) {
  //selectedVertex = Vertex.select(e);
  //console.log(selectedVertex);
  console.log("MOUSE DOWN");
  G.selectVertex(e);
  if (G.selectedVertex != null) {
    G.selectedVertex.draged = true;
  }
});

graphCanvas.addEventListener('mousemove', function(e) {
  //selectedVertex = Vertex.select(e);
  //console.log(selectedVertex);
  if (G.selectedVertex != null) {
    if (G.selectedVertex.draged) {
      G.selectedVertex.x = e.x;
      G.selectedVertex.y = e.y;
    }
  }
});

graphCanvas.addEventListener('mouseup', function(e) {
  if (G.selectedVertex != null) {
    G.selectedVertex.draged = false;
  }
  G.createVertex(e);
});

function draw() {
  G.draw();
}

function update() {
  G.update();
}

function loop(timestamp) {
  //var progress = (timestamp - lastRender)

  clearGraph();
  update();
  draw();
  
  //lastRender = timestamp
  window.requestAnimationFrame(loop);
}
//var lastRender = 0
window.requestAnimationFrame(loop);
