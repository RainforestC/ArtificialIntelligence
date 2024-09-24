class Graph {
    nodes = new Map(); //结点结合
    edges = new Map(); //边集合
    addNode(node, x, y) {
      //添加结点
      let findNode = this.nodes.get(node);
      if (findNode == undefined) {
        this.nodes.set(node, { X: x, Y: y });//保存结点id和结点坐标
      }
    }
    addEdge(node1, x1, y1, node2, x2, y2, length) {
      //添加边，先添加结点
      this.addNode(node1, x1, y1);
      this.addNode(node2, x2, y2);
      //判断当前结点是否与别的结点相邻接
      let findNode1 = this.edges.get(node1);
      let findNode2 = this.edges.get(node2);
      if (findNode1 == undefined) {
        //无相邻结点，创建键值对表示邻接关系
        //键：当前结点；值：对象数组，每个对象表示相邻节点及当前节点与相邻节点的开销
        this.edges.set(node1, []);
        findNode1 = this.edges.get(node1);
      }
      if (findNode2 == undefined) {
        //无向图，两点间均有相邻关系
        this.edges.set(node2, []);
        findNode2 = this.edges.get(node2);
      }
      //添加邻接关系
      if (
        findNode1.find((node) => node.neighbor === node2) == undefined &&
        findNode2.find((node) => node.neighbor === node1) == undefined
      ) {
        findNode1.push({ neighbor: node2, cost: length });
        findNode2.push({ neighbor: node1, cost: length });
      }
    }
  }
  let RomaniaMap = new Graph();//定义图，开始插入
  RomaniaMap.addEdge("Arad", 87, 160, "Sibiu", 242, 210, 140);
  RomaniaMap.addEdge("Arad", 87, 160, "Timisoara", 90, 275, 118);
  RomaniaMap.addEdge("Arad", 87, 160, "Zerind", 110, 95, 75);
  RomaniaMap.addEdge("Bucharest", 495, 385, "Fagaras", 365, 220, 211);
  RomaniaMap.addEdge("Bucharest", 495, 385, "Glurgiu", 462, 465, 90);
  RomaniaMap.addEdge("Bucharest", 495, 385, "Pitesti", 385, 331, 101);
  RomaniaMap.addEdge("Bucharest", 495, 385, "Urziceni", 565, 358, 85);
  RomaniaMap.addEdge("Craiova", 300, 455, "Doberta", 189, 450, 120);
  RomaniaMap.addEdge("Craiova", 300, 455, "Pitesti", 385, 331, 138);
  RomaniaMap.addEdge("Craiova", 300, 455, "Rimmicu_Vikea", 285, 285, 146);
  RomaniaMap.addEdge("Doberta", 189, 450, "Mehadia", 190, 380, 75);
  RomaniaMap.addEdge("Eforie", 685, 435, "Hirsova", 660, 358, 86);
  RomaniaMap.addEdge("Fagaras", 365, 220, "Sibiu", 242, 210, 99);
  RomaniaMap.addEdge("Hirsova", 660, 358, "Urziceni", 565, 358, 98);
  RomaniaMap.addEdge("Iasi", 580, 150, "Neamt", 505, 110, 87);
  RomaniaMap.addEdge("Iasi", 580, 150, "Vaslui", 620, 230, 92);
  RomaniaMap.addEdge("Lugoj", 185, 310, "Mehadia", 190, 380, 70);
  RomaniaMap.addEdge("Lugoj", 185, 310, "Timisoara", 90, 275, 111);
  RomaniaMap.addEdge("Oradea", 146, 40, "Sibiu", 242, 210, 151);
  RomaniaMap.addEdge("Oradea", 146, 40, "Zerind", 110, 95, 71);
  RomaniaMap.addEdge("Pitesti", 385, 331, "Rimmicu_Vikea", 285, 285, 97);
  RomaniaMap.addEdge("Rimmicu_Vikea", 285, 285, "Sibiu", 242, 210, 80);
  RomaniaMap.addEdge("Urziceni", 565, 358, "Vaslui", 620, 230, 142);
  let nodes = Array.from(RomaniaMap.nodes);//获取图的关系
  let links = Array.from(RomaniaMap.edges).flatMap((d) => d[1].map((target) => ({ source: d[0], target })));
  let circles, lines, text, cost;//全局变量，画图使用
  let svg = d3.select("#mainsvg");
  const render_init = function () {
    //在画布上添加图形绘制地图
    lines = svg
      .selectAll(".line")
      .data(links)
      .join("line")
      .attr("stroke", "#5DADE2")
      .attr("opacity", 1)
      .attr("x1", (d) => RomaniaMap.nodes.get(d.source).X)
      .attr("x2", (d) => RomaniaMap.nodes.get(d.target.neighbor).X)
      .attr("y1", (d) => RomaniaMap.nodes.get(d.source).Y)
      .attr("y2", (d) => RomaniaMap.nodes.get(d.target.neighbor).Y);
    circles = svg
      .selectAll(".circle")
      .data(nodes)
      .join("circle")
      .attr("r", 5)
      .attr("fill", "#5DADE2")
      .attr("cx", (d) => RomaniaMap.nodes.get(d[0]).X)
      .attr("cy", (d) => RomaniaMap.nodes.get(d[0]).Y);
    text = svg
      .selectAll(".text")
      .data(nodes)
      .join("text")
      .attr("x", (d) => RomaniaMap.nodes.get(d[0]).X + 5)
      .attr("y", (d) => RomaniaMap.nodes.get(d[0]).Y + 5)
      .attr("font-family", "Arial")
      .attr("fill", "#5DADE2")
      .text(d => d[0])
    cost = svg
      .selectAll(".cost")
      .data(links)
      .join("text")
      .attr("font-family", "Arial")
      .attr("fill", "#5DADE2")
      .attr("x", (d) => (RomaniaMap.nodes.get(d.source).X + RomaniaMap.nodes.get(d.target.neighbor).X) / 2 + 5)
      .attr("y", (d) => (RomaniaMap.nodes.get(d.source).Y + RomaniaMap.nodes.get(d.target.neighbor).Y) / 2 - 2)
      .text(d => d.target.cost);
  }
  let suspend = 0;//阻止算法进行，实现中止算法
  let order = 0;//实现显示记录编号
  function Cost_Effectiveness_BFS(Source, Target) {
    // 代价一致的宽度优先算法：优先扩展最浅层中代价最小的未扩展结点
    suspend = 0;
    let start, end, start2, end2, BFS_time = 0, cost_path = 0;//前三个变量与计算算法用时有关，后一个与路径总开销有关
    let queue = new Array();//结点队列
    let queue_path = new Array();//路径队列
    let node_explored = new Set(); // 结点扩展集
    let edge_explored = []; // 边扩展集
    let edge_exploredTrue = [];//真正扩展了的边
    //避免有误查找
    let begin_neighbors = RomaniaMap.edges.get(Source);
    let end_neighbors = RomaniaMap.edges.get(Target);
    if (begin_neighbors == undefined) {
      console.log(`地图中无"${Source}"这个点`);
      return false;
    }
    if (end_neighbors == undefined) {
      console.log(`地图中无"${Target}"这个点`);
      return false;
    }
    let cur_node;//定义当前操作结点
    queue.push(Source); // 头结点进入队列
    queue_path.push([Source]);//初始路径只包含Source结点
    function StratExplor() {
      if (suspend == 1) {
        return false;
      }
      start = performance.now();//记录开始时间
      if (queue.length == 0) {
        return false;
      }
      cur_node = queue[0];
      cur_path = queue_path.shift();
      node_explored.add(queue.shift()); // 当前结点进入已扩展集合
      edge_exploredTrue = edge_explored.filter((d) => node_explored.has(d.source) && node_explored.has(d.target));
      end = performance.now();
      BFS_time = BFS_time + end - start;
      circles
        .transition()
        .attr("fill", function (d) {
          if (node_explored.has(d[0]) && cur_path.includes(d[0])) {
            return "red";
          }
          else if (node_explored.has(d[0])) {
            return "purple";
          }
          else {
            return "#5DADE2";
          }
        });
      text
        .transition()
        .attr("fill", function (d) {
          if (node_explored.has(d[0]) && cur_path.includes(d[0])) {
            return "red";
          }
          else if (node_explored.has(d[0])) {
            return "purple";
          }
          else {
            return "#5DADE2";
          }
        });
      cost
        .transition()
        .attr("fill", function (d) {
          if (edge_exploredTrue.find((obj) => obj.source == d.source && obj.target == d.target.neighbor) != undefined && cur_path.includes(d.source) && cur_path.includes(d.target.neighbor)) {
            return "red";
          }
          else if (edge_exploredTrue.find((obj) => obj.source == d.source && obj.target == d.target.neighbor)) {
            return "purple";
          }
          else {
            return "#5DADE2";
          }
        });
      lines
        .transition()
        .attr("stroke", function (d) {
          if (edge_exploredTrue.find((obj) => obj.source == d.source && obj.target == d.target.neighbor) != undefined && cur_path.includes(d.source) && cur_path.includes(d.target.neighbor)) {
            return "red";
          }
          else if (edge_exploredTrue.find((obj) => obj.source == d.source && obj.target == d.target.neighbor)) {
            return "purple";
          }
          else {
            return "#5DADE2";
          }
        });
        start2 = performance.now();
      if (cur_node == Target) {
        console.log("已到达目标节点")
        for(let i = 0; i<cur_path.length - 1; i++){
          cost_path += RomaniaMap.edges.get(cur_path[i]).find((obj) => obj.neighbor == cur_path[i+1]).cost;
        }
        order++;
        document.getElementById('showresult').innerHTML += `${order}、方式: BFS,起始节点: ${Source},结束结点: ${Target},已扩展结点数: ${node_explored.size},耗散值: ${cost_path},运行时间: ${BFS_time}ms` + "<br/>";
        return true;
      }
      let now_neighbors = RomaniaMap.edges
        .get(cur_node)
        .filter((Number) => !node_explored.has(Number.neighbor) && !queue.includes(Number.neighbor));
      var count = now_neighbors.length;
      for (let i = 0; i < count; i++) {
        let min_cost = Math.min(
          ...now_neighbors.map((now_neighbor) => now_neighbor.cost)
        );
        let next_node = now_neighbors.find(
          (Number) => Number.cost == min_cost
        ).neighbor; // 获得当前结点最小开销的邻接结点
        queue.push(next_node); // 最小开销的结点入队
        queue_path.push([...cur_path, next_node]);
        edge_explored.push({ source: cur_node, target: next_node });
        edge_explored.push({ source: next_node, target: cur_node })
        now_neighbors = now_neighbors.filter(
          (Number) => Number.cost != min_cost
        ); // 在原图中删除已经进入队列的结点
      }
      end2 = performance.now();
      BFS_time = BFS_time + end2 - start2;
      setTimeout(StratExplor, 2000);
    }
    StratExplor();
  }
  let h = new Map();
  h.set("Arad", 366);
  h.set("Bucharest", 0);
  h.set("Craiova", 160);
  h.set("Doberta", 242);
  h.set("Eforie", 161);
  h.set("Fagaras", 176);
  h.set("Glurgiu", 77);
  h.set("Hirsova", 151);
  h.set("Iasi", 226);
  h.set("Lugoj", 244);
  h.set("Mehadia", 241);
  h.set("Neamt", 234);
  h.set("Oradea", 380);
  h.set("Pitesti", 10);
  h.set("Rimmicu_Vikea", 193);
  h.set("Sibiu", 253);
  h.set("Timisoara", 329);
  h.set("Urziceni", 80);
  h.set("Vaslui", 199);
  h.set("Zerind", 374);
  function Greedy_Algorithm(Source, Target) {
    //贪心算法：优先扩展启发式函数评估出的最好的未扩展结点
    suspend = 0;
    let start, end, start2, end2, Greedy_time = 0, cost_path = 0;
    let node_explored = new Set(); // 结点扩展集
    let edge_explored = []; // 边扩展集
    let edge_exploredTrue = [];
    let begin_neighbors = RomaniaMap.edges.get(Source);
    let end_neighbors = RomaniaMap.edges.get(Target);
    if (begin_neighbors == undefined) {
      console.log(`地图中无"${Source}"这个点`);
      return false;
    }
    if (end_neighbors == undefined) {
      console.log(`地图中无"${Target}"这个点`);
      return false;
    }
    let next_node = Source;
    let cur_node;
    function StratExplor() {
      if (suspend == 1) {
        return false;
      }
      if (node_explored.has(next_node) == true) {
        circles
          .transition()
          .attr("fill", (d) => (node_explored.has(d[0]) ? "red" : "#5DADE2"));
        text
          .transition()
          .attr("fill", (d) => (node_explored.has(d[0]) ? "red" : "#5DADE2"));
        cost
          .transition()
          .attr("fill", (d) =>
            (edge_exploredTrue.find((obj) => obj.source == d.source && obj.target == d.target.neighbor) != undefined)
              ? "red"
              : "#5DADE2"
          );
        lines
          .transition()
          .attr("stroke", (d) =>
            (edge_exploredTrue.find((obj) => obj.source == d.source && obj.target == d.target.neighbor) != undefined)
              ? "red"
              : "#5DADE2"
          );
        order++;
        document.getElementById('showresult').innerHTML += `${order}、` + "贪心算法陷入死循环，本次搜索失败" + "<br/>" + `方式: Greedy_Algorithm,起始节点: ${Source},结束结点: ${Target},已扩展结点数: ${node_explored.size},耗散值: ${cost_path},运行时间: ${Greedy_time}ms,贪心算法陷入死循环，本次搜索失败` + "<br/>";
        return false;
      }
      start = performance.now();
      cur_node = next_node;
      node_explored.add(cur_node);
      edge_exploredTrue = edge_explored.filter((d) => node_explored.has(d.source) && node_explored.has(d.target));
      end = performance.now();
      Greedy_time = Greedy_time + end - start;
      circles
        .transition()
        .attr("fill", (d) => (node_explored.has(d[0]) ? "purple" : "#5DADE2"));
      text
        .transition()
        .attr("fill", (d) => (node_explored.has(d[0]) ? "purple" : "#5DADE2"));
      cost
        .transition()
        .attr("fill", (d) =>
          (edge_exploredTrue.find((obj) => obj.source == d.source && obj.target == d.target.neighbor) != undefined)
            ? "purple"
            : "#5DADE2"
        );
      lines
        .transition()
        .attr("stroke", (d) =>
          (edge_exploredTrue.find((obj) => obj.source == d.source && obj.target == d.target.neighbor) != undefined)
            ? "purple"
            : "#5DADE2"
        );
        start2 = performance.now();
      if (cur_node == Target) {
        order++;
        document.getElementById('showresult').innerHTML += `${order}、方式: Greedy_Algorithm,起始节点: ${Source},结束结点: ${Target},已扩展结点数: ${node_explored.size},耗散值: ${cost_path},运行时间: ${Greedy_time}ms` + "<br/>";
        return true;
      }
      let now_neighbors = links.filter((obj) => obj.source == cur_node);
      if (now_neighbors.length > 0) {
        let min = now_neighbors[0].target.neighbor;
        for (let i = 1; i < now_neighbors.length; i++) {
          if (h.get(now_neighbors[i].target.neighbor) < h.get(min)) {
            min = now_neighbors[i].target.neighbor;
          }
        }
        next_node = min;
        if (node_explored.has(next_node) == false) {
          cost_path = cost_path + (RomaniaMap.edges.get(cur_node).find((obj) => obj.neighbor == next_node).cost);
          edge_explored.push({ source: cur_node, target: next_node });
          edge_explored.push({ source: next_node, target: cur_node });
        }
      }
      end2 = performance.now();
      Greedy_time = Greedy_time + end2 - start2;
      setTimeout(StratExplor, 2000);
    }
    StratExplor();
  }
  function Astar_Algorithm(Source, Target) {
    suspend = 0;
    let start, end, start2, end2, Astar_time = 0, cost_path = 0;
    let node_explored = new Set(); // 结点扩展集
    let edge_explored = []; // 边扩展集
    let edge_exploredTrue = [];
    let begin_neighbors = RomaniaMap.edges.get(Source);
    let end_neighbors = RomaniaMap.edges.get(Target);
    let f = new Map();//到节点n已经产生的开销
    if (begin_neighbors == undefined) {
      console.log(`地图中无"${Source}"这个点`);
      return false;
    }
    if (end_neighbors == undefined) {
      console.log(`地图中无"${Target}"这个点`);
      return false;
    }
    f.set(Source, { target: Source, cost: 0 });
    let next_node = Source;
    let cur_node;
    function StratExplor() {
      if (suspend == 1) {
        return false;
      }
      if (node_explored.has(next_node) == true) {
        circles
          .transition()
          .attr("fill", (d) => (node_explored.has(d[0]) ? "red" : "#5DADE2"));
        text
          .transition()
          .attr("fill", (d) => (node_explored.has(d[0]) ? "red" : "#5DADE2"));
        cost
          .transition()
          .attr("fill", (d) =>
            (edge_exploredTrue.find((obj) => obj.source == d.source && obj.target == d.target.neighbor) != undefined)
              ? "red"
              : "#5DADE2"
          );
        lines
          .transition()
          .attr("stroke", (d) =>
            (edge_exploredTrue.find((obj) => obj.source == d.source && obj.target == d.target.neighbor) != undefined)
              ? "red"
              : "#5DADE2"
          );
        order++;
        document.getElementById('showresult').innerHTML += `${order}、` + "A*算法陷入死循环，本次搜索失败" + "<br/>" + `方式: Astar_Algorithm,起始节点: ${Source},结束结点: ${Target},已扩展结点数: ${node_explored.size},耗散值: ${cost_path},运行时间: ${Astar_time}ms` + "<br/>";
        return false;
      }
      start = performance.now();
      cur_node = next_node;
      node_explored.add(cur_node);
      edge_exploredTrue = edge_explored.filter((d) => node_explored.has(d.source) && node_explored.has(d.target));
      end = performance.now();
      Astar_time = Astar_time + end - start;
      circles
        .transition()
        .attr("fill", (d) => (node_explored.has(d[0]) ? "purple" : "#5DADE2"));
      text
        .transition()
        .attr("fill", (d) => (node_explored.has(d[0]) ? "purple" : "#5DADE2"));
      cost
        .transition()
        .attr("fill", (d) =>
          (edge_exploredTrue.find((obj) => obj.source == d.source && obj.target == d.target.neighbor) != undefined)
            ? "purple"
            : "#5DADE2"
        );
      lines
        .transition()
        .attr("stroke", (d) =>
          (edge_exploredTrue.find((obj) => obj.source == d.source && obj.target == d.target.neighbor) != undefined)
            ? "purple"
            : "#5DADE2"
        );
        start2 = performance.now();
      if (cur_node == Target) {
        order++;
        document.getElementById('showresult').innerHTML += `${order}、方式: Astar_Algorithm,起始节点: ${Source},结束结点: ${Target},已扩展结点数: ${node_explored.size},耗散值: ${cost_path},运行时间: ${Astar_time}ms` + "<br/>";
        return true;
      }
      let now_neighbors = links.filter((obj) => obj.source == cur_node);
      if (now_neighbors.length > 0) {
        let min = now_neighbors[0].target;
        for (let i = 1; i < now_neighbors.length; i++) {
          if (h.get(now_neighbors[i].target.neighbor) + f.get(Source).cost + now_neighbors[i].target.cost < h.get(min.neighbor) + f.get(Source).cost + min.cost) {
            min = now_neighbors[i].target;
          }
        }
        next_node = min.neighbor;
        if(node_explored.has(next_node) == false){
          cost_path = cost_path + RomaniaMap.edges.get(cur_node).find((obj) => obj.neighbor == next_node).cost;
          f.get(Source).Target = next_node;
          f.get(Source).cost += min.cost;
          edge_explored.push({ source: cur_node, target: next_node });
          edge_explored.push({ source: next_node, target: cur_node });
      }
    }
      end2 = performance.now();
      Astar_time = Astar_time + end2 - start2;
      setTimeout(StratExplor, 2000);
    }
    StratExplor();
  }
  function BFS_down() {
    document.getElementById('BFS').style.backgroundColor = "yellow";
  }
  function BFS_up(node1, node2) {
    Cost_Effectiveness_BFS(node1, node2);
    document.getElementById('BFS').style.backgroundColor = "#5DADE2";
  }
  function Greedy_down() {
    document.getElementById('Greedy_Algorithm').style.backgroundColor = "yellow";
  }
  function Greedy_up(node1, node2) {
    if (node2 != "Bucharest") {
      h.set("Arad",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Arad").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Arad").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Arad").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Arad").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Bucharest",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Bucharest").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Bucharest").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Bucharest").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Bucharest").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Craiova",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Craiova").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Craiova").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Craiova").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Craiova").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Doberta",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Doberta").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Doberta").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Doberta").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Doberta").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Eforie",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Eforie").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Eforie").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Eforie").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Eforie").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Fagaras",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Fagaras").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Fagaras").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Fagaras").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Fagaras").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Glurgiu",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Glurgiu").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Glurgiu").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Glurgiu").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Glurgiu").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Hirsova",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Hirsova").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Hirsova").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Hirsova").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Hirsova").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Iasi",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Iasi").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Iasi").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Iasi").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Iasi").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Lugoj",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Lugoj").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Lugoj").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Lugoj").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Lugoj").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Mehadia",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Mehadia").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Mehadia").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Mehadia").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Mehadia").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Neamt",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Neamt").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Neamt").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Neamt").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Neamt").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Oradea",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Oradea").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Oradea").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Oradea").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Oradea").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Pitesti",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Pitesti").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Pitesti").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Pitesti").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Pitesti").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Rimmicu_Vikea",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Rimmicu_Vikea").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Rimmicu_Vikea").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Rimmicu_Vikea").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Rimmicu_Vikea").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Sibiu",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Sibiu").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Sibiu").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Sibiu").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Sibiu").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Timisoara",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Timisoara").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Timisoara").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Timisoara").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Timisoara").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Urziceni",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Urziceni").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Urziceni").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Urziceni").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Urziceni").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Vaslui",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Vaslui").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Vaslui").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Vaslui").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Vaslui").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Zerind",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Zerind").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Zerind").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Zerind").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Zerind").Y - RomaniaMap.nodes.get(node2).Y))
        ));
    }
    Greedy_Algorithm(node1, node2);
    document.getElementById('Greedy_Algorithm').style.backgroundColor = "#5DADE2";
  }
  function Astar_down() {
    document.getElementById('Astar_Algorithm').style.backgroundColor = "yellow";
  }
  function Astar_up(node1, node2) {
    if (node2 != "Bucharest") {
      h.set("Arad",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Arad").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Arad").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Arad").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Arad").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Bucharest",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Bucharest").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Bucharest").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Bucharest").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Bucharest").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Craiova",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Craiova").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Craiova").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Craiova").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Craiova").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Doberta",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Doberta").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Doberta").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Doberta").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Doberta").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Eforie",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Eforie").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Eforie").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Eforie").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Eforie").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Fagaras",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Fagaras").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Fagaras").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Fagaras").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Fagaras").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Glurgiu",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Glurgiu").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Glurgiu").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Glurgiu").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Glurgiu").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Hirsova",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Hirsova").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Hirsova").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Hirsova").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Hirsova").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Iasi",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Iasi").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Iasi").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Iasi").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Iasi").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Lugoj",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Lugoj").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Lugoj").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Lugoj").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Lugoj").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Mehadia",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Mehadia").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Mehadia").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Mehadia").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Mehadia").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Neamt",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Neamt").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Neamt").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Neamt").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Neamt").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Oradea",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Oradea").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Oradea").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Oradea").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Oradea").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Pitesti",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Pitesti").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Pitesti").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Pitesti").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Pitesti").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Rimmicu_Vikea",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Rimmicu_Vikea").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Rimmicu_Vikea").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Rimmicu_Vikea").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Rimmicu_Vikea").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Sibiu",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Sibiu").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Sibiu").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Sibiu").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Sibiu").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Timisoara",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Timisoara").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Timisoara").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Timisoara").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Timisoara").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Urziceni",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Urziceni").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Urziceni").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Urziceni").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Urziceni").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Vaslui",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Vaslui").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Vaslui").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Vaslui").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Vaslui").Y - RomaniaMap.nodes.get(node2).Y))
        ));
      h.set("Zerind",
        Math.sqrt(
          (Math.abs(RomaniaMap.nodes.get("Zerind").X - RomaniaMap.nodes.get(node2).X))
          * (Math.abs(RomaniaMap.nodes.get("Zerind").X - RomaniaMap.nodes.get(node2).X))
          + (Math.abs(RomaniaMap.nodes.get("Zerind").Y - RomaniaMap.nodes.get(node2).Y))
          * (Math.abs(RomaniaMap.nodes.get("Zerind").Y - RomaniaMap.nodes.get(node2).Y))
        ));
    }
    Astar_Algorithm(node1, node2);
    document.getElementById('Astar_Algorithm').style.backgroundColor = "#5DADE2";
  }
  function Stop_down() {
    document.getElementById('Stop').style.backgroundColor = "yellow";
    console.clear();
    suspend = 1;
    circles
      .transition()
      .attr("fill", "#5DADE2");
    text
      .transition()
      .attr("fill", "#5DADE2");
    cost
      .transition()
      .attr("fill", "#5DADE2");
    lines
      .transition()
      .attr("stroke", "#5DADE2");
  }
  function Stop_up() {
    document.getElementById('Stop').style.backgroundColor = "#5DADE2";
  }
  function Clear_down() {
    document.getElementById('clear').style.backgroundColor = "yellow";
    document.getElementById('showresult').innerHTML = "";
  }
  function Clear_up() {
    document.getElementById('clear').style.backgroundColor = "#5DADE2";
    order = 0;
  }
  render_init();//渲染生成地图
