import React, {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Api from "../../../services/Api";
import UserService from "../../../services/UserService";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import PaymentWay from "../../../components/Utils/PaymentWay";
import PaymentStatus from "../../../components/Utils/PaymentStatus";
import PreparationStatus from "../../../components/Utils/PreparationStatus";
import UtilService from "../../../services/UtilService";

function PurchasedEstablishmentEdit() {

    const componentRef = useRef();
    const {orderId} = useParams();

    const [order, setOrder] = useState('');
    const [total, setTotal] = useState(0)
    const [paymentWay, setPaymentWay] = useState('-1')
    const [paymentStatus, setPaymentStatus] = useState('-1')
    const [preparationStatus, setPreparationStatus] = useState('-1')
    const [status, setStatus] = useState('')
    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const handlePaymentWayChange = (event) => {
        setPaymentWay(event.target.value)
    }

    const handlePreparationStatusChange = (event) => {
        setPreparationStatus(event.target.value)
    }

    const handlePaymentStatusChange = (event) => {
        setPaymentStatus(event.target.value)
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    useEffect(() => {
            let url = `/api/v1/establishments/orders/${orderId}`

            Api.get(`${url}`, axiosConfig)
                .then((res) => {
                    setOrder(res.data)
                    handleTotal(res.data)
                    setPaymentWay(res.data.paymentWay)
                    setPaymentStatus(res.data.paymentStatus)
                    setPreparationStatus(res.data.preparationStatus)
                    setStatus(res.data.status)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handleTotal = (orderParam) => {
        let total = 0

        let deliveryTax = orderParam.establishment?.deliveryTax ? orderParam.establishment.deliveryTax?.taxAmount : 0

        console.log(orderParam.items)

        orderParam?.items ?
            orderParam?.items.map((item => {
                total += Number(item.product.price) * Number(item.quantity)
            })) : <></>

        total += deliveryTax

        setTotal(total)
    }

    const handlePutOrder = (e) => {
        e.preventDefault()

        let items = []

        order?.items.forEach(i => {
            let item = {
                id: i.id,
                lineCode: i.lineCode,
                productId: i?.product?.id,
                quantity: i.quantity,
                status: i.status
            }
            items.push(item)
        })

        let data = {
            deliveryAddressId: order?.deliveryAddressId,
            establishmentId: order?.establishment?.id,
            items: items,
            observation: order?.observation,
            paymentStatus: paymentStatus,
            paymentWay: paymentWay,
            preparationStatus: preparationStatus,
            status: status
        }

        let url = `/api/v1/establishments/orders/${orderId}`

        Api.put(url, data, axiosConfig)
            .then((res) => {
            })
            .then((res) => {
                alert("Alterado com sucesso!")
                //history.push("/home/establishment/image")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="9">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <p>
                                    <Link to="/home/establishment/order/purchasedOrder">&laquo; voltar</Link>
                                </p>
                                <Card.Title as="h4">
                                    Detalhes do Pedido
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Estabelecimento</label>
                                                <td>{order.establishment?.tradingName}</td>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3">
                                            <label>Forma de Pagamento</label>
                                            <PaymentWay paymentWay={paymentWay}
                                                        handlePaymentWayChange={handlePaymentWayChange}
                                                        isSelectVisible={false}
                                            />
                                        </Col>
                                        <Col md="3">
                                            <label>Status de Pagamento</label>
                                            <PaymentStatus paymentStatus={paymentStatus}
                                                           handlePaymentStatusChange={handlePaymentStatusChange}
                                                           isSelectVisible={false}/>
                                        </Col>
                                        <Col md="3">
                                            <label>Status de Preparo</label>
                                            <PreparationStatus preparationStatus={preparationStatus}
                                                               handlePreparationStatusChange={handlePreparationStatusChange}
                                                               isSelectVisible={false}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Observação</label>
                                                <td>{order.observation}</td>
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Status</label>
                                                <Form.Control
                                                    value={order.status}
                                                    onChange={handleStatusChange}
                                                    as="select"
                                                    className="mr-sm-0"
                                                    id="inlineFormCustomSelect"
                                                    readOnly
                                                >
                                                    <option value="1">ATIVO</option>
                                                    <option value="0">INATIVO</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped" ref={componentRef}>
                                    <thead>
                                    <tr>
                                        <th className="border-0">Id</th>
                                        <th className="border-0">Linha</th>
                                        <th className="border-0">Produto</th>
                                        <th className="border-0">Quantidade</th>
                                        <th className="border-0">Preço</th>
                                        <th className="border-0">SubTotal</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {order.items && order.items.map((item) => (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.lineCode}</td>
                                            <td>{item.product?.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{UtilService.formCurrency(item.product?.price)}</td>
                                            <td>{UtilService.formCurrency(item.product?.price * item.quantity)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                                <Row>
                                    <Col md="12" className="text-right">
                                        <Button
                                            className="btn-fill float-right m-2"
                                            type="button"
                                            onClick={handlePutOrder}
                                            // onclick={handlePutOrder}
                                            variant="info"
                                        >
                                            Salvar Alteração
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12" className="text-right">
                                        <p className="m-4 text-right">Total: {UtilService.formCurrency(total)}</p>
                                        {order.establishment?.deliveryTax ?
                                            <p className="m-4 text-right">
                                                (Frete
                                                incluso:{UtilService.formCurrency(order.establishment?.deliveryTax.taxAmount)})
                                            </p> : <></>
                                        }
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default PurchasedEstablishmentEdit;