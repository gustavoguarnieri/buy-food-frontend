import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useHistory } from "react-router-dom";
import React, {useState} from "react";
import UserService from "../../services/UserService";
import Api from "../../services/Api";

function EstablishmentDeliveryNew() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const history = useHistory()
    let [establishmentDeliveryTaxAmount, setEstablishmentDeliveryTaxAmount] = useState('')

    const handleEstablishmentDeliveryChange = (event) => {
        setEstablishmentDeliveryTaxAmount(event.target.value)
    }

    const handleNewEstablishmentDelivery = async (e) => {
        e.preventDefault();

        const newEstablishmentDeliveryData = {
            taxAmount: establishmentDeliveryTaxAmount.replace(",", ".")
        }

        try{
            await  Api.post(`/api/v1/establishments/delivery-tax`, newEstablishmentDeliveryData, axiosConfig);
        }catch (err) {
            alert("Ops, ocorreu um erro verifique os dados e tente novamente")
            return err
        }

        alert("Cadastro realizado com sucesso!")

        history.push("/home/establishment/delivery-tax")
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="6">
                        <Card>
                            <Card.Header>
                                <p>
                                    <Link to="/home/establishment/delivery-tax">&laquo; voltar</Link>
                                </p>
                                <Card.Title as="h4">
                                    Criar Taxas de Entrega
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleNewEstablishmentDelivery}>
                                    <Row>
                                        <Col md="4">
                                            <Form.Group>
                                                <label>Taxa de Entrega</label>
                                                <Form.Control
                                                    value={establishmentDeliveryTaxAmount}
                                                    onChange={handleEstablishmentDeliveryChange}
                                                    placeholder="10,50"
                                                    type="text"
                                                    required
                                                />
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

export default EstablishmentDeliveryNew;