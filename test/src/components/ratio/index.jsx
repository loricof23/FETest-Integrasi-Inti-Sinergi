import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { connect } from 'react-redux';

import './ratio.scss';


const Ratio = ({chartData}) => {
  console.log(chartData);
  if (chartData.length === 0) {
    return null;
  }


  return (
    <div className="ratio">
      <p className="ratio-name">Category Ratio</p>
      <div className="category-ratio">
        {chartData.map((item, index) => {
          return (
            <div className={`category-${index+1}`}>
              <div className="category-name">Category {index + 1}</div>
              <div className="category-number">{chartData[index].pv}</div>
            </div>
          )
        })}       
      </div>

      <BarChart
        width={425}
        height={250}
        data={chartData}
        margin={{
          top: 5,
          right: 10,
          left: -45,
          bottom: 5,
        }}
        barSize={75}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 40, right: 20 }} />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="2 2" />
        <Bar dataKey="pv" fill="#FF4500" />
        
      </BarChart>
    </div>
    
  );
}

const mapStateToProps = (state) => {
  return {
    chartData: state.chartData,
  }
}

export default connect(mapStateToProps, {})(Ratio) ;