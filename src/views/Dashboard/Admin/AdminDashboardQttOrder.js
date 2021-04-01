import React, {useEffect, useState} from 'react';
import {Chart} from "react-google-charts";
import Api from "../../../services/Api";
import UserService from "../../../services/UserService";

function AdminDashboardQttOrder() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};
    const [ordersByMonth, setOrdersByMonth] = useState('');
    const [ordersByMonthDasboard, setOrdersByMonthDasboard] = useState([]);

    useEffect(() => {
            Api.get(`/api/v1/dashboard/admin/ordersByMonth`, axiosConfig)
                .then((res) => {
                    setOrdersByMonth(res.data)
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
            line.push(i.indice, i.qtt)
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
                    // data={[
                    //     ['City', '2010 Population'],
                    //     ['New York City, NY', 8175000],
                    //     ['Los Angeles, CA', 3792000],
                    //     ['Chicago, IL', 2695000],
                    //     ['Houston, TX', 2099000],
                    //     ['Philadelphia, PA', 1526000],
                    // ]}
                    data={ordersByMonthDasboard}
                    options={{
                        title: 'Quantidade de pedidos por mês',
                        chartArea: { width: '40%' },
                        hAxis: {
                            title: 'Total Pedidos',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Meses',
                        },
                    }}
                    legendToggle
                />
            </div>
        </>
    )
}

export default AdminDashboardQttOrder;





