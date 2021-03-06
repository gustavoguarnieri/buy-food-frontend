import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Button, Card, Col, Container, Figure, Form, Row, Table} from "react-bootstrap";
import UtilService from "../../../services/UtilService";
import BusinessHours from "../../../components/Utils/BusinessHours";
import Api from "../../../services/Api";
import UserService from "../../../services/UserService";
import Addresses from "../../../components/Utils/Addresses"
import PaymentWay from "../../../components/Utils/PaymentWay";

function Cart() {

    let location = useLocation();
    const [addresses, setAddresses] = useState('');
    const [address, setAddress] = useState('-1')
    const [total, setTotal] = useState(0)
    const [paymentWay, setPaymentWay] = useState('-1')
    const [paymentWayList, setPaymentWayList] = useState('')
    const [cartProducts, setCartProducts] = useState(location.state?.orderItens);
    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    function handleQuantityFilterChange(e, index) {
        let changeProductsValue = [...cartProducts]
        changeProductsValue[index].quantity = e.target.value
        setCartProducts(changeProductsValue)
        handleTotal()
    }

    const handleAddressChange = (event) => {
        setAddress(event.target.value)
    }

    const handlePaymentWayChange = (event) => {
        setPaymentWay(event.target.value)
    }

    useEffect(() => {
            handleTotal()
        },
        []
    )

    useEffect(() => {
            Api.get(`/api/v1/users/addresses/mine?status=1`, axiosConfig)
                .then((res) => {
                    setAddresses(res.data)
                })
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 401) {
                            UserService.doLogout()
                        }
                    }
                })
        },
        []
    )

    useEffect(() => {
            let url = `/api/v1/establishments/payment-way?status=1`

            Api.get(`${url}`, axiosConfig)
                .then((res) => {
                    setPaymentWayList(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handleTotal = () => {
        let total = 0

        let uniqueEstablishmentList = []
        cartProducts && cartProducts.map(item => {
            if (uniqueEstablishmentList.indexOf(item.establishment?.id) === -1) {
                uniqueEstablishmentList.push(item.establishment?.id)
            }

            let subTotal = Number(item.price) * Number(item.quantity)
            total += subTotal
        })

        uniqueEstablishmentList && uniqueEstablishmentList.map(uniqueEstablishment => {
            let cartProductsByEstablishment = cartProducts.filter(product => product.establishment.id === uniqueEstablishment)

            if (cartProductsByEstablishment[0].establishment.deliveryTax) {
                total += Number(cartProductsByEstablishment[0].establishment?.deliveryTax?.taxAmount)
            }
        })

        setTotal(total)
    }

    const handleDeleteItem = (id) => {
        setCartProducts(cartProducts.filter(item => item.id !== id))
        handleTotal()
    }

    const handleCloseCar = async (e) => {
        e.preventDefault();

        if (address === '-1') {
            alert("Selecione um endere??o para entrega")
            return
        } else if (paymentWay === '-1') {
            alert("Selecione uma forma de pagamento")
            return
        }

        let uniqueEstablishmentList = Array.from(new Set(cartProducts.map(i => i.establishment.id)))
            .map(id => {
                return {
                    establishmentId: id,
                    establishmentTradingName: cartProducts.find(i => i.establishment.id === id).establishment.tradingName
                }
            })

        let orders = []
        let items = []

        uniqueEstablishmentList && uniqueEstablishmentList.map(uniqueEstablishment => {

            let cartProductsByEstablishment =
                cartProducts.filter(product => product.establishment.id === uniqueEstablishment.establishmentId)

            cartProductsByEstablishment && cartProductsByEstablishment.map(productByEstablishment => {

                let item = {
                    productId: productByEstablishment.id,
                    quantity: productByEstablishment.quantity
                }
                items.push(item)

            })

            let order = {
                establishmentId: uniqueEstablishment.establishmentId,
                establishmentTradingName: uniqueEstablishment.establishmentTradingName,
                deliveryAddressId: address,
                paymentWayId: paymentWay,
                items: items
            }
            orders.push(order)
            items = []
        })

        try {
            orders.map(async order => {
                try {
                    await Api.post(`/api/v1/users/orders`, order, axiosConfig)

                    alert("Compra realizada com sucesso para o estabelecimento: " + order.establishmentTradingName)

                    setCartProducts([])
                    setAddress('-1')
                    setPaymentWay('-1')
                    setTotal(0)
                } catch (err) {
                    alert("Ops, ocorreu um erro ao realizar a compra para o estabelecimento: " +
                        order.establishmentTradingName + " Info: " + err.response?.data?.description)
                    return err
                }
            })
        } catch (err) {
            return
        }
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12" className="m-1">
                        <p>
                            *Observa????o: a taxa de entrega ser?? cobrada uma vez por estabelecimento e pedido.
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
                                        <label>Endere??o de Entrega</label>
                                        <Addresses addresses={addresses}
                                                   address={address}
                                                   handleAddressChange={handleAddressChange}
                                                   isSelectVisible={true}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="2" className="m-1">
                                    <Form.Group className="m-2">
                                        <label>Forma de Pagamento</label>
                                        <PaymentWay paymentWay={paymentWay}
                                                    paymentWayList={paymentWayList}
                                                    handlePaymentWayChange={handlePaymentWayChange}
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
                                        <th className="border-0">Valor</th>
                                        <th className="border-0">Nome</th>
                                        <th className="border-0">Descri????o</th>
                                        <th className="border-0">Ingredientes</th>
                                        <th className="border-0">Estabelecimento</th>
                                        <th className="border-0">Hor??rio de funcionamento</th>
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
                                            <td>{UtilService.formCurrency(item.price)}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                {item.description}
                                            </td>
                                            <td>
                                                {item.ingredients.length > 0 ? (
                                                    <Form.Control
                                                        style={{width: '15rem'}}
                                                        as="select"
                                                        className="mr-sm-0"
                                                        id="inlineFormCustomSelect"
                                                        readOnly
                                                    >
                                                        {item.ingredients && item.ingredients.map((ing) => (

                                                            ing?.status === 1 ? (
                                                                <option
                                                                    key={ing.id}
                                                                    value={ing.id}>{ing.ingredient} ({ing.portion})
                                                                </option>
                                                            ) : (
                                                                <></>
                                                            )

                                                        ))}
                                                    </Form.Control>
                                                ) : (
                                                    <></>
                                                )}
                                            </td>
                                            <>
                                                {item.establishment?.images[0] ? (
                                                    <td>
                                                        <Figure.Image
                                                            width={80}
                                                            src={item.establishment?.images[0].fileUri}
                                                            alt={item.establishment?.tradingName}
                                                        />
                                                    </td>
                                                ) : (
                                                    <td>{item.establishment?.tradingName}</td>
                                                )}
                                            </>
                                            <td>
                                                <BusinessHours businessHours={item.establishment?.businessHours}/>
                                            </td>
                                            <td>
                                                {item.establishment?.deliveryTax?.taxAmount ?
                                                    UtilService.formCurrency(item.establishment?.deliveryTax?.taxAmount) : "Gr??tis"}
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
                                <Col md="12">
                                    <Button className="m-3 btn-fill float-right"
                                            variant="info"
                                            size="sm-2"
                                            onClick={handleCloseCar}
                                    >
                                        Fechar Carrinho de Compra
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12" className="text-right">
                                    <p className="m-4 text-right">Total: {UtilService.formCurrency(total)}</p>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cart;