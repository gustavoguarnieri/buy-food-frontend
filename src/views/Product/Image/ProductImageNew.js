import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import UserService from "../../../services/UserService";
import Api from "../../../services/Api";
import Establishment from "../../../components/Utils/Establishment";
import Product from "../../../components/Utils/Product";

function ProductImageNew() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const history = useHistory()
    const [products, setProducts] = useState('');
    const [productId, setProductId] = useState('-1');
    const [establishments, setEstablishments] = useState('');
    const [establishmentId, setEstablishmentId] = useState('-1');
    let [file, setFile] = useState('')

    const handleFileChange = (event) => {
        setFile(event.target.files[0])
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

    const handleNewProductImage = async (e) => {
        e.preventDefault();

        if (productId === '-1') {
            alert("Selecione um produto para cadastro da imagem")
            return
        }

        if (file !== '') {
            try {
                const formData = new FormData()
                formData.append('file', file)

                await Api.post(`/api/v1/establishments/${establishmentId}/products/${productId}/images/upload-file`, formData,
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

        history.push("/home/establishment/product/image")
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="6">
                        <Card>
                            <Card.Header>
                                <p>
                                    <Link to="/home/establishment/product/image">&laquo; voltar</Link>
                                </p>
                                <Card.Title as="h4">
                                    Criar Upload de Imagem de Produto
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleNewProductImage}>
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
                                            <label>File Upload</label>
                                            <br/>
                                            <input type="file" onChange={handleFileChange}/>
                                            <Form.Text className="text-muted">
                                                Faça upload da imagem do produto.
                                            </Form.Text>
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

export default ProductImageNew;