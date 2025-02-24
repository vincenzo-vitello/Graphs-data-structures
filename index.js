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
        let queue = [start];
        let result = [];
        let visited = {};

        visited[start] = true;
        
        while(queue.length > 0) {
            let current = queue.shift();
            result.push(current);
            this.adjList.get(current).forEach(neighbor => {
                if(!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor)
                }
            })
        }
        return result
    }
}

const graph = new Graph();

graph.addVertex("A");
graph.addVertex("B");
graph.addEdge("A", "B");

graph.printGraph();
console.log(graph.breadthFirstSearch('A'));