import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import UtilService from "../../services/UtilService";
import BusinessHours from "../../components/Utils/BusinessHours";
import Api from "../../services/Api";
import UserService from "../../services/UserService";
import Addresses from "../../components/Utils/Addresses"

function OrderCart() {

    let location = useLocation();
    const [addresses, setAddresses] = useState('');
    const [address, setAddress] = useState('-1')
    const [cartProducts, setCartProducts] = useState(location.state?.orderItens);
    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    function handleQuantityFilterChange(e, index) {
        let changeProductsValue = [...cartProducts]
        changeProductsValue[index].quantity = e.target.value
        setCartProducts(changeProductsValue)
    }

    const handleAddressChange = (event) => {
        setAddress(event.target.value)
    }

    useEffect(() => {
            Api.get(`/api/v1/users/addresses`, axiosConfig)
                .then((res) => {
                    setAddresses(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handleDeleteItem = (id) => {
        setCartProducts(cartProducts.filter(item => item.id !== id))
    }

    const handleCloseCar = async (e) => {
        e.preventDefault();

        if (address === '-1') {
            alert("Selecione um endereço para entrega")
            return
        }

        let uniqueEstablishmentList = []
        cartProducts.map(item => {

            if (uniqueEstablishmentList.indexOf(item.establishment?.id) === -1) {
                uniqueEstablishmentList.push(item.establishment?.id)
            }

        })

        let orders = []
        let items = []

        uniqueEstablishmentList.map(uniqueEstablishment => {

            let cartProductsByEstablishment = cartProducts.filter(product => product.establishment.id === uniqueEstablishment)

            cartProductsByEstablishment.map(productByEstablishment => {

                let item = {
                    productId: productByEstablishment.id,
                    quantity: productByEstablishment.quantity
                }
                items.push(item)

            })

            let order = {
                establishmentId: uniqueEstablishment,
                deliveryAddressId: address,
                observation: "observação de teste",
                paymentWay: "MONEY",
                items: items
            }
            orders.push(order)
            items = []
        })
        console.log(orders)

        let url = `/api/v1/users/orders`
        orders.map(order => {
            Api.post(`${url}`, order, axiosConfig)
                .then((res) => {
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        })

        alert("Compra realizada com sucesso!")
        setCartProducts([])

        //TODO apos comprar redirecionar para um relatorio de pedidos do usuario
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
                            <Row>
                                <Col md="4" className="m-1">
                                    <Form.Group className="m-2">
                                        <label>Endereço de Entrega</label>
                                        <Addresses addresses={addresses}
                                                   address={address}
                                                   handleAddressChange={handleAddressChange}
                                                   isSelectVisible={true}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
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
                                        {cartProducts && cartProducts.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>
                                                    <input style={{width: '3rem'}}
                                                           type="number"
                                                           value={item.quantity}
                                                           key={index}
                                                           onChange={e => handleQuantityFilterChange(e, index)}
                                                    />
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
                                    <Button className="m-3 btn-fill float-right"
                                            variant="info"
                                            size="sm-2"
                                            onClick={handleCloseCar}
                                    >
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