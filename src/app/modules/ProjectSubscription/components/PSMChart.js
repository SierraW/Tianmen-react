import React, { useState, useEffect, useCallback } from "react";
import ApexCharts from 'react-apexcharts';
import PropTypes from "prop-types";
import { em_payment, em_room } from "../../../../services/firebaseInit";
import { formatDate } from "../../../../services/datePrintingService";

export default function ProjectSubscriptionManagementChart({ pid, setBillGates }) {

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
                formatter: function (val) {
                    return "$" + val;
                }
            }
        },
    }
    const [name, setName] = useState("");
    const [labels, setLabel] = useState([]);
    const [series, setSeries] = useState([]);
    const cbNextBillDate = useCallback(() => {
        if (labels.length === 0) {
            return null;
        } else {
            var date = new Date(labels[0]);
            date.setMonth(date.getMonth() + 1);
            date.setDate(date.getDate() + 1);
            return formatDate(date);
        }
    }, [labels]);

    useEffect(() => {
        em_room(pid).get().then((doc) => {
            setName(doc.data().name);
        })
        var unsubscribe = em_payment(pid).onSnapshot((querySnapshot) => {
            var resultArrLabel = [], resultArrSeries = []
            querySnapshot.forEach((doc) => {
                resultArrLabel.push(doc.data().date);
                resultArrSeries.push(doc.data().amount);
            })
            if (resultArrSeries.length > 0) {
                setLabel(resultArrLabel);
                setSeries(resultArrSeries);
            }
        })
        return function cleanup() {
            unsubscribe();
        };
    }, [pid]);

    useEffect(() => {
        const nextBillGates = cbNextBillDate();
        if (nextBillGates) {
            setBillGates(nextBillGates);
        }
    }, [labels, cbNextBillDate, setBillGates]);

    return <>
        <ApexCharts options={{ ...basicOptions, labels }} series={[{ name, data: series }]} type="area" height={350} />
    </>
}

ProjectSubscriptionManagementChart.propTypes = {
    pid: PropTypes.string.isRequired,
    setBillGates: PropTypes.func.isRequired
}