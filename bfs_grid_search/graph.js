class Graph {
  constructor(graphDict = null, directed = true) {
    if (graphDict) {
      this.graphDict = graphDict;
    } else {
      this.graphDict = {};
    }
    this.directed = directed;

    if (!directed) {
      this.makeUndirected();
    }
  }

  makeUndirected() {
    for (var parent of Object.keys(this.graphDict)) {     // each key in the graphdict
      for (var child of this.graphDict[parent]) {         // each value from the value list
        if (child in this.graphDict) {                    // if child exists in the key list
          if (!this.graphDict[child].includes(parent)) {  // if that child's value doesn't contain the parent
            this.connect(child, parent);
          }
        } else {                                          // if the child is not in the graph.. tadaaa! your undirected graph is ready!!!!
          this.connect(child, parent);
        }
      }
    }
  }
  
  // making connection between two nodes in the graph
  connect(A, B) {
    setDefault(this.graphDict, A, []).push(B);
  }

  // gets the neigbor cells
  gets(a) {
    return this.graphDict[a];
  }

  nodes() {
    var s1 = new Set();
    for (var k of Object.keys(this.graphDict)) {
      s1.add(k);
    }
    return s1;
  }
}

// making a undirected graph and returns teh Graph instance
function UndirectedGraph(graphDict = null) {
  return new Graph(graphDict, false);
}

// just like the pyhton dictionary setdefault() method. 
// it just return the value of the key given, if not create a default value to null or given
function setDefault(dict, key, value = null) {
  if (dict[key]) {
    return dict[key];
  } else if (!dict[key] && value) {
    dict[key] = value;
    return dict[key];
  }
}
