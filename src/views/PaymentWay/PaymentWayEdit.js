import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import Api from "../../services/Api";
import UserService from "../../services/UserService";

function PaymentWayEdit() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};
    const {paymentWayId} = useParams();

    const history = useHistory()
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    useEffect(() => {
            Api.get(`/api/v1/establishments/payment-way/${paymentWayId}`, axiosConfig)
                .then((res) => {
                    setDescription(res.data.description)
                    setStatus(res.data.status)
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

    const handlePutPaymentWay = (e) => {
        e.preventDefault()

        let data = {
            description: description,
            status: status
        }

        Api.put(`/api/v1/establishments/payment-way/${paymentWayId}`, data, axiosConfig)
            .then((res) => {
            })
            .then((res) => {
                alert("Alterado com sucesso!")
                history.push("/home/establishment/payment-way")
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
                                    <Link to="/home/establishment/payment-way">&laquo; voltar</Link>
                                </p>
                                <Card.Title as="h4">
                                    Alterar Forma de Pagamento
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handlePutPaymentWay}>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Categoria</label>
                                                <Form.Control
                                                    value={description}
                                                    onChange={handleDescriptionChange}
                                                    placeholder="Forma de Pagamento"
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
                                        Salvar Alteração
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

export default PaymentWayEdit;