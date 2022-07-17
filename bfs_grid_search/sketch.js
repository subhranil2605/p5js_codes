var rows;
var cols;
var w = 20;
var graph = {};
var graphProblem;
var path;
var node;
var frontier;
var explored;
var cells = [];

function setup() {
  createCanvas(600, 600);
  rows = floor(width / w);
  cols = floor(height / w);
  // frameRate(30);

  // generating graph values
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (topp(i, j)) {
        setDefault(graph, createVector(i, j), []).push(topp(i, j));
      }
      if (right(i, j)) {
        setDefault(graph, createVector(i, j), []).push(right(i, j));
      }
      if (bottom(i, j)) {
        setDefault(graph, createVector(i, j), []).push(bottom(i, j));
      }
      if (left(i, j)) {
        setDefault(graph, createVector(i, j), []).push(left(i, j));
      }
      var pt = createVector(i, j);
      var n = new Node(pt);
      cells.push(n);
    }
  }

  const rStart = 10;
  const cStart = 10;
  const rGoal = 15;
  const cGoal = 12;
  const start = createVector(rStart, cStart);
  const goal = createVector(rGoal, cGoal);

  var graphSpace = new Graph(graph);
  graphProblem = new GraphProblem(graphSpace, start, goal);

  node = cells[cStart * cols + rStart];

  frontier = [node];
  explored = new Set();
}

function draw() {
  background(51);

  // grid
  for (var g of cells) {
    g.show();
  }

  node.visited = true;

  if (graphProblem.isGoal(node.state)) {
    node.goal();
    return -1;
  }

  // middle points
  if (frontier) {
    node = frontier.shift();
    node.visited = true;
    explored.add(node.state);

    // append the current node in the cells
    cells.push(node);

    node.highlight()

    for (var child of node.expand(graphProblem)) {
      if (!explored.has(child.state) && !frontier.includes(child)) {
        if (graphProblem.isGoal(child.state)) {
          noLoop();
          for (var p of child.path()) {
            p.goal();
          }
        }
        child.visited = true;
        frontier.push(child);
      }
    }
  }

  // start
  fill(0, 0, 255);
  rect(graphProblem.initial.x * w, graphProblem.initial.y * w, w, w);

  // goal
  fill(255, 0, 0);
  rect(graphProblem.goal.x * w, graphProblem.goal.y * w, w, w);
}


