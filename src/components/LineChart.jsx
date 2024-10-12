import React from 'react';
import Plot from 'react-plotly.js';

const LineChart = () => {
  const trace1 = {
    x: ["Day1", "Day2", "Day3", "Day4", "Day5", "Day6", "Day7"],
    y: [43, 65, 34, 76, 56, 48, 61],
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: 'blue' }
  };

//   const trace2 = {
//     x: [1, 2, 3, 4],
//     y: [16, 5, 11, 9],
//     type: 'scatter',
//     mode: 'lines+markers',
//     marker: { color: 'red' }
//   };

  const data = [trace1];
  const layout = {
    plot_bgcolor: 'rgba(0, 0, 0, 0)',  // Transparent plot background
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
    margin: {
      l: 50,  // Left margin
      r: 50,  // Right margin
      t: 80, // Top margin
      b: 30   // Bottom margin
    },
  };
  return (
    <Plot
      data={data}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default LineChart;
