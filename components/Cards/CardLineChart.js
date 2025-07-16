import React from 'react';
import Chart from 'chart.js/auto';

export default function CardLineChart() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const config = {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: '#4c51bf',
            borderColor: '#4c51bf',
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: '#fff',
            borderColor: '#fff',
            data: [40, 68, 86, 74, 56, 60, 87],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: 'Sales Charts',
          fontColor: 'white',
        },
        legend: {
          labels: {
            fontColor: 'white',
          },
          align: 'end',
          position: 'bottom',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: 'rgba(255,255,255,.7)',
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Month',
                fontColor: 'white',
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: 'rgba(33, 37, 41, 0.3)',
                zeroLineColor: 'rgba(0, 0, 0, 0)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'rgba(255,255,255,.7)',
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Value',
                fontColor: 'white',
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: 'rgba(255, 255, 255, 0.15)',
                zeroLineColor: 'rgba(33, 37, 41, 0)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };

    let chartInstance;
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      chartInstance = new Chart(ctx, config);
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">Overview</h6>
              <h2 className="text-white text-xl font-semibold">Ticket Closed</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas ref={canvasRef} id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

// import React from 'react';
// import Chart from 'chart.js/auto';

// export default function CardLineChart() {
//   const canvasRef = React.useRef(null);

//   React.useEffect(() => {
//     let chart;
//     if (canvasRef.current) {
//       const ctx = canvasRef.current.getContext('2d');
//       chart = new Chart(ctx, {
//         type: 'pie',
//         data: {
//           labels: ['Wazuh', 'Incident Response', 'Others'],
//           datasets: [
//             {
//               label: 'Unresolved Tickets',
//               data: [10, 25, 7],
//               backgroundColor: [
//                 '#4c51bf', // Wazuh
//                 '#f56565', // Incident Response
//                 '#ed8936', // Others
//               ],
//               borderColor: '#fff',
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           plugins: {
//             legend: {
//               position: 'bottom',
//               labels: {
//                 color: 'white',
//               },
//             },
//             tooltip: {
//               callbacks: {
//                 label: function (context) {
//                   return `${context.label}: ${context.raw} tickets`;
//                 },
//               },
//             },
//           },
//         },
//       });
//     }

//     return () => {
//       if (chart) {
//         chart.destroy();
//       }
//     };
//   }, []);

//   return (
//     <>
//       <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
//         <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
//           <div className="flex flex-wrap items-center">
//             <div className="relative w-full max-w-full flex-grow flex-1">
//               <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">Overview</h6>
//               <h2 className="text-white text-xl font-semibold">Unresolved Tickets by Group</h2>
//             </div>
//           </div>
//         </div>
//         <div className="p-4 flex-auto">
//           <div className="relative h-96">
//             <canvas ref={canvasRef} id="pie-chart"></canvas>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
