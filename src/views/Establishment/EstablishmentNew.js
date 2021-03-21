import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import EstablishmentCategory from "../../components/Utils/EstablishmentCategory";
import UserService from "../../services/UserService";
import Api from "../../services/Api";

function EstablishmentNew() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const history = useHistory()
    let [companyName, setCompanyName] = useState('')
    let [tradingName, setTradingName] = useState('')
    let [email, setEmail] = useState('')
    let [commercialPhone, setCommercialPhone] = useState('')
    let [mobilePhone, setMobilePhone] = useState('')
    let [category, setCategory] = useState(1)
    let [categories, setCategories] = useState('')
    let [file, setFile] = useState('')
    let [establishmentId, setEstablishmentId] = useState('')

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
    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    useEffect(() => {
            Api.get(`/api/v1/establishments/categories?status=1`, axiosConfig)
                .then((res) => {
                    setCategories(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handleNewEstablishment = async (e) => {
        e.preventDefault();

        const newEstablishmentData = {
            companyName: companyName,
            tradingName: tradingName,
            email: email,
            commercialPhone: commercialPhone,
            mobilePhone: mobilePhone,
            category: {
                id: category
            },
            status: 1
        }

        let establishment

        try {
            establishment = await Api.post(`/api/v1/establishments`, newEstablishmentData, axiosConfig);
        } catch (err) {
            alert("Ops, ocorreu um erro verifique os dados e tente novamente")
            return err
        }

        setEstablishmentId(establishment.data.id)

        try {
            if (file === '') {
                return
            }

            const formData = new FormData()
            formData.append('file', file)

            await Api.post(`/api/v1/establishments/${establishment.data.id}/images/upload-file`, formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${UserService.getToken()}`
                    }
                });
        } catch (err) {
            alert("Ops, ocorreu um erro verifique os dados e tente novamente")
            return err
        }

        alert("Inserido com sucesso!")

        history.push("/home/establishment")
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
                                    Criar Estabelecimento
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleNewEstablishment}>
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
                                                    type="email"
                                                    required="required"
                                                    value={email}
                                                    onChange={handleEmailChange}
                                                    placeholder="nome@exemplo.com.br"
                                                />
                                                <Form.Text className="text-muted">
                                                    Informe um e-mail válido.
                                                </Form.Text>

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
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <label>File Upload</label>
                                            <input type="file" onChange={handleFileChange}/>
                                            <Form.Text className="text-muted">
                                                Faça upload de imagem do logo do estabelecimento.
                                            </Form.Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Link to="/home/establishment">Taxa de Entrega  &gt;&gt;</Link>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Link to="/home/establishment">Horário de Funcionamento  &gt;&gt;</Link>
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

export default EstablishmentNew;