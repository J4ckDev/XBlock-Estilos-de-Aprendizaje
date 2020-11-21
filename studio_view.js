function MyBlock(runtime, element) {
  document.querySelector(".showResults").addEventListener("click", showResults);

  function showResults() {
    var u = runtime.handlerUrl(element, 'graficardatos');

    $.ajax({
      type: "post",
      url: u,
      data: JSON.stringify({ "name": name }),
      success: updateCount
    });
  }

  function updateCount(result) {
    let res = result.resultado;

    a = res[0];
    b = res[1];
    c = res[2];
    d = res[3];

    z = a[0] + b[0] + c[0] + d[0];

    o = Math.floor(((a[0] * 100) / z) * 100) / 100;
    p = Math.floor(((b[0] * 100) / z) * 100) / 100;;
    q = Math.floor(((c[0] * 100) / z) * 100) / 100;;
    r = Math.floor(((d[0] * 100) / z) * 100) / 100;;

    var Chartgrafico = {
      type: "pie",
      data: {
        datasets: [{
          data: [o, p, q, r],
          backgroundColor: [
            "red", "green", "blue", "yellow",
          ],
        }],
        labels: [
          "Test1", "Test2", "Test3", "Test4",
        ]
      },
      options: {
        responsive: true,
      }
    }

    var grafica = document.getElementById('grafico').getContext('2d');
    window.pie = new Chart(grafica, Chartgrafico);

    var Chartgrafico2 = {
      type: "bar",
      data: {
        datasets: [{
          label: 'Porcentaje',
          data: [o, p, q, r],
          backgroundColor: [
            "red", "green", "blue", "yellow",
          ],
        }],
        labels: [
          "Test1", "Test2", "Test3", "Test4",
        ]
      },
      options: {
        responsive: true,
        scales: {

          yAxes: [{
            stacked: true,
            ticks: {
              callback: function (value) { return value + "%" }
            },
            scaleLabel: {
              display: true,
              labelString: "Porcentaje"
            }
          }]
        }
      }
    }
    var grafica2 = document.getElementById('grafico2').getContext('2d');
    window.pie = new Chart(grafica2, Chartgrafico2);
  }
}

