import React, {useEffect, useState} from 'react';
import {Chart} from "react-google-charts";
import Api from "../../../services/Api";
import UserService from "../../../services/UserService";
import {Container, Row} from "react-bootstrap";

function AdminDashboardOrder() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};
    const [ordersByMonthDasboard, setOrdersByMonthDasboard] = useState([["Meses", "Qtd pedidos"],["", 0]]);
    const [billingByMonthDasboard, setBillingByMonthDasboard] = useState([["Meses", "Faturamento"],["", 0]]);
    const [preparationStatusDasboard, setPreparationStatus] = useState([["Meses", "Qtd"],["", 0]]);
    const [paymentWay, setPaymentWay] = useState([["Meses", "Forma Pagamento"], ["", 0]]);
    const [paymentDeclinedStatus, setPaymentDeclinedStatus] = useState([["Meses", "Pagamento Recusado"], ["", 0]]);

    useEffect(() => {
            Api.get(`/api/v1/dashboard/admin/orders-by-month`, axiosConfig)
                .then((res) => {
                    handleOrdersByMonthDasboard(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

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

    useEffect(() => {
            Api.get(`/api/v1/dashboard/admin/preparation-status`, axiosConfig)
                .then((res) => {
                    handlePreparationStatusDasboard(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    useEffect(() => {
            Api.get(`/api/v1/dashboard/admin/payment-way`, axiosConfig)
                .then((res) => {
                    handlePaymentWayDasboard(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    useEffect(() => {
            Api.get(`/api/v1/dashboard/admin/payment-declined-status`, axiosConfig)
                .then((res) => {
                    handlePaymentDeclinedStatus(res.data)
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

    const handlePreparationStatusDasboard = (orderParam) => {
        let lines = []
        let column = ["Meses", "Qtd"]
        lines.push(column)

        orderParam.map((i => {
            let line = []
            line.push(i.indice, i.value)
            lines.push(line)
        }))

        setPreparationStatus(lines)
    }

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

    const handlePaymentWayDasboard = (orderParam) => {
        let lines = []
        let column = ["Meses", "Forma Pagamento"]
        lines.push(column)

        orderParam.map((i => {
            let line = []
            line.push(i.indice, i.value)
            lines.push(line)
        }))

        setPaymentWay(lines)
    }

    const handlePaymentDeclinedStatus = (orderParam) => {
        let lines = []
        let column = ["Meses", "Pagamento Recusado"]
        lines.push(column)

        orderParam.map((i => {
            let line = []
            line.push(i.indice, i.value)
            lines.push(line)
        }))

        setPaymentDeclinedStatus(lines)
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <div style={{display: 'flex', maxWidth: 900}}>
                        <Chart
                            width={390}
                            height={260}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={ordersByMonthDasboard}
                            options={{
                                title: 'Pedidos',
                                chartArea: {width: '40%'},
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
                    <div style={{display: 'flex', maxWidth: 900}}>
                        <Chart
                            width={390}
                            height={260}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={billingByMonthDasboard}
                            options={{
                                title: 'Faturamento total',
                                chartArea: {width: '40%'},
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
                </Row>
                <Row>
                    <div style={{display: 'flex', maxWidth: 900}}>
                        <Chart
                            width={390}
                            height={260}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={preparationStatusDasboard}
                            options={{
                                title: 'Status de preparo',
                                chartArea: {width: '40%'},
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
                    <div style={{display: 'flex', maxWidth: 900}}>
                        <Chart
                            width={390}
                            height={260}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={paymentWay}
                            options={{
                                title: 'Forma de pagamento',
                                chartArea: {width: '40%'},
                                hAxis: {
                                    title: 'Meses',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Forma de pagamento',
                                },
                            }}
                            legendToggle
                        />
                    </div>
                </Row>
                <Row>
                    <div style={{display: 'flex', maxWidth: 900}}>
                        <Chart
                            width={390}
                            height={260}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={paymentDeclinedStatus}
                            options={{
                                title: 'Forma de pagamento',
                                chartArea: {width: '40%'},
                                hAxis: {
                                    title: 'Meses',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Forma de pagamento',
                                },
                            }}
                            legendToggle
                        />
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default AdminDashboardOrder;





