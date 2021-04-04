import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Api from "../../../services/Api";
import UserService from "../../../services/UserService";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import ReactToPrint from "react-to-print";
import PaymentStatusText from "../../../components/Utils/PaymentStatusText";
import Establishment from "../../../components/Utils/Establishment";

function PurchasedEstablishmentList() {

    const componentRef = useRef();
    const [establishments, setEstablishments] = useState('');
    const [establishmentId, setEstablishmentId] = useState('-1');
    const [statusFilter, setStatusFilter] = useState('-1');

    const [orders, setOrders] = useState('');
    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value)
        handleStatusFilter(event.target.value)
    }

    const handleEstablishmentChange = (event) => {
        setEstablishmentId(event.target.value)

        if (event.target.value === "-1") {
            return
        }

        let url = `/api/v1/establishments/orders`

        if (statusFilter !== "-1") {
            url += `?status=${statusFilter}&establishment=${event.target.value}`
        } else {
            url += `?establishment=${event.target.value}`
        }

        Api.get(url, axiosConfig)
            .then((res) => {
                setOrders(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
            let url

            if (UserService.hasRole("admin")) {
                url = `/api/v1/establishments?status=1`
            } else {
                url = `/api/v1/establishments/mine?status=1`
            }

            Api.get(`${url}`, axiosConfig)
                .then((res) => {
                    setEstablishments(res.data)
                })
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 401) {
                            UserService.doLogout()
                        }
                    }
                })
        },
        []
    )

    const handleStatusFilter = (statusCode) => {

        if (establishmentId === "-1") {
            alert("Selecione um estabelecimento para filtrar os registros")
            return
        }

        let url = `/api/v1/establishments/orders`

        if (statusCode !== "-1") {
            url += `?status=${statusCode}&establishment=${establishmentId}`
        } else {
            url += `?establishment=${establishmentId}`
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
                                <Card.Title as="h4">Lista de Pedidos</Card.Title>
                            </Card.Header>
                            <Row>
                                <Col md="12">
                                    <Form.Group>
                                        <ReactToPrint
                                            trigger={() =>
                                                <Button className="m-2 btn-fill float-right" variant="info" size="sm">
                                                    Imprimir / Exportar
                                                </Button>}
                                            content={() => componentRef.current}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="10">
                                    <Form.Group className="m-2 float-right">
                                        <label>Estabelecimento</label>
                                        <Establishment establishments={establishments}
                                                       establishment={establishmentId}
                                                       handleEstablishmentChange={handleEstablishmentChange}
                                                       isSelectVisible={true}/>
                                    </Form.Group>
                                </Col>
                                <Col md="2">
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
                                            <option key="-1" value="-1">TODOS</option>
                                            <option key="1" value="1">ATIVO</option>
                                            <option key="0" value="0">INATIVO</option>
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
                                        <th className="border-0">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders && orders.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.establishment?.tradingName}</td>
                                            <td>{item.paymentWay?.description}</td>
                                            <PaymentStatusText paymentStatus={item.paymentStatus}/>
                                            <td>{item.preparationStatus?.description}</td>
                                            <td>{item.status === 1 ? "Ativo" : "Inativo"}</td>
                                            <td>
                                                {UserService.hasRole("admin") ? (
                                                    <></>
                                                ) : (
                                                    <Link to={`/home/establishment/order/purchasedOrder/${item.id}/edit`}>
                                                        <Button className="btn-fill" variant="secondary" size="sm">
                                                            Editar
                                                        </Button>
                                                    </Link>
                                                )}
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

export default PurchasedEstablishmentList;