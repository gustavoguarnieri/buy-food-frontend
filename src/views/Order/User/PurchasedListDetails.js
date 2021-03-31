import React, {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Api from "../../../services/Api";
import UserService from "../../../services/UserService";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import UtilService from "../../../services/UtilService";
import PaymentWayText from "../../../components/Utils/PaymentWayText";
import PaymentStatusText from "../../../components/Utils/PaymentStatusText";
import PreparationStatusText from "../../../components/Utils/PreparationStatusText";

function PurchasedListDetails() {

    const {orderId} = useParams();

    const [order, setOrder] = useState('');
    const [total, setTotal] = useState(0)
    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    useEffect(() => {
            let url = `/api/v1/users/orders/${orderId}`

            Api.get(`${url}`, axiosConfig)
                .then((res) => {
                    setOrder(res.data)
                    handleTotal(res.data)
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

        orderParam?.items ?
            orderParam?.items.map((item => {
                total += Number(item.product.price) * Number(item.quantity)
            })) : <></>

        total += deliveryTax

        setTotal(total)
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="9">
                        <Card>
                            <Card.Header>
                                <p>
                                    <Link to="/home/user/order/purchasedOrder">&laquo; voltar</Link>
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
                                            <Form.Group>
                                                <label>Forma de pagamento</label>
                                                <PaymentWayText paymentWay={order.paymentWay}/>
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Status de Pagamento</label>
                                                <PaymentStatusText paymentStatus={order.paymentStatus}/>
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Status de Preparo</label>
                                                <PreparationStatusText preparationStatus={order.preparationStatus}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Observação</label>
                                                <td>{order.observation}</td>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
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
                                        <p className="m-4 text-right">Total: {UtilService.formCurrency(total)}</p>
                                        {order.establishment?.deliveryTax ?
                                            <p className="m-4 text-right">
                                                (Frete incluso:{UtilService.formCurrency(order.establishment?.deliveryTax.taxAmount)})
                                            </p> : <></>
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <Button
                                            className="btn-fill float-right m-3"
                                            variant="info"
                                            type="submit"
                                        >
                                            Salvar Alteração
                                        </Button>
                                    </Col>
                                </Row>
                                <div className="clearfix"/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default PurchasedListDetails;