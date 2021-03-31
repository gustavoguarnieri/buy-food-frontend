import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import React, {useState} from "react";
import UserService from "../../services/UserService";
import Api from "../../services/Api";

function EstablishmentCategoryNew() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const history = useHistory()
    const [establishmentCategoryDescription, setEstablishmentCategoryDescription] = useState('')

    const handleEstablishmentCategoryDescriptionChange = (event) => {
        setEstablishmentCategoryDescription(event.target.value)
    }

    const handleNewEstablishmentCategory = async (e) => {
        e.preventDefault();

        let newEstablishmentCategoryData = {
            description: establishmentCategoryDescription
        }

        try {
            await Api.post(`/api/v1/establishments/categories`, newEstablishmentCategoryData, axiosConfig);
        } catch (err) {
            alert("Ops, ocorreu um erro verifique os dados e tente novamente")
            return err
        }

        alert("Cadastro realizado com sucesso!")

        history.push("/home/establishment/category")
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
                                    Criar Categoria de Estabelecimento
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleNewEstablishmentCategory}>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Categoria</label>
                                                <Form.Control
                                                    value={establishmentCategoryDescription}
                                                    onChange={handleEstablishmentCategoryDescriptionChange}
                                                    placeholder="Categoria"
                                                    type="text"
                                                    required
                                                />
                                                <Form.Text className="text-muted">
                                                    Informe uma categoria (ex: restaurante)
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

export default EstablishmentCategoryNew;