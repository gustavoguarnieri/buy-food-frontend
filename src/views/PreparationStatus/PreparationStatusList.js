import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Api from "../../services/Api";
import UserService from "../../services/UserService";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import ReactToPrint from "react-to-print";

function PreparationStatusList() {

    const componentRef = useRef();
    const [preparationStatusList, setPreparationStatusList] = useState('');
    const [statusFilter, setStatusFilter] = useState('-1');
    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value)
        handleStatusFilter(event.target.value)
    }

    useEffect(() => {
            Api.get(`/api/v1/establishments/preparation-status`, axiosConfig)
                .then((res) => {
                    setPreparationStatusList(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handleStatusFilter = (statusCode) => {

        let url = `/api/v1/establishments/preparation-status`

        if (statusCode !== "-1") {
            url = url + `?status=${statusCode}`
        }

        Api.get(`${url}`, axiosConfig)
            .then((res) => {
                setPreparationStatusList(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDeletePreparationStatus = (id) => {
        Api.delete(`/api/v1/establishments/preparation-status/${id}`, axiosConfig)
            .then((res) => {
                console.log(res.data)
            })
            .then((res) => {
                alert("Removido com sucesso!")
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
                    <Col md="6">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Lista de Status de Preparo</Card.Title>
                            </Card.Header>
                            <Row>
                                <Col md="12">
                                    <Form.Group>
                                        <Link to={`/home/establishment/preparation-status/new`}>
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
                                        <th className="border-0">Status de Preparo</th>
                                        <th className="border-0">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {preparationStatusList && preparationStatusList.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.description}</td>
                                            <td>{item.status === 1 ? "Ativo" : "Inativo"}</td>
                                            <td>
                                                {item.status === 1 ? (
                                                    <Button className="btn-fill" variant="danger" size="sm"
                                                            onClick={() => {
                                                                if (window.confirm(`Deseja realmente remover este item (${item.description}) ?`)) {
                                                                    handleDeletePreparationStatus(item.id)
                                                                }
                                                            }}>
                                                        Deletar
                                                    </Button>
                                                ) : (
                                                    <></>
                                                )}
                                            </td>
                                            <td>
                                                <Link to={`/home/establishment/preparation-status/${item.id}/edit`}>
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

export default PreparationStatusList;