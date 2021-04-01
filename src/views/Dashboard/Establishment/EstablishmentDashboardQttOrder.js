import React, {useEffect, useState} from 'react';
import {Chart} from "react-google-charts";
import Api from "../../../services/Api";
import UserService from "../../../services/UserService";

function EstablishmentDashboardQttOrder() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};
    const [ordersByMonth, setOrdersByMonth] = useState('');
    const [ordersByMonthDasboard, setOrdersByMonthDasboard] = useState([]);

    useEffect(() => {
            Api.get(`/api/v1/establishments/dashboard/ordersByMonth/mine`, axiosConfig)
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
        // let total = 0
        //
        // let deliveryTax = orderParam.establishment?.deliveryTax ? orderParam.establishment.deliveryTax?.taxAmount : 0

        // const itens = Array.from(orderItens.length > 0 ? orderItens : product)
        // itens.push(product)
        // setOrderItens(itens)

        let data = Array.from()
        orderParam.map((i => {
            //let item = Array.from()
            data.push(i.indice, i.qtt)
        }))
        console.log(data)


        // total += deliveryTax
        //
        // setTotal(total)
    }

    return (
        <>
            <div style={{ display: 'flex', maxWidth: 900 }}>
                <Chart
                    width={500}
                    height={300}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['City', '2010 Population'],
                        ['New York City, NY', 8175000],
                        ['Los Angeles, CA', 3792000],
                        ['Chicago, IL', 2695000],
                        ['Houston, TX', 2099000],
                        ['Philadelphia, PA', 1526000],
                    ]}
                    options={{
                        title: 'Population of Largest U.S. Cities',
                        chartArea: { width: '40%' },
                        hAxis: {
                            title: 'Total Population',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'City',
                        },
                    }}
                    legendToggle
                />
            </div>
        </>
    )
}

export default EstablishmentDashboardQttOrder;





