import React, {useEffect, useRef, useState} from "react";
import Api from "../../../services/Api";
import UserService from "../../../services/UserService";
import {Button, Card, CardDeck, Col, Container, Form, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import DefaultNoImg from "../../../assets/img/no-image.jpg"
import UtilService from "../../../services/UtilService";
import {Link} from "react-router-dom";

function ProductList() {

    const [products, setProducts] = useState('');
    const [orderItens, setOrderItens] = useState([]);
    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    useEffect(() => {
        console.log("Usuario esta logado? " + UserService.isLoggedIn())
        !UserService.isLoggedIn() ? UserService.doLogout() : <></>
        },
        []
    )

    useEffect(() => {
            Api.get(`/api/v1/users/products?status=1`, axiosConfig)
                .then((res) => {
                    let productList = res.data.map(item => {return {...item, quantity: 1}})
                    setProducts(productList)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handleAdd = product => () => {
        if (orderItens.filter(item => item.id === product.id).length > 0) {
            alert("Este produto já está adiiconado ao carrinho")
            return
        }

        const itens = Array.from(orderItens.length > 0 ? orderItens : product)
        itens.push(product)
        setOrderItens(itens)
        console.log(orderItens)
        alert(`Item ${product.name} adicionado com sucesso!`)
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12" className="m-1">
                        <Link to={{
                            pathname: `/home/user/order/cart`,
                            state: { orderItens: orderItens }
                        }}>
                            <Button className="m-2 btn-fill float-right" variant="info" size="sm">
                                Carrinho de Compra
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <CardDeck>
                    {products && products.map((item) => (
                        <Col md="3" className="m-1">
                            <Card style={{height: '22rem'}}>
                                <Card.Img variant="top" style={{height: '10rem'}}
                                          src={item.images[0]?.fileUri || DefaultNoImg}/>
                                <Card.Body>
                                    <Card.Title style={{textAlign: 'center', fontWeight: 'bold'}}>
                                        {item.name} - R$ {item.price.replace(".", ",")}
                                    </Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem style={{textAlign: 'center', fontSize: '12px'}}>
                                        <>{item.establishment?.tradingName}</>
                                    </ListGroupItem>
                                    <ListGroupItem style={{textAlign: 'center', fontSize: '10px'}}>
                                        Taxa Entrega: &nbsp;
                                        {item.establishment?.deliveryTax?.taxAmount ?
                                            UtilService.formCurrency(item.establishment?.deliveryTax?.taxAmount) : "Grátis"}
                                    </ListGroupItem>
                                    <Button
                                        className="m-2 btn-fill float-right"
                                        variant="info"
                                        size="sm"
                                        onClick={handleAdd(item)}>
                                        Adicionar
                                    </Button>
                                </ListGroup>
                            </Card>
                        </Col>
                    ))}
                </CardDeck>
            </Container>
        </>
    )
}

export default ProductList;