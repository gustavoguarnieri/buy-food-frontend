import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import Api from "../../services/Api";
import UserService from "../../services/UserService";

function ProductEdit() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};
    const {establishmentId} = useParams();
    const {productId} = useParams();

    const history = useHistory()
    const [establishment, setEstablishment] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('')

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handlePriceChange = (event) => {
        setPrice(event.target.value)
    }
    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    useEffect(() => {
            Api.get(`/api/v1/establishments/${establishmentId}/products/${productId}`, axiosConfig)
                .then((res) => {
                    setDescription(res.data.description)
                    setName(res.data.name)
                    setPrice(res.data.price)
                    setStatus(res.data.status)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    useEffect(() => {
            Api.get(`/api/v1/establishments/${establishmentId}`, axiosConfig)
                .then((res) => {
                    setEstablishment(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handlePutProduct = (e) => {
        e.preventDefault()

        console.log(price)

        const data = {
            description: description,
            name: name,
            price: price.toString().replace(",", "."),
            status: status
        }

        Api.put(`/api/v1/establishments/${establishmentId}/products/${productId}`, data, axiosConfig)
            .then((res) => {
            })
            .then((res) => {
                alert("Alterado com sucesso!")
                history.push("/home/establishment/product")
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
                                    <Link to="/home/establishment/product">&laquo; voltar</Link>
                                </p>
                                <Card.Title as="h4">
                                    Criar Produto
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handlePutProduct}>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Estabelecimento</label>
                                                <Form.Control
                                                    value={`${establishment.id} - ${establishment.tradingName}`}
                                                    placeholder="Estabelecimento"
                                                    type="text"
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="5">
                                            <Form.Group>
                                                <label>Nome</label>
                                                <Form.Control
                                                    value={name}
                                                    onChange={handleNameChange}
                                                    placeholder="Nome"
                                                    type="text"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="2">
                                            <Form.Group>
                                                <label>Preço</label>
                                                <Form.Control
                                                    value={price}
                                                    onChange={handlePriceChange}
                                                    placeholder="10,50"
                                                    type="text"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <label>Descrição</label>
                                                <Form.Control
                                                    value={description}
                                                    onChange={handleDescriptionChange}
                                                    placeholder="Descrição"
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

export default ProductEdit;