import React, {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Api from "../../../services/Api";
import UserService from "../../../services/UserService";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import UtilService from "../../../services/UtilService";
import PaymentWayText from "../../../components/Utils/PaymentWayText";
import PaymentStatusText from "../../../components/Utils/PaymentStatusText";
import PreparationStatusText from "../../../components/Utils/PreparationStatusText";

function PurchasedOrderListDetailsUser() {

    const componentRef = useRef();
    const {orderId} = useParams();

    const [order, setOrder] = useState('');
    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    useEffect(() => {
            let url = `/api/v1/users/orders/${orderId}`

            Api.get(`${url}`, axiosConfig)
                .then((res) => {
                    setOrder(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="9">
                        <Card>
                            <Card.Header>
                                <p>
                                    <Link to="/home/order/purchasedOrder">&laquo; voltar</Link>
                                </p>
                                <Card.Title as="h4">
                                    Alterar Endereço de Entrega
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
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Status</label>
                                                <Form.Control
                                                    value={order.status}
                                                    as="select"
                                                    className="mr-sm-0"
                                                    id="inlineFormCustomSelect"
                                                    readonly
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

export default PurchasedOrderListDetailsUser;