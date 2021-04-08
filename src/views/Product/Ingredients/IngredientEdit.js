import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import Api from "../../../services/Api";
import UserService from "../../../services/UserService";

function EstablishmentCategoryEdit() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};
    const {establishmentId} = useParams();
    const {productId} = useParams();
    const {ingredientId} = useParams();

    const history = useHistory()
    const [establishment, setEstablishment] = useState('');
    const [product, setProduct] = useState('');
    const [ingredient, setIngredient] = useState('')
    const [portion, setPortion] = useState('')
    const [status, setStatus] = useState('')

    const handleIngredientChange = (event) => {
        setIngredient(event.target.value)
    }

    const handlePortionChange = (event) => {
        setPortion(event.target.value)
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    useEffect(() => {
            Api.get(`/api/v1/establishments/${establishmentId}`, axiosConfig)
                .then((res) => {
                    setEstablishment(res.data)
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

    useEffect(() => {
            Api.get(`/api/v1/establishments/${establishmentId}/products/${productId}`, axiosConfig)
                .then((res) => {
                    setProduct(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    useEffect(() => {
            let url = `/api/v1/establishments/${establishmentId}/products/${productId}/ingredients/${ingredientId}`

            Api.get(url, axiosConfig)
                .then((res) => {
                    setIngredient(res.data.ingredient)
                    setPortion(res.data.portion)
                    setStatus(res.data.status)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handlePutIngredient = (e) => {
        e.preventDefault()

        let data = {
            ingredient: ingredient,
            portion: portion,
            status: status
        }

        let url = `/api/v1/establishments/${establishmentId}/products/${productId}/ingredients/${ingredientId}`

        Api.put(url, data, axiosConfig)
            .then((res) => {
            })
            .then((res) => {
                alert("Alterado com sucesso!")
                history.push("/home/establishment/product/ingredient")
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
                                    <Link to="/home/establishment/product/ingredient">&laquo; voltar</Link>
                                </p>
                                <Card.Title as="h4">
                                    Alterar Ingredientes
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handlePutIngredient}>
                                    <Row>
                                        <Col md="5">
                                            <Form.Group>
                                                <Form.Group>
                                                    <label>Estabelecimento</label>
                                                    <Form.Control
                                                        value={`${establishment.id} - ${establishment.tradingName}`}
                                                        placeholder="Estabelecimento"
                                                        type="text"
                                                        readOnly
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col md="5">
                                            <Form.Group>
                                                <label>Produto</label>
                                                <Form.Control
                                                    value={`${product.id} - ${product.name}`}
                                                    placeholder="Produto"
                                                    type="text"
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Ingrediente</label>
                                                <Form.Control
                                                    value={ingredient}
                                                    onChange={handleIngredientChange}
                                                    placeholder="Ingrediente"
                                                    type="text"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="2">
                                            <Form.Group>
                                                <label>Porção</label>
                                                <Form.Control
                                                    value={portion}
                                                    onChange={handlePortionChange}
                                                    placeholder="Porção"
                                                    type="text"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
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
                                        variant="info"
                                        type="submit"
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

export default EstablishmentCategoryEdit;