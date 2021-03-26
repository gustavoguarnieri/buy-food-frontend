import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Api from "../../../services/Api";
import UserService from "../../../services/UserService";
import {Button, Card, Col, Container, Figure, Form, Image, Row, Table} from "react-bootstrap";
import ReactToPrint from "react-to-print";
import Establishment from "../../../components/Utils/Establishment";
import Product from "../../../components/Utils/Product";

function IngredientList() {

    const componentRef = useRef();
    const [images, setImages] = useState('');
    const [products, setProducts] = useState('');
    const [productId, setProductId] = useState('-1');
    const [establishments, setEstablishments] = useState('');
    const [establishmentId, setEstablishmentId] = useState(0);
    const [statusFilter, setStatusFilter] = useState('-1');

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value)
        handleStatusFilter(event.target.value)
    }

    const handleEstablishmentChange = (event) => {
        setEstablishmentId(event.target.value)
        setProductId('-1')
        handleProducts(event.target.value)
    }

    const handleProductChange = (event) => {
        setProductId(event.target.value)
        handleImages(event.target.value)
    }

    useEffect(async () => {
            let establishmentsResp
            try {
                establishmentsResp = await Api.get(`/api/v1/establishments/mine?status=1`, axiosConfig)
                setEstablishments(establishmentsResp.data)
                establishmentsResp.data.length > 0 ? setEstablishmentId(establishmentsResp.data[0].id) : setEstablishmentId(0)
            } catch (err) {
                alert("Ops, ocorreu um erro verifique os dados e tente novamente")
                return err
            }

            try {
                let establishmentIdResp = establishmentsResp.data.length > 0 ? establishmentsResp.data[0].id : 0

                if (establishmentIdResp > 0) {
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

    const handleImages = (statusCode) => {
        let url = `/api/v1/establishments/${establishmentId}/products/${statusCode}/images`

        Api.get(`${url}`, axiosConfig)
            .then((res) => {
                setImages(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleStatusFilter = (statusCode) => {

        if (productId === "-1") {
            return
        }

        let url = `/api/v1/establishments/${establishmentId}/products/${productId}/images`

        if (statusCode !== "-1") {
            url = url + `?status=${statusCode}`
        }

        Api.get(`${url}`, axiosConfig)
            .then((res) => {
                setImages(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDeleteImages = (id) => {
        Api.delete(`/api/v1/establishments/${establishmentId}/products/${productId}/images/${id}`, axiosConfig)
            .then((res) => {
                console.log(res.data)
            })
            .then(() => {
                alert("Removido com sucesso!")
            })
            .catch((err) => {
                console.log(err)
            })
        window.location.reload();
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="8">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Lista de Imagens de Produto</Card.Title>
                            </Card.Header>
                            <Row>
                                <Col md="12">
                                    <Form.Group>
                                        <Link to={`/home/establishment/product/image/new`}>
                                            <Button className="m-2 btn-fill float-right" variant="info" size="sm">
                                                Novo
                                            </Button>
                                        </Link>
                                        <ReactToPrint
                                            trigger={() =>
                                                <Button className="m-2 btn-fill float-right" variant="info" size="sm">
                                                    Print / Export
                                                </Button>}
                                            content={() => componentRef.current}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <Form.Group className="m-2">
                                        <label>Estabelecimento</label>
                                        <Establishment establishments={establishments}
                                                       establishment={establishmentId}
                                                       handleEstablishmentChange={handleEstablishmentChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="4">
                                    <Form.Group className="m-2">
                                        <label>Produto</label>
                                        <Product products={products}
                                                 product={productId}
                                                 handleProductChange={handleProductChange}
                                                 isSelectVisible={true}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="3">
                                    <Form.Group className="m-2">
                                        <label>Status</label>
                                        <Form.Control
                                            value={statusFilter}
                                            onChange={handleStatusFilterChange}
                                            as="select"
                                            className="mr-sm-0"
                                            id="inlineFormCustomSelect"
                                            custom
                                        >
                                            <option value="-1">TODOS</option>
                                            <option value="1">ATIVO</option>
                                            <option value="0">INATIVO</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped" ref={componentRef}>
                                    <thead>
                                    <tr>
                                        <th className="border-0">Id</th>
                                        <th className="border-0">Imagem</th>
                                        <th className="border-0">Nome do Arquivo</th>
                                        <th className="border-0">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {images && images.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>
                                                <Figure.Image
                                                    width={180}
                                                    height={100}
                                                    src={item.fileUri}
                                                />
                                            </td>
                                            <td>{item.fileName}</td>
                                            <td>{item.status === 1 ? "Ativo" : "Inativo"}</td>
                                            <td>
                                                {item.status === 1 ? (
                                                    <Button className="btn-fill" variant="danger" size="sm"
                                                            onClick={() => {
                                                                if (window.confirm(`Deseja realmente remover este item (${item.fileName}) ?`)) {
                                                                    handleDeleteImages(item.id)
                                                                }
                                                            }}>
                                                        Deletar
                                                    </Button>
                                                ) : (
                                                    <></>
                                                )}
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/home/establishment/${establishmentId}/product/${productId}/image/${item.id}/edit`}>
                                                    <Button className="btn-fill" variant="secondary" size="sm">
                                                        Editar
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default IngredientList;