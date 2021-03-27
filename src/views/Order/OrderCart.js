import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Api from "../../services/Api";
import UserService from "../../services/UserService";
import {Button, Card, CardDeck, Col, Container, Form, ListGroup, ListGroupItem, Row, Table} from "react-bootstrap";
import DefaultNoImg from "../../assets/img/no-image.jpg"
import UtilService from "../../services/UtilService";
import ReactToPrint from "react-to-print";
import BusinessHours from "../../components/Utils/BusinessHours";

function OrderCart() {

    let location = useLocation();
    // const [products, setProducts] = useState('');
    // const [orderItens, setOrderItens] = useState([]);
    // const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    console.log(location)

    // useEffect(() => {
    //         Api.get(`/api/v1/products?status=1`, axiosConfig)
    //             .then((res) => {
    //                 setProducts(res.data)
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //     },
    //     []
    // )
    //
    // const handleAdd = product => () => {
    //     const itens = Array.from(orderItens.length > 0 ? orderItens : product)
    //     itens.push(product)
    //     setOrderItens(itens)
    //     alert(`Item ${product.name} adicionado com sucesso!`)
    // }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Carrinho de Compras</Card.Title>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th className="border-0">Id</th>
                                            <th className="border-0">Nome</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {location.state.products && location.state.products.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
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

export default OrderCart;