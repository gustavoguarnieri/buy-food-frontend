import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Api from "../../services/Api";
import UserService from "../../services/UserService";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import WindowPrint from "components/Utils/WindowPrint.js"

function EstablishmentDeliveryList() {

    const [establishmentDeliveries, setEstablishmentDeliveries] = useState('');
    const [statusFilter, setStatusFilter] = useState('-1');
    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value)
        handleStatusFilter(event.target.value)
    }

    useEffect(() => {
            Api.get(`/api/v1/establishments/delivery-tax`, axiosConfig)
                .then((res) => {
                    setEstablishmentDeliveries(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handleStatusFilter = (statusCode) => {

        let url = `/api/v1/establishments/delivery-tax`

        if (statusCode !== "-1") {
            url = url + `?status=${statusCode}`
        }

        Api.get(`${url}`, axiosConfig)
            .then((res) => {
                setEstablishmentDeliveries(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDeleteEstablishment = (id) => {
        Api.delete(`/api/v1/establishments/delivery-tax/${id}`, axiosConfig)
            .then((res) => {
                console.log(res.data)
            })
            .then((res) => {
                alert("Deletado com sucesso!")
            })
            .catch((err) => {
                console.log(err)
            })
        window.location.reload();
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="5">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Lista de Taxas de Entrega</Card.Title>
                            </Card.Header>
                            <Row>
                                <Col md="12">
                                    <Form.Group>
                                        <Link to={`/home/establishment/delivery-tax/new`}>
                                            <Button className="m-2 btn-fill float-right" variant="info" size="sm">
                                                Novo
                                            </Button>
                                        </Link>
                                        <WindowPrint/>
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
                                <Table className="table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th className="border-0">Id</th>
                                            <th className="border-0">Valor</th>
                                            <th className="border-0">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {establishmentDeliveries && establishmentDeliveries.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>R$ {item.taxAmount}</td>
                                                <td>{item.status === 1 ? "Ativo" : "Inativo"}</td>
                                                <td>
                                                    {item.status === 1 ? (
                                                        <Button className="btn-fill" variant="danger" size="sm"
                                                                onClick={() => {
                                                                    if (window.confirm(`Deseja realmente deletar este item (R$ ${item.taxAmount}) ?`)) {
                                                                        handleDeleteEstablishment(item.id)
                                                                    }
                                                                }}>
                                                            Deletar
                                                        </Button>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </td>
                                                <td>
                                                    <Link to={`/home/establishment/delivery-tax/edit/${item.id}`}>
                                                        <Button className="btn-fill" variant="secondary" size="sm">
                                                            Editar
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

export default EstablishmentDeliveryList;