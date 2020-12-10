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
    let a=0,b=0,c=0,d=0;
 
    for(let i=0; i<=res.length;i++){
      if ("Activo"==res[i]){
        a=a+1;
      }
      else if("Reflexivo"==res[i]){
        b=b+1;
      }
      else if("Teorico"==res[i]){
        c=c+1;
      }
      else if("Pragmatico"==res[i]){
        d=d+1;
      }
    }
    
    z = a + b + c + d;

    o = Math.floor(((a * 100) / z) * 100) / 100;
    p = Math.floor(((b * 100) / z) * 100) / 100;
    q = Math.floor(((c * 100) / z) * 100) / 100;
    r = Math.floor(((d * 100) / z) * 100) / 100;

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
          "Activo", "Reflexivo", "Teórico", "Pragmático",
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
          "Activo", "Reflexivo", "Teórico", "Pragmático",
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

