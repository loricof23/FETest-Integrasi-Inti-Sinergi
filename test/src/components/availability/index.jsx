import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { connect } from 'react-redux';

import './availability.scss';
 

const COLORS = ['#228B22', '#FF4500'];

const Availability = ({pieData}) => {
  return (
    <div className="avail">
     <p className="ratio-name">Availability Ratio</p>
      <PieChart width={410} height={230}>
        <Pie
          data={pieData}
          cx="50%"
          cy="40%"
          innerRadius={45}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Legend/>
      </PieChart>  
        <div className="pie">
          {pieData.map((item, index) => {
            return(
              <div >
                <div className="pie-number">{pieData[index].value}</div>
              </div>
            )
          })}
        </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pieData: state.pieData,
  }
}

export default connect(mapStateToProps, {})(Availability);