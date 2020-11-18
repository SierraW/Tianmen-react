import React, { useState } from "react";
import ApexCharts from 'react-apexcharts';

export default function ProjectSubscriptionManagementChart({name}) {

    const basicOptions = {
        chart: {
            type: 'area',
            height: 350,
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },

        title: {
            text: 'Monthly Sales',
            align: 'left'
        },
        subtitle: {
            text: 'record',
            align: 'left'
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            opposite: true
        },
        legend: {
            horizontalAlign: 'left'
        },
        tooltip: {
            y: {
              formatter: function(val) {
                return "$" + val;
              }
            }
        },
    }
    const [labels, setLabel] = useState({
        labels: ["2020", "2021", "2022"]
    })
    const [series, setSeries] = useState([{
        name,
        data: [5000, 6000, 7000]
    }])


    return <>
        <ApexCharts options={{...basicOptions, ...labels}} series={series} type="area" height={350} />
    </>
}

// series: [{
//     name: "STOCK ABC",
//     data: series.monthDataSeries1.prices
//   }],
//   options: {
//     
//   },