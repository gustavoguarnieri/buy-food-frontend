import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import React, {useState} from "react";
import UserService from "../../services/UserService";
import Api from "../../services/Api";

function PaymentWayNew() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const history = useHistory()
    const [description, setDescription] = useState('')

    const handlePaymentWayDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleNewPaymentWayDescription = async (e) => {
        e.preventDefault();

        let data = {
            description: description
        }

        try {
            await Api.post(`/api/v1/establishments/payment-way`, data, axiosConfig)
                .then((res) => {
                })
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 401) {
                            UserService.doLogout()
                        }
                    }
                })
        } catch (err) {
            alert("Ops, ocorreu um erro verifique os dados e tente novamente")
            return err
        }

        alert("Cadastro realizado com sucesso!")

        history.push("/home/establishment/payment-way")
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
                                    Criar Forma de pagamento
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleNewPaymentWayDescription}>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Categoria</label>
                                                <Form.Control
                                                    value={description}
                                                    onChange={handlePaymentWayDescriptionChange}
                                                    placeholder="Forma de Pagamento"
                                                    type="text"
                                                    required
                                                />
                                                <Form.Text className="text-muted">
                                                    Informe uma forma de pagamento (ex: dinheiro)
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill float-right"
                                        variant="info"
                                        type="submit"
                                    >
                                        Salvar
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

export default PaymentWayNew;