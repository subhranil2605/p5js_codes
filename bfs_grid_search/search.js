function bfs(problem) {
  var node = new Node(problem.initial);

  if (problem.isGoal(node.state)) {
    return node;
  }

  var frontier = [node];
  var explored = new Set();

  while (frontier) {
    node = frontier.shift();
    explored.add(node.state);

    for (var child of node.expand(problem)) {
      if (!explored.has(child.state) && !frontier.includes(child)) {
        if (problem.isGoal(child.state)) {
          return child.path();
        }
        frontier.push(child);
      }
    }
  }
  return null;
}

function topp(a, b) {
  if (a - 1 >= 0) {
    return createVector(a - 1, b);
  }
}
function right(a, b) {
  if (b + 1 <= rows - 1) {
    return createVector(a, b + 1);
  }
}
function bottom(a, b) {
  if (a + 1 <= cols - 1) {
    return createVector(a + 1, b);
  }
}
function left(a, b) {
  if (b - 1 >= 0) {
    return createVector(a, b - 1);
  }
}
