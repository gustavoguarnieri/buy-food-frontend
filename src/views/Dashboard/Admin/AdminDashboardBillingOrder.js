import React, {useEffect, useState} from 'react';
import {Chart} from "react-google-charts";
import Api from "../../../services/Api";
import UserService from "../../../services/UserService";

function AdminDashboardBillingOrder() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};
    const [billingByMonthDasboard, setBillingByMonthDasboard] = useState([]);

    useEffect(() => {
            Api.get(`/api/v1/dashboard/admin/billing-by-month`, axiosConfig)
                .then((res) => {
                    handleBillingByMonthDasboard(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handleBillingByMonthDasboard = (orderParam) => {
        let lines = []
        let column = ["Meses", "Faturamento"]
        lines.push(column)

        orderParam.map((i => {
            let line = []
            line.push(i.indice, i.value)
            lines.push(line)
        }))
        
        setBillingByMonthDasboard(lines)
    }

    return (
        <>
            <div style={{ display: 'flex', maxWidth: 900 }}>
                <Chart
                    width={500}
                    height={300}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={billingByMonthDasboard}
                    options={{
                        title: 'Faturamento total dos estabelecimentos por mês',
                        chartArea: { width: '40%' },
                        hAxis: {
                            title: 'Meses',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Faturamento',
                        },
                    }}
                    legendToggle
                />
            </div>
        </>
    )
}

export default AdminDashboardBillingOrder;





