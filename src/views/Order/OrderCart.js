import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Api from "../../services/Api";
import UserService from "../../services/UserService";
import {Button, Card, CardDeck, Col, Container, Form, ListGroup, ListGroupItem, Row, Table} from "react-bootstrap";
import DefaultNoImg from "../../assets/img/no-image.jpg"
import UtilService from "../../services/UtilService";
import ReactToPrint from "react-to-print";
import BusinessHours from "../../components/Utils/BusinessHours";
import EstablishmentDeliveryTax from "../../components/Utils/EstablishmentDeliveryTax";

function OrderCart() {

    let location = useLocation();
    // const [products, setProducts] = useState('');
    const [orderItens, setOrderItens] = useState(location.state.orderItens);
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

    const handleDeleteItem = (id) => {
        let newOrderItens = orderItens.filter(item => item.id !== id)
        setOrderItens(newOrderItens)
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12" className="m-1">
                        <p>
                            *Observação: a taxa de entrega será cobrada uma vez por estabelecimento e pedido.
                        </p>
                    </Col>
                </Row>
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
                                            <th className="border-0">Quantidade</th>
                                            <th className="border-0">Nome</th>
                                            <th className="border-0">Descrição</th>
                                            <th className="border-0">Ingredientes</th>
                                            <th className="border-0">Estabelecimento</th>
                                            <th className="border-0">Horário de funcionamento</th>
                                            <th className="border-0">Taxa de Entrega</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/*{location.state.orderItens && location.state.orderItens.map((item) => (*/}
                                        {orderItens && orderItens.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>
                                                    <input style={{width: '3rem'}} type="number" value="1"/>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>
                                                    {item.description}
                                                </td>
                                                <td>
                                                    <Form.Control
                                                        style={{width: '15rem'}}
                                                        as="select"
                                                        className="mr-sm-0"
                                                        id="inlineFormCustomSelect"
                                                        custom
                                                    >
                                                        {item.ingredients && item.ingredients.map((ing) => (
                                                            <option
                                                                key={ing.id}
                                                                value={ing.id}>{ing.ingredient} ({ing.portion})
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </td>

                                                <td>{item.establishment?.tradingName}</td>
                                                <td>
                                                    <BusinessHours businessHours={item.establishment?.businessHours}/>
                                                </td>
                                                <td>
                                                    {item.establishment?.deliveryTax?.taxAmount ?
                                                        UtilService.formCurrency(item.establishment?.deliveryTax?.taxAmount) : "Grátis"}
                                                </td>
                                                <td>
                                                    {item.status === 1 ? (
                                                        <Button className="btn-fill" variant="danger" size="sm"
                                                                onClick={() => {
                                                                    if (window.confirm(`Deseja realmente remover este item (${item.name}) ?`)) {
                                                                        handleDeleteItem(item.id)
                                                                    }
                                                                }}>
                                                            Remover
                                                        </Button>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                            <Row>
                                <Col md="12" className="m-1">
                                    <Button className="m-2 btn-fill float-right" variant="info" size="sm">
                                        Fechar Carrinho de Compra
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default OrderCart;