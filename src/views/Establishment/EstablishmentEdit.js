import React, {useEffect, useState} from 'react';
import {Link, useParams, useHistory} from "react-router-dom";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import Api from "../../services/Api";
import UserService from "../../services/UserService";
import EstablishmentCategory from "components/Utils/EstablishmentCategory"

function EstablishmentEdit() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};
    const {establishmentId} = useParams();

    const history = useHistory()
    let [companyName, setCompanyName] = useState('')
    let [tradingName, setTradingName] = useState('')
    let [email, setEmail] = useState('')
    let [commercialPhone, setCommercialPhone] = useState('')
    let [mobilePhone, setMobilePhone] = useState('')
    let [category, setCategory] = useState('')
    let [categories, setCategories] = useState('')
    let [status, setStatus] = useState('')

    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value)
    }
    const handleTradingNameChange = (event) => {
        setTradingName(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handleCommercialPhoneChange = (event) => {
        setCommercialPhone(event.target.value)
    }
    const handleMobilePhoneChange = (event) => {
        setMobilePhone(event.target.value)
    }
    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }
    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    useEffect(() => {
            Api.get(`/api/v1/establishments/${establishmentId}`, axiosConfig)
                .then((res) => {
                    setCompanyName(res.data.companyName)
                    setTradingName(res.data.tradingName)
                    setEmail(res.data.email)
                    setCommercialPhone(res.data.commercialPhone)
                    setMobilePhone(res.data.mobilePhone)
                    setCategory(res.data.category.id)
                    setStatus(res.data.status)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    useEffect(() => {
            Api.get(`/api/v1/establishments/category?status=1`, axiosConfig)
                .then((res) => {
                    setCategories(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handlePutEstablishment = (e) => {
        e.preventDefault()

        const selectedCategory = {
            id: category
        }

        const data = {
            id: establishmentId,
            companyName: companyName,
            tradingName: tradingName,
            email: email,
            commercialPhone: commercialPhone,
            mobilePhone: mobilePhone,
            category: selectedCategory,
            status: status
        }

        Api.put(`/api/v1/establishments/${establishmentId}`, data, axiosConfig)
            .then((res) => {})
            .then((res) => {
                alert("Alterado com sucesso!")
                history.push("/home/establishment")
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
                                    <Link to="/home/establishment">&laquo; voltar</Link>
                                </p>
                                <Card.Title as="h4">
                                    Alterar Estabelecimento
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handlePutEstablishment}>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <label>Razão Social</label>
                                                <Form.Control
                                                    value={companyName}
                                                    onChange={handleCompanyNameChange}
                                                    placeholder="Razão Social"
                                                    type="text"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <label>Empresa</label>
                                                <Form.Control
                                                    value={tradingName}
                                                    onChange={handleTradingNameChange}
                                                    placeholder="Empresa"
                                                    type="text"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Email</label>
                                                <Form.Control
                                                    value={email}
                                                    onChange={handleEmailChange}
                                                    placeholder="Email"
                                                    type="text"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Tel. Comercial</label>
                                                <Form.Control
                                                    value={commercialPhone}
                                                    onChange={handleCommercialPhoneChange}
                                                    placeholder="Telefone Comercial"
                                                    type="text"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Tel. Móvel</label>
                                                <Form.Control
                                                    value={mobilePhone}
                                                    onChange={handleMobilePhoneChange}
                                                    placeholder="Telefone Móvel"
                                                    type="text"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Categoria</label>
                                                <EstablishmentCategory establishmentCategories={categories}
                                                                       category={category}
                                                                       handleCategoryChange={handleCategoryChange}/>
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
                                    <Row>
                                        <Col md="12">
                                            <Link to="/home/establishment">Taxa de Entrega &gt;&gt;</Link>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Link to="/home/establishment">Expediente &gt;&gt;</Link>
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

export default EstablishmentEdit;