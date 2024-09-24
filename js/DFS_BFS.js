const graph = 
    {
        "a" : {
            name : "a",
            visited : false,
            neighbors : ["b","e","h","i"]
        },
        "b" : {
            name : "b",
            visited : false,
            neighbors : ["a","c"]
        },
        "c" : {
            name : "c",
            visited : false,
            neighbors : ["b","d","f"]
        },
        "d" : {
            name : "d",
            visited : false,
            neighbors : ["c","f","g"]
        },
        "e" : {
            name : "e",
            visited : false,
            neighbors : ["a","j"]
        },
        "f" : {
            name : "f",
            visited : false,
            neighbors : ["c","d","g"]
        },
        "g" : {
            name : "g",
            visited : false,
            neighbors : ["d","f"]
        },
        "h" : {
            name : "h",
            visited : false,
            neighbors : ["a","j","k"]
        },
        "i" : {
            name : "i",
            visited : false,
            neighbors : ["a","k"]
        },
        "j" : {
            name : "j",
            visited : false,
            neighbors : ["e","h"]
        },
        "k" : {
            name : "k",
            visited : false,
            neighbors : ["h","i"]
        }
    };

const visit = [];
const stack = [];


const dfs = function(graph,vertex) 
{ 
    graph[vertex].visited = true
    visit.push(graph[vertex].name);
    for (let next of graph[vertex].neighbors){
        if(graph[next].visited === false){
            dfs(graph,graph[next].name);
        }
    };
}


const bfs = function(graph,vertex){
    graph[vertex].visited = true
    visit.push(graph[vertex].name);
    stack.push(graph[vertex].name);
    while(stack.length>=1)
    {
        for(let next of graph[stack.shift()].neighbors){
            if(graph[next].visited === false){
                graph[next].visited = true;
                visit.push(next);
                stack.push(next);
            }
        }
    }
}

function start(){
    document.getElementById("start").disabled = true;
    document.getElementById("reset").disabled = false;
    let vertex = document.getElementById("begin").value;
    let end = document.getElementById("end").value;
    console.log(vertex);
    document.getElementById("bfs").disabled === true
    ?dfs(graph,vertex)
    :bfs(graph,vertex);
    let counter = 1;
    console.log(visit);
    for(nodes of visit){
        document.getElementById(counter.toString()).innerHTML = nodes.toString();
        if(nodes == end){
            document.getElementById(counter.toString()).style.backgroundColor = "red";
            break;
        }
        counter++;
    }
    document.getElementById("begin").disabled = true;
    document.getElementById("end").disabled = true;
    console.log(graph);

}

function clearPath(){
    for(let x=2;x<=11;x++){
        document.getElementById(x.toString()).style.backgroundColor = "white";
        document.getElementById(x.toString()).innerHTML = "";
    }
}

function reset(){
    document.getElementById("start").disabled = false;
    document.getElementById("reset").disabled = true;
    document.getElementById("begin").disabled = false;
    document.getElementById("end").disabled = false;
    visit.length=0;
    stack.length=0;
    resetGraph();
    clearPath();
}

function resetGraph(){
    for(elem in graph){
        graph[elem].visited = false;
    }
    console.log(graph);
}

function switchSearch(){
    document.getElementById("dfs").disabled = !document.getElementById("dfs").disabled;
    document.getElementById("bfs").disabled = !document.getElementById("bfs").disabled ;
}


