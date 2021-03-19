import React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {Link, useHistory} from "react-router-dom";
import Api from "../../services/Api";
import UserService from "../../services/UserService";
import {Card, Col, Container, Row, Table, Button, Form} from "react-bootstrap";
import BusinessHours from "components/Utils/BusinessHours.js"
import WindowPrint from "components/Utils/WindowPrint.js"
import UtilService from "../../services/UtilService";

function EstablishmentMyList() {

    const [establishments, setEstablishments] = useState('');
    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    useEffect(() => {
            Api.get(`/api/v1/establishments/mine`, axiosConfig)
                .then((res) => {
                    setEstablishments(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    useEffect(() => {
            Api.get(`/api/v1/establishments/{establishmentId}/delivery-tax`, axiosConfig)
                .then((res) => {
                    setEstablishments(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handleDeleteEstablishment = (id) => {
        Api.delete(`/api/v1/establishments/${id}`, axiosConfig)
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
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Lista de estabelecimentos</Card.Title>
                            </Card.Header>
                            <Row>
                                <Col md="12">
                                    <Form.Group>
                                        <Link to={`/home/establishment/new`}>
                                            <Button className="m-2 btn-fill float-right" variant="info" size="sm">
                                                Novo
                                            </Button>
                                        </Link>
                                        <WindowPrint/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
                                    <thead>
                                    <tr>
                                        <th className="border-0">Id</th>
                                        <th className="border-0">Nome</th>
                                        <th className="border-0">Email</th>
                                        <th className="border-0">Tel Comercial</th>
                                        <th className="border-0">Celular</th>
                                        <th className="border-0">Categoria</th>
                                        <th className="border-0">Expediente</th>
                                        <th className="border-0">Taxa de Entrega</th>
                                        <th className="border-0">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {establishments && establishments.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.tradingName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.commercialPhone}</td>
                                            <td>{item.mobilePhone}</td>
                                            <td>{item.category}</td>
                                            <td>
                                                <BusinessHours businessHours={item.businessHours}/>
                                            </td>
                                            <td>
                                                {item.deliveryTax?.taxAmount ? UtilService.formCurrency(item.deliveryTax?.taxAmount) : "Grátis"}
                                            </td>
                                            <td>{item.status === 1 ? "Ativo" : "Inativo"}</td>
                                            <td>
                                                {item.status === 1 ? (
                                                    <Button className="btn-fill" variant="danger" size="sm"
                                                            onClick={() => {
                                                                if (window.confirm(`Deseja realmente deletar este item (${item.tradingName}) ?`)) {
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
                                                <Link to={`/home/establishment/edit/${item.id}`}>
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

export default EstablishmentMyList;