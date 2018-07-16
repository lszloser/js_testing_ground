
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var vertices = [];
var i = 0;

function clear() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

canvas.addEventListener('click', function(e) {
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
