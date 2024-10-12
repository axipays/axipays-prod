import React from 'react';
import Plot from 'react-plotly.js';

const StackedBarChart = () => {
  const traceSuccess = {
    x: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    y: [30, 45, 28, 50, 60, 70, 55],  
    name: 'Success',
    type: 'bar',
    marker: {
      color: '#1d3558',  
    },
  };

  const traceFailed = {
    x: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    y: [10, 20, 15, 30, 25, 40, 35],  // Sample data for failed transactions
    name: 'Failed',
    type: 'bar',
    marker: {
      color: '#0066ff',  
    },
  };
 
  const traceIncomplete = {
    x: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    y: [5, 10, 7, 15, 12, 8, 14],  // Sample data for incomplete transactions
    name: 'Incomplete',
    type: 'bar',
    marker: {
      color: '#cfcfcf',  
    },
  };

  const data = [traceSuccess, traceFailed, traceIncomplete];

  const layout = {
    barmode: 'stack',
    xaxis: {
    },
    yaxis: {
    },
    bargap: 0.7,
    legend: {
      orientation: 'h', 
      x: 0,           
      y: 1.1,            
      xanchor: 'left', 
      yanchor: 'bottom'  
    },
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

export default StackedBarChart;
