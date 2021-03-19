// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router";

import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import Api from "../../services/Api";
import UserService from "../../services/UserService";

function EstablishmentEdit(props) {

    // const { establishmentId } = useParams();
    // const [establishment, setEstablishment] = useState();
    // const { books } = useSelector((state) => state);

    // const search = useLocation().search;
    // const name = new URLSearchParams(search).get('establishmentId');

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};
    const {establishmentId} = useParams();

    let [companyName, setCompanyName] = useState('')
    let [tradingName, setTradingName] = useState('')
    let [email, setEmail] = useState('')
    let [commercialPhone, setCommercialPhone] = useState('')
    let [mobilePhone, setMobilePhone] = useState('')
    let [category, setCategory] = useState('')
    let [businessHours, setBusinessHours] = useState('')
    let [deliveryTax, setDeliveryTax] = useState('')
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
    const handleBusinessHoursChange = (event) => {
        setBusinessHours(event.target.value)
    }
    const handleDeliveryTaxChange = (event) => {
        setDeliveryTax(event.target.value)
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
                    setCategory(res.data.category)
                    setBusinessHours(res.data.businessHours)
                    setDeliveryTax(res.data.deliveryTax)
                    setStatus(res.data.status)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="6">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Alterar Estabelecimento</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {/*<Form onSubmit={handleSubmit}>*/}
                                <Form>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <label>Empresa</label>
                                                <Form.Control
                                                    value={tradingName}
                                                    onChange={handleTradingNameChange}
                                                    placeholder="Empresa"
                                                    type="text"
                                                    readOnly
                                                ></Form.Control>
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
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Telefone Comercial</label>
                                                <Form.Control
                                                    value={commercialPhone}
                                                    onChange={handleCommercialPhoneChange}
                                                    placeholder="Telefone Comercial"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Telefone Móvel</label>
                                                <Form.Control
                                                    value={mobilePhone}
                                                    onChange={handleMobilePhoneChange}
                                                    placeholder="Telefone Móvel"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Categoria</label>
                                                <Form.Control
                                                    value={category}
                                                    onChange={handleCategoryChange}
                                                    placeholder="Email"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Horário de Funcionamento</label>
                                                <Form.Control
                                                    value={businessHours}
                                                    onChange={handleBusinessHoursChange}
                                                    placeholder="Horário de Funcionamento"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Taxa de Entrega</label>
                                                <Form.Control
                                                    value={deliveryTax}
                                                    onChange={handleDeliveryTaxChange}
                                                    placeholder="Taxa de Entrega"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Status</label>
                                                <Form.Control
                                                    value={status === 1 ? "Ativo" : "Inativo"}
                                                    onChange={handleStatusChange}
                                                    placeholder="status"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill float-right"
                                        type="submit"
                                        variant="info"
                                    >
                                        Update Profile
                                    </Button>
                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/*<p>*/}
            {/*    <Link to="/home/establishment">&laquo; voltar</Link>*/}
            {/*</p>*/}
        </>
    )

}

export default EstablishmentEdit;