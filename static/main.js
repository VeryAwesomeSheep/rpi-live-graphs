const ctx = document.getElementById('myChart').getContext('2d');

var graphData = {
  type: 'line',
  data: {
    labels: [5],
    datasets: [{
      label: 'RPi CPU Clock Speed',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [],
    }]
  },
  options: {}
}

var myChart = new Chart(ctx, graphData);

var socket = new WebSocket("ws://localhost:8000/ws/graph/");

socket.onmessage = function (e) {
  var djangoData = JSON.parse(e.data);
  console.log(djangoData);

  var newGraphData = graphData.data.datasets[0].data;

  if (newGraphData.length > 20) {
    newGraphData.shift();
  }

  newGraphData.push(djangoData.value);

  graphData.data.datasets[0].data = newGraphData;

  console.log(graphData.data.datasets[0].data);

  const now = new Date();

  var newLabels = graphData.data.labels;
  if (newLabels.length > 20) {
    newLabels.shift();
  }

  newLabels.push(now.toLocaleString('pl-PL'));

  graphData.data.labels = newLabels;

  console.log(graphData.data.labels);

  myChart.update();
};