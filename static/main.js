const ctx = document.getElementById('myChart').getContext('2d');

var graphData = {
  type: 'line',
  data: {
    labels: [5],
    datasets: [{
      label: 'RPi CPU Temperature',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [],
    }]
  },
  options: {}
}

var myChart = new Chart(ctx, graphData);

var socket = new WebSocket("ws://xxx.xxx.xxx.xxx:8000/ws/graph/"); // change to IP of RPi

socket.onmessage = function (e) {
  // Data from consumers.py
  var djangoData = JSON.parse(e.data);

  // Fetching currently displayed data
  var newGraphData = graphData.data.datasets[0].data;

  // Dropping oldest value if graph has more than 20 points
  if (newGraphData.length > 20) {
    newGraphData.shift();
  }

  // Appending new data to list
  newGraphData.push(djangoData.value);

  // Assigning modified data to list of displayed data
  graphData.data.datasets[0].data = newGraphData;

  // Fetching currently displayed time stamps
  var newLabels = graphData.data.labels;

  // Dropping oldest value if graph has 20 points
  if (newLabels.length > 20) {
    newLabels.shift();
  }

  // Getting current date and time
  const now = new Date();

  // Appending new time stamp to list
  newLabels.push(now.toLocaleString('pl-PL'));

  // Assigning modified data to list of displayed time stamps
  graphData.data.labels = newLabels;

  // Updating the graph
  myChart.update();
};
