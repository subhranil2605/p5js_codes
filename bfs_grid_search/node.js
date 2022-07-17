class Node {
  constructor(state, parent = null, action = null) {
    this.state = state;     // current state of the node. in this case it is the p5vector of the index in the 2D graph
    this.parent = parent;   // parent of the node. After expanding the node, all the child have the parent of the node.
    this.action = action;   // the next neighbor to be visited
    this.visited = false;   // for the purpose of coloring the node if it is expanded or not
  }
  
  // expand the node according to the problem 
  expand(problem) {
    var result = [];
    for (var action of problem.actions(this.state)) {     // problem.actions() gives the neighbors; top, right, bottom, left if exists
      result.push(this.childNode(problem, action));
    }
    return result;
  }

  checkNeighbor(problem) {
    var neighbors = this.expand(problem);
    return neighbors[floor(random() * neighbors.length)];
  }
  
  // creating the child node with the node as the parent and according to the problem
  childNode(problem, action) {
    var nextState = problem.result(this.state, action);
    var nextNode = new Node(nextState, this, action);
    return nextNode;
  }
  
  // returns the path from the current child to its all parents. and returns the reverse of it
  path() {
    var node = this;    // current node
    var pathBack = [];
    while (node) {
      pathBack.push(node);
      node = node.parent;   // now the current node changed to its parent
    }
    return pathBack.reverse();
  }

  show() {
    var x = this.state.x * w;
    var y = this.state.y * w;
    noFill();
    stroke(255, 20);
    rect(x, y, w, w);

    if (this.visited) {
      fill(255, 100);
      rect(x, y, w, w);
    }
  }

  goal() {
    var x = this.state.x * w;
    var y = this.state.y * w;
    fill(0, 255, 0);
    rect(x, y, w, w);
  }

  highlight() {
    var x = this.state.x * w;
    var y = this.state.y * w;
    fill(255, 0, 100);
    rect(x, y, w, w);
  }
}
