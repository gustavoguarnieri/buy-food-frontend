import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Api from "../../services/Api";
import UserService from "../../services/UserService";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import ReactToPrint from "react-to-print";
import UtilService from "../../services/UtilService";

function EstablishmentDeliveryList() {

    const componentRef = useRef();
    const [establishmentDeliveries, setEstablishmentDeliveries] = useState('');
    const [statusFilter, setStatusFilter] = useState('-1');
    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value)
        handleStatusFilter(event.target.value)
    }

    useEffect(() => {
            handleEstablishment()
        },
        []
    )

    const handleEstablishment = () => {

        let url

        if (UserService.hasRole("admin")) {
            url = `/api/v1/establishments/delivery-tax`
        } else {
            url = `/api/v1/establishments/delivery-tax/mine`
        }

        Api.get(url, axiosConfig)
            .then((res) => {
                setEstablishmentDeliveries(res.data)
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401) {
                        UserService.doLogout()
                    }
                }
            })
    }

    const handleStatusFilter = (statusCode) => {

        let url = `/api/v1/establishments/delivery-tax/mine`

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

    const handleDeleteEstablishment = async (id) => {
        await Api.delete(`/api/v1/establishments/delivery-tax/${id}`, axiosConfig)
            .then((res) => {
                console.log(res.data)
            })
            .then((res) => {
                alert("Removido com sucesso!")
            })
            .catch((err) => {
                console.log(err)
            })

        await handleEstablishment()
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
                                            <th className="border-0">Valor</th>
                                            <th className="border-0">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {establishmentDeliveries && establishmentDeliveries.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{UtilService.formCurrency(item.taxAmount)}</td>
                                                <td>{item.status === 1 ? "Ativo" : "Inativo"}</td>
                                                <td>
                                                    {item.status === 1 ? (
                                                        <Button className="btn-fill" variant="danger" size="sm"
                                                                onClick={() => {
                                                                    if (window.confirm(`Deseja realmente remover este item (R$ ${item.taxAmount}) ?`)) {
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
                                                    <Link to={`/home/establishment/delivery-tax/${item.id}/edit`}>
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