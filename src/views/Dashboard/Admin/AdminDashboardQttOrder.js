import React, {useEffect, useState} from 'react';
import {Chart} from "react-google-charts";
import Api from "../../../services/Api";
import UserService from "../../../services/UserService";

function AdminDashboardQttOrder() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};
    const [ordersByMonthDasboard, setOrdersByMonthDasboard] = useState([]);

    useEffect(() => {
            Api.get(`/api/v1/dashboard/admin/orders-by-month`, axiosConfig)
                .then((res) => {
                    // setOrdersByMonth(res.data)
                    handleOrdersByMonthDasboard(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handleOrdersByMonthDasboard = (orderParam) => {
        let lines = []
        let column = ["Meses", "Qtd pedidos"]
        lines.push(column)

        orderParam.map((i => {
            let line = []
            line.push(i.indice, i.value)
            lines.push(line)
        }))

        setOrdersByMonthDasboard(lines)
    }

    return (
        <>
            <div style={{ display: 'flex', maxWidth: 900 }}>
                <Chart
                    width={500}
                    height={300}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={ordersByMonthDasboard}
                    options={{
                        title: 'Quantidade de pedidos por mês',
                        chartArea: { width: '40%' },
                        hAxis: {
                            title: 'Meses',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Pedidos',
                        },
                    }}
                    legendToggle
                />
            </div>
        </>
    )
}

export default AdminDashboardQttOrder;





