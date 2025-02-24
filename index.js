// Implementing an undirected graph

class Graph { // creating a graph class
    constructor(numOfVertices) {
        //defining the adjacency list using a Map provided with ES6 where each vertex will be a key, and its adjacent vertices will be stored in an array
        this.numOfVertices = numOfVertices;
        this.adjList = new Map();
    }
    addVertex(vertex) { // creating method to add a vertex to the graph
        this.adjList.set(vertex, []) // if the vertex does not already exist, initialize it with an empty array
    }
    addEdge(vertex, edge) { // creating method to add an edge 
        // ensure both vertices exist in the graph before adding an edge
        if (!this.adjList.has(vertex)) {
            this.addVertex(vertex);
        }
        if (!this.adjList.has(edge)) {
            this.addVertex(edge);
        } 
        // since this is an undirected graph, add an edge in both directions
        this.adjList.get(vertex).push(edge); 
        this.adjList.get(edge).push(vertex);
    }
    
    printGraph() { // method to console.log the adjacency list representation of the graph
        // get all vertices (keys) in the adjacency list
        for (let vertex of this.adjList.keys()) {
            // get the list of adjacent vertices
            let neighbors = this.adjList.get(vertex).join(" ");
            
            // log the vertex and its corresponding adjacency list
            console.log(`${vertex} -> ${neighbors}`);
        }
    }
    breadthFirstSearch(start) {
        // initializing an empty queue, empty result array & a visited map
        let queue = [start]; //Add the starting vertex to the queue
        let result = [];
        let visited = {};
        //add the starting vertex to the visited Map
        visited[start] = true;
        
        while(queue.length) {
            let current = queue.shift(); //dequeue and store current vertex
            result.push(current); // add current vertex to result array
            this.adjList.get(current).forEach(neighbor => { //foreach vertex, if vertex is not visited, add it to the visited map and enqueue vertex
                if(!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor)
                }
            })
        }
        console.log("BFS: ", result); // log result array
        return result
    }
    depthFirstSearch(start) {
       // initialize an empty stack, empty result array & a visited map
       const stack = [start]; //adding start to the stack
       const result = [];
       const visited = {};
    
       visited[start] = true; // adding start to visited Map

       while(stack.length) {
            let current = stack.pop(); // popping and storing current vertex
            result.push(current); // pushing current to result array

            this.adjList.get(current).forEach(neighbor => { //foreach vertex, if it's unvisited add it to the visited Map and pushing it's neighbor to the stack
                if(!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor)
                }
            })
       } 
       console.log("DFS: ", result); // logging result
       return result
    }
    connectedComponents() {
        let visited = new Set(); // initialize a set to keep track of visited nodes
        let count = 0; // counter for the number of connected components

        for(let node of this.adjList.keys()) {
            // if the node has not been visited, it means it's part of a new connected component
            if(!visited.has(node)) {
                // perform a search to visit all nodes in this component
                let nodes = this.depthFirstSearch(node);
                // mark all nodes in this component as visited
                nodes.forEach(element => visited.add(element));
                // increment the connected components count
                count++; 
            }
        } 
        console.log('connected components count: ', count); 
        return count;
    }

}

const graph = new Graph();

graph.addVertex("A");
graph.addVertex("B");
graph.addEdge("A", "B");
graph.addVertex("C");
graph.addVertex("D");
graph.addEdge("C", "D");

graph.printGraph();
graph.breadthFirstSearch('A');
graph.breadthFirstSearch('B');
graph.depthFirstSearch('A');
graph.connectedComponents();


Graph.prototype.dijkstra = function(start) {
    let distances = {}; // create an object to store the shortest distance from the start node to every other node
    let visited = new Set(); // to keep track of all visited nodes
    let nodes = [...this.adjList.keys()]; // store all the nodes

    // Initially, set the shortest distance to every node as Infinity
    for (let node of nodes) {
        distances[node] = Infinity;
    }

    // the distance from the start node to itself is 0
    distances[start] = 0;

    while (nodes.length) {
        // sort nodes by distance and pick the closest unvisited node
        nodes.sort((a, b) => distances[a] - distances[b]);
        let closestNode = nodes.shift();
        // mark the chosen node as visited
        visited.add(closestNode);

        // If the smallest distance is Infinity, it means remaining nodes are unreachable
        if (distances[closestNode] === Infinity) break;

        // update the distances to neighboring nodes (treating all edges as weight 1)
        for (let neighbor of this.adjList.get(closestNode)) {
            if (!visited.has(neighbor)) { // if the neighbor hasn't been visited yet
                let newDistance = distances[closestNode] + 1; // treat all edges as having weight 1

                if (newDistance < distances[neighbor]) { // if it's shorter than the previous distance to this neighbor, update it
                    distances[neighbor] = newDistance;
                }
            }
        }
    }

    console.log("distances: ", distances);
    return distances;
}
graph.dijkstra('A')