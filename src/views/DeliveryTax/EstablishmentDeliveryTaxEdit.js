import React, {useEffect, useState} from 'react';
import {Link, useParams, useHistory} from "react-router-dom";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import Api from "../../services/Api";
import UserService from "../../services/UserService";

function EstablishmentDeliveryTaxEdit() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};
    const {establishmentDeliveryId} = useParams();

    const history = useHistory()
    let [taxAmount, setTaxAmount] = useState('')
    let [status, setStatus] = useState('')

    const handleTaxAmountChange = (event) => {
        setTaxAmount(event.target.value)
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    useEffect(() => {
            Api.get(`/api/v1/establishments/delivery-tax/${establishmentDeliveryId}`, axiosConfig)
                .then((res) => {
                    setTaxAmount(res.data.taxAmount)
                    setStatus(res.data.status)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handlePutEstablishmentDelivery = (e) => {
        e.preventDefault()

        const data = {
            taxAmount: taxAmount.replace(",", "."),
            status: status
        }

        Api.put(`/api/v1/establishments/delivery-tax/${establishmentDeliveryId}`, data, axiosConfig)
            .then((res) => {})
            .then((res) => {
                alert("Alterado com sucesso!")
                history.push("/home/establishment/delivery-tax")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="6">
                        <Card>
                            <Card.Header>
                                <p>
                                    <Link to="/home/establishment/category">&laquo; voltar</Link>
                                </p>
                                <Card.Title as="h4">
                                    Alterar Categoria de Estabelecimento
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handlePutEstablishmentDelivery}>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Taxa de Entrega</label>
                                                <Form.Control
                                                    value={taxAmount}
                                                    onChange={handleTaxAmountChange}
                                                    placeholder="Taxa de Entrega"
                                                    type="text"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Status</label>
                                                <Form.Control
                                                    value={status}
                                                    onChange={handleStatusChange}
                                                    as="select"
                                                    className="mr-sm-0"
                                                    id="inlineFormCustomSelect"
                                                    custom
                                                >
                                                    <option value="1">ATIVO</option>
                                                    <option value="0">INATIVO</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill float-right"
                                        type="submit"
                                        variant="info"
                                    >
                                        Salvar Edição
                                    </Button>
                                    <div className="clearfix"/>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default EstablishmentDeliveryTaxEdit;