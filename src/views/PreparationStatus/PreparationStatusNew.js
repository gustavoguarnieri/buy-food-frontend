import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import React, {useState} from "react";
import UserService from "../../services/UserService";
import Api from "../../services/Api";

function PreparationStatusNew() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const history = useHistory()
    const [description, setDescription] = useState('')

    const handlePreparationStatusDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleNewPreparationStatusDescription = async (e) => {
        e.preventDefault();

        let data = {
            description: description
        }

        try {
            await Api.post(`/api/v1/establishments/preparation-status`, data, axiosConfig);
        } catch (err) {
            alert("Ops, ocorreu um erro verifique os dados e tente novamente")
            return err
        }

        alert("Cadastro realizado com sucesso!")

        history.push("/home/establishment/preparation-status")
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
                                    Criar Status de Preparo
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleNewPreparationStatusDescription}>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Categoria</label>
                                                <Form.Control
                                                    value={description}
                                                    onChange={handlePreparationStatusDescriptionChange}
                                                    placeholder="Status de Preparo"
                                                    type="text"
                                                    required
                                                />
                                                <Form.Text className="text-muted">
                                                    Informe um status de preparo (ex: cozinhando)
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

export default PreparationStatusNew;