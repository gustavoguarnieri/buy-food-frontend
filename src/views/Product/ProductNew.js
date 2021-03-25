import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import UserService from "../../services/UserService";
import Api from "../../services/Api";
import Establishment from "../../components/Utils/Establishment";

function ProductNew() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};
    const history = useHistory()
    const [establishments, setEstablishments] = useState('');
    const [establishment, setEstablishment] = useState(0);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    let [file, setFile] = useState('')

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handlePriceChange = (event) => {
        setPrice(event.target.value)
    }
    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }
    const handleEstablishmentChange = (event) => {
        setEstablishment(event.target.value)
    }

    useEffect(() => {
            Api.get(`/api/v1/establishments/mine?status=1`, axiosConfig)
                .then((res) => {
                    setEstablishments(res.data)
                    res.data.length > 0 ? setEstablishment(res.data[0].id) : 0
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handleNewProduct = async (e) => {
        e.preventDefault();

        if (establishment === 0) {
            alert("É necessário selecionar um estabelecimento para este cadastro")
            return
        }

        const newProductData = {
            description: description,
            name: name,
            price: price.replace(",", "."),
            status: 1
        }

        let productResp

        try {
            productResp = await Api.post(`/api/v1/establishments/${establishment}/products`, newProductData, axiosConfig);
        } catch (err) {
            alert("Ops, ocorreu um erro verifique os dados e tente novamente")
            return err
        }

        if (file !== '') {
            try {
                const formData = new FormData()
                formData.append('file', file)

                await Api.post(`/api/v1/establishments/${establishment}/products/${productResp.data.id}/images/upload-file`, formData,
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
        }

        alert("Cadastro realizado com sucesso!")

        history.push("/home/establishment/product")
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
                                <Form onSubmit={handleNewProduct}>
                                    <Row>
                                        <Col md="7">
                                            <Form.Group>
                                                <label>Estabelecimento</label>
                                                <Establishment establishments={establishments}
                                                               establishment={establishment}
                                                               handleEstablishmentChange={handleEstablishmentChange}/>
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
                                        <Col md="6">
                                            <label>File Upload</label>
                                            <input type="file" onChange={handleFileChange}/>
                                            <Form.Text className="text-muted">
                                                Faça upload de imagem principal do produto.
                                            </Form.Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Link to="/home/product/ingredients">Ingredientes  &gt;&gt;</Link>
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

export default ProductNew;