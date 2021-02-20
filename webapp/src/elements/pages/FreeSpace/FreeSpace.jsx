import React, { useState, useEffect } from 'react'
import WsService from '../../../services/wsService'
import { PieChart } from 'react-minimal-pie-chart';


export default function () {

    var [ocupado, setOcupado] = useState({ title: 'Ocupado', value: 0, color: '#C13C37' });
    var [total, setTotal] = useState({ title: 'Total', value: 1000, color: '#C13C37' });

    useEffect(() => {

        async function loadDataChart() {

            var freeSpace = await WsService.getFreeSpace();

            debugger;
            if (!!freeSpace) {
                setOcupado({ value: total.value - freeSpace })
            }
        }

        loadDataChart();

    }, []);

    const defaultLabelStyle = {
        fontSize: '5px',
        fontFamily: 'sans-serif',
      };

    const shiftSize = 7;

    return (
      <PieChart
        data={[total,ocupado]}
        radius={PieChart.defaultProps.radius - shiftSize}
        segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
        label={({ dataEntry }) => dataEntry.value}
        labelStyle={{
          ...defaultLabelStyle,
        }}
      />)

}