import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import UserService from "../../../services/UserService";
import Api from "../../../services/Api";
import Establishment from "../../../components/Utils/Establishment";
import Product from "../../../components/Utils/Product";

function IngredientNew() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const history = useHistory()
    const [products, setProducts] = useState('');
    const [productId, setProductId] = useState('-1');
    const [establishments, setEstablishments] = useState('');
    const [establishmentId, setEstablishmentId] = useState('-1');
    let [ingredient, setIngredient] = useState('')
    let [portion, setPortion] = useState('')

    const handleIngredientsChange = (event) => {
        setIngredient(event.target.value)
    }

    const handlePortionChange = (event) => {
        setPortion(event.target.value)
    }

    const handleEstablishmentChange = (event) => {
        setEstablishmentId(event.target.value)
        setProductId('-1')
        handleProducts(event.target.value)
    }

    const handleProductChange = (event) => {
        setProductId(event.target.value)
    }

    useEffect(async () => {
            let establishmentsResp
            try {
                establishmentsResp = await Api.get(`/api/v1/establishments/mine?status=1`, axiosConfig)
                setEstablishments(establishmentsResp.data)
                establishmentsResp.data.length > 0 ? setEstablishmentId(establishmentsResp.data[0].id) : setEstablishmentId('-1')
            } catch (err) {
                alert("Ops, ocorreu um erro verifique os dados e tente novamente")
                return err
            }

            try {
                let establishmentIdResp = establishmentsResp.data.length > 0 ? establishmentsResp.data[0].id : 0

                if (establishmentIdResp !== '-1') {
                    let response = await Api.get(`/api/v1/establishments/${establishmentIdResp}/products`, axiosConfig)
                    setProducts(response.data)
                }
            } catch (err) {
                alert("Ops, ocorreu um erro verifique os dados e tente novamente")
                return err
            }
        },
        []
    )

    const handleProducts = async (establishmentIdEventValue) => {
        let url = `/api/v1/establishments/${establishmentIdEventValue}/products`

        Api.get(`${url}`, axiosConfig)
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleNewIngredient = async (e) => {
        e.preventDefault();

        if (productId === '-1') {
            alert("Selecione um produto para cadastro do ingrediente")
            return
        }

        let newIngredientData = {
            ingredient: ingredient,
            portion: portion
        }

        try {
            await Api.post(`/api/v1/establishments/${establishmentId}/products/${productId}/ingredients`, newIngredientData, axiosConfig);
        } catch (err) {
            alert("Ops, ocorreu um erro verifique os dados e tente novamente")
            return err
        }

        alert("Cadastro realizado com sucesso!")

        history.push("/home/establishment/product/ingredient")
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
                                    Criar Ingredientes
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleNewIngredient}>
                                    <Row>
                                        <Col md="5">
                                            <Form.Group className="m-2">
                                                <label>Estabelecimento</label>
                                                <Establishment establishments={establishments}
                                                               establishment={establishmentId}
                                                               handleEstablishmentChange={handleEstablishmentChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="5">
                                            <Form.Group className="m-2">
                                                <label>Produto</label>
                                                <Product products={products}
                                                         product={productId}
                                                         handleProductChange={handleProductChange}
                                                         isSelectVisible={true}
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
                                                    onChange={handleIngredientsChange}
                                                    placeholder="Ingrediente"
                                                    type="text"
                                                    required
                                                />
                                                <Form.Text className="text-muted">
                                                    Informe o nome do ingrediente (ex: carne bovina)
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Porção</label>
                                                <Form.Control
                                                    value={portion}
                                                    onChange={handlePortionChange}
                                                    placeholder="Porção"
                                                    type="text"
                                                    required
                                                />
                                                <Form.Text className="text-muted">
                                                    Informe a porção (ex: 180gr)
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

export default IngredientNew;