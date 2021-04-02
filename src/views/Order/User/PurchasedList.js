import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Api from "../../../services/Api";
import UserService from "../../../services/UserService";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import ReactToPrint from "react-to-print";
import PaymentWayText from "../../../components/Utils/PaymentWayText";
import PaymentStatusText from "../../../components/Utils/PaymentStatusText";

function PurchasedList() {

    const componentRef = useRef();
    const [statusFilter, setStatusFilter] = useState('-1');

    const [orders, setOrders] = useState('');
    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value)
        handleStatusFilter(event.target.value)
    }

    useEffect(() => {
            let url = `/api/v1/users/orders/mine`

            Api.get(`${url}`, axiosConfig)
                .then((res) => {
                    setOrders(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handleStatusFilter = (statusCode) => {

        let url = `/api/v1/users/orders/mine`

        if (statusCode !== "-1") {
            url = url + `?status=${statusCode}`
        }

        Api.get(`${url}`, axiosConfig)
            .then((res) => {
                setOrders(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="9">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Pedidos</Card.Title>
                            </Card.Header>
                            <Row>
                                <Col md="12">
                                    <Form.Group>
                                        <ReactToPrint
                                            trigger={() =>
                                                <Button className="m-2 btn-fill float-right" variant="info" size="sm">
                                                    Print / Export
                                                </Button>}
                                            content={() => componentRef.current}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <Form.Group className="m-2 float-right">
                                        <label>Status</label>
                                        <Form.Control
                                            value={statusFilter}
                                            onChange={handleStatusFilterChange}
                                            as="select"
                                            className="mr-sm-0"
                                            id="inlineFormCustomSelect"
                                            custom
                                        >
                                            <option value="-1">TODOS</option>
                                            <option value="1">ATIVO</option>
                                            <option value="0">INATIVO</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped" ref={componentRef}>
                                    <thead>
                                        <tr>
                                            <th className="border-0">Id</th>
                                            <th className="border-0">Estabelecimento</th>
                                            <th className="border-0">Forma de Pagamento</th>
                                            <th className="border-0">Status de Pagamento</th>
                                            <th className="border-0">Status de Preparo</th>
                                            <th className="border-0">Observação</th>
                                            <th className="border-0">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders && orders.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.establishment?.tradingName}</td>
                                                <PaymentWayText paymentWay={item.paymentWay}/>
                                                <PaymentStatusText paymentStatus={item.paymentStatus}/>
                                                <td>{item.preparationStatus?.description}</td>
                                                <td>{item.observation}</td>
                                                <td>{item.status === 1 ? "Ativo" : "Inativo"}</td>
                                                <td>
                                                    <Link to={`/home/user/order/purchased-order/${item.id}/details`}>
                                                        <Button className="btn-fill" variant="secondary" size="sm">
                                                            + Detalhes
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default PurchasedList;