import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Api from "../../services/Api";
import UserService from "../../services/UserService";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import ReactToPrint from "react-to-print";
import Establishment from "../../components/Utils/Establishment";
import UtilService from "../../services/UtilService";

function ProductList() {

    const componentRef = useRef();
    const [products, setProducts] = useState('');
    const [establishments, setEstablishments] = useState('');
    const [establishmentId, setEstablishmentId] = useState('');
    const [statusFilter, setStatusFilter] = useState('-1');
    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value)
        handleStatusFilter(event.target.value)
    }

    const handleEstablishmentChange = (event) => {
        setEstablishmentId(event.target.value)
        handleEstablishment(event.target.value)
    }

    const handleEstablishment = (establishmentId) => {
        Api.get(`/api/v1/establishments/${establishmentId}/products`, axiosConfig)
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401) {
                        UserService.doLogout()
                    }
                }
            })
    }

    useEffect(async () => {
            let establishmentsResp
            try {
                establishmentsResp = await Api.get(`/api/v1/establishments/mine`, axiosConfig)
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

    const handleStatusFilter = (statusCode) => {

        let url = `/api/v1/establishments/${establishmentId}/products`

        if (statusCode !== "-1") {
            url = url + `?status=${statusCode}`
        }

        Api.get(`${url}`, axiosConfig)
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDeleteProducts = async (id) => {
        await Api.delete(`/api/v1/establishments/${establishmentId}/products/${id}`, axiosConfig)
            .then((res) => {
                console.log(res.data)
            })
            .then((res) => {
                alert("Removido com sucesso!")
            })
            .catch((err) => {
                console.log(err)
            })

        await handleEstablishment(establishmentId)
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="8">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Lista de Produtos</Card.Title>
                            </Card.Header>
                            <Row>
                                <Col md="12">
                                    <Form.Group>
                                        <Link to={`/home/establishment/product/new`}>
                                            <Button className="m-2 btn-fill float-right" variant="info" size="sm">
                                                Novo
                                            </Button>
                                        </Link>
                                        <ReactToPrint
                                            trigger={() =>
                                                <Button className="m-2 btn-fill float-right" variant="info" size="sm">
                                                    Imprimir / Exportar
                                                </Button>}
                                            content={() => componentRef.current}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="9">
                                    <Form.Group className="m-2 float-right">
                                        <label>Estabelecimento</label>
                                        <Establishment establishments={establishments}
                                                       establishment={establishmentId}
                                                       handleEstablishmentChange={handleEstablishmentChange}/>
                                    </Form.Group>
                                </Col>
                                <Col md="3">
                                    <Form.Group className="m-2 float-right">
                                        <label>Status</label>
                                        <Form.Control
                                            value={statusFilter}
                                            onChange={handleStatusFilterChange}
                                            as="select"
                                            className="mr-sm-0"
                                            id="inlineFormCustomSelect"
                                            custom
                                        >
                                            <option key="-1" value="-1">TODOS</option>
                                            <option key="1" value="1">ATIVO</option>
                                            <option key="0" value="0">INATIVO</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped" ref={componentRef}>
                                    <thead>
                                    <tr>
                                        <th className="border-0">Id</th>
                                        <th className="border-0">Produto</th>
                                        <th className="border-0">Descri????o</th>
                                        <th className="border-0">Pre??o</th>
                                        <th className="border-0">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {products && products.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>{UtilService.formCurrency(item.price)}</td>
                                            <td>{item.status === 1 ? "Ativo" : "Inativo"}</td>
                                            <td>
                                                {item.status === 1 ? (
                                                    <Button className="btn-fill" variant="danger" size="sm"
                                                            onClick={() => {
                                                                if (window.confirm(`Deseja realmente remover este item (${item.description}) ?`)) {
                                                                    handleDeleteProducts(item.id)
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
                                                    to={`/home/establishment/${establishmentId}/product/${item.id}/edit`}>
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

export default ProductList;