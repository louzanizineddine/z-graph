
export class Graph {
  // V : number of vertices
  // E : number of Edges
  constructor() {
    this.numV = 0;
    this.numE = 0;
    this.adj = new Map();
  }

  // addding a vertex to the graph

  addVertex(V) {
    // check if the V does not exist before adding
    if (this.getVertex(V) === undefined) {
      this.adj.set(V, []);
      this.numV++;
    }
    else {
      return new Error(`${V} does exist already`)
    }
  }

  deleteVertex(V) {
    if (!this.getVertex(V)) {
      return new Error(`Vertex ${V} does not exist`)
    } else {
      // we delete first all edges 
      this.getVertex(V).forEach(element => {
        this.deleteEdge(element, V);
        this.numE--;
      });

      this.adj.delete(V);
      this.numV--;
    }
  }



  addEdge(src, des) {
    if (this.getVertex(src) && this.getVertex(des)) {
      this.adj.get(src).push(des);
      this.adj.get(des).push(src);
      this.numE++;
    } else {
      return new Error(`either of Vertices or both does not exist`);
    }
  }

  deleteEdge(src, des) {
    let arr = this.getVertex(src);
    arr.forEach((elem, i, arr) => {
      if (elem === des) {
        arr.splice(i, 1);
        i--;
      }
    })
  }


  getVertex(V) {
    return this.adj.get(V);
  }

  bfs(s) {
    // we first mark all the vertices as not visited;
    let visited = new Map();

    this.adj.forEach((key, value) => {
      visited.set(key, false);
    })

    let q = [];

    // mard the currend starting vertex as visited

    visited.set(s, true);

    q.push(s);

    while (q.length != 0) {

      let front = q.shift();
      console.log(front);
      let list = this.adj.get(front);

      list.forEach(element => {
        if (!visited.get(element)) {
          visited.set(element, true);
          q.push(element);
        }
      });

    }


  }

  dfs(start , visted = new Set()) {
    visted.add(start);

    const neighbours = this.getVertex(start);

    for (const n of neighbours) {
      if (!visted.has(n)) {
        console.log(n);
        this.dfs(n , visted)
      }
    }
  }


  dijkstra(graph, source) {
    const distances = {};
    const previous = {};
    const queue = [];
  
    // Set initial distances to infinity and the source to 0
    for (const vertex in graph) {
      if (vertex === source) {
        distances[vertex] = 0;
        queue.push(vertex);
      } else {
        distances[vertex] = Infinity;
      }
      previous[vertex] = null;
    }
  
    // Process the queue until it is empty
    while (queue.length > 0) {
      queue.sort((a, b) => distances[a] - distances[b]);
  
      const currentVertex = queue.shift();

      for (const neighbor in graph[currentVertex]) {
        
        const distance = distances[currentVertex] + graph[currentVertex][neighbor];
        if (distance < distances[neighbor]) {
        
          distances[neighbor] = distance;
          previous[neighbor] = currentVertex;
          queue.push(neighbor);
        }
      }
    }
  
    return { distances, previous };
  }
  
}
