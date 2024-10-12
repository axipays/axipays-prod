import React from 'react';
import Plot from 'react-plotly.js';

const CountryMap = () => {
    const data = [{
        type: 'scattergeo',
        mode: 'markers',
        locations: ['FRA', 'DEU', 'RUS', 'ESP'],
        marker: {
          size: [20, 30, 15, 50],
          color: [10, 20, 40, 30],
          cmin: 0,
          cmax: 50,
          colorscale: 'Blues',
          showscale: false,
          // colorbar: {
          //   title: 'Some rate',
          //   ticksuffix: '%',
          //   showticksuffix: 'last'
          // },
        //   line: {
        //     color: 'black'
        //   }
        },
        name: 'world data'
      }];
    
      const layout = {
        geo: {
          scope: 'world', // Show the entire world
          resolution: 50,
          showland: true, // Show land areas
          landcolor: '#cfcfcf', 
          subunitcolor: 'white', // Color of country borders
          countrycolor: 'white', // Color of countries
          coastlinecolor: 'white', 
          showcountries: true,
          showframe: false,
        },
        margin: {
          l: 0, // left margin
          r: 0, // right margin
          t: 0, // top margin
          b: 0  // bottom margin
        },
        // width: 800, 
        // height: 300, 
      };
    
      return (
       
        <Plot
          data={data}
          layout={layout}
          style={{ width: "100%", height: "100%" }} 
        />
       
      );
};

export default CountryMap;