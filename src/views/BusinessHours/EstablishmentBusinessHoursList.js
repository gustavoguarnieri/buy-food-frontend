import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Api from "../../services/Api";
import UserService from "../../services/UserService";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import ReactToPrint from "react-to-print";

function EstablishmentBusinessHoursList() {

    const componentRef = useRef();
    const [establishmentBusinessHours, setEstablishmentBusinessHours] = useState('');
    const [statusFilter, setStatusFilter] = useState('-1');
    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value)
        handleStatusFilter(event.target.value)
    }

    useEffect(() => {
            Api.get(`/api/v1/establishments/business-hours/mine`, axiosConfig)
                .then((res) => {
                    setEstablishmentBusinessHours(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handleStatusFilter = (statusCode) => {

        let url = `/api/v1/establishments/business-hours/mine`

        if (statusCode !== "-1") {
            url = url + `?status=${statusCode}`
        }

        Api.get(`${url}`, axiosConfig)
            .then((res) => {
                setEstablishmentBusinessHours(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDeleteEstablishmentBusinessHours = (establishmentId, businessHoursId) => {
        Api.delete(`/api/v1/establishments/${establishmentId}/business-hours/${businessHoursId}`, axiosConfig)
            .then((res) => {
                console.log(res.data)
            })
            .then((res) => {
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
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Lista de Horário de Funcionamento</Card.Title>
                            </Card.Header>
                            <Row>
                                <Col md="12">
                                    <Form.Group>
                                        <Link to={`/home/establishment/business-hours/new`}>
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
                                <Col md="12">
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
                                        <th className="border-0">Estabelecimento</th>
                                        <th className="border-0">domingo</th>
                                        <th className="border-0">segunda-feira</th>
                                        <th className="border-0">terça-feira</th>
                                        <th className="border-0">quarta-feira</th>
                                        <th className="border-0">quinta-feira</th>
                                        <th className="border-0">sexta-feira</th>
                                        <th className="border-0">sábado</th>
                                        <th className="border-0">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {establishmentBusinessHours && establishmentBusinessHours.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.establishment?.tradingName}</td>

                                            {item.startTimeFirstPeriodSunday ? (
                                                <td>
                                                    {item.startTimeFirstPeriodSunday}:{item.finalTimeFirstPeriodSunday}
                                                    <br/>
                                                    {item.startTimeSecondPeriodSunday}:{item.finalTimeSecondPeriodSunday}
                                                </td>
                                            ) : (
                                                <td></td>
                                            )}
                                            {item.startTimeFirstPeriodMonday ?  (
                                                <td>
                                                    {item.startTimeFirstPeriodMonday}:{item.finalTimeFirstPeriodMonday}
                                                    <br/>
                                                    {item.startTimeSecondPeriodMonday}:{item.finalTimeSecondPeriodMonday}
                                                </td>
                                            ) : (
                                                <td></td>
                                            )}

                                            {item.startTimeFirstPeriodTuesday ?  (
                                                <td>
                                                    {item.startTimeFirstPeriodTuesday}:{item.finalTimeFirstPeriodTuesday}
                                                    <br/>
                                                    {item.startTimeSecondPeriodTuesday}:{item.finalTimeSecondPeriodTuesday}
                                                </td>
                                            ) : (
                                                <td></td>
                                            )}

                                            {item.startTimeFirstPeriodWednesday ?  (
                                                <td>
                                                    {item.startTimeFirstPeriodWednesday}:{item.finalTimeFirstPeriodWednesday}
                                                    <br/>
                                                    {item.startTimeSecondPeriodWednesday}:{item.finalTimeSecondPeriodWednesday}
                                                </td>
                                            ) : (
                                                <td></td>
                                            )}

                                            {item.startTimeFirstPeriodThursday ?  (
                                                <td>
                                                    {item.startTimeFirstPeriodThursday}:{item.finalTimeFirstPeriodThursday}
                                                    <br/>
                                                    {item.startTimeSecondPeriodThursday}:{item.finalTimeSecondPeriodThursday}
                                                </td>
                                            ) : (
                                                <td></td>
                                            )}

                                            {item.startTimeFirstPeriodFriday ?  (
                                                <td>
                                                    {item.startTimeFirstPeriodFriday}:{item.finalTimeFirstPeriodFriday}
                                                    <br/>
                                                    {item.startTimeSecondPeriodFriday}:{item.finalTimeSecondPeriodFriday}
                                                </td>
                                            ) : (
                                                <td></td>
                                            )}

                                            {item.startTimeFirstPeriodSaturday ?  (
                                                <td>
                                                    {item.startTimeFirstPeriodSaturday}:{item.finalTimeFirstPeriodSaturday}
                                                    <br/>
                                                    {item.startTimeSecondPeriodSaturday}:{item.finalTimeSecondPeriodSaturday}
                                                </td>
                                            ) : (
                                                <td></td>
                                            )}

                                            <td>{item.status === 1 ? "Ativo" : "Inativo"}</td>
                                            <td>
                                                {item.status === 1 ? (
                                                    <Button className="btn-fill" variant="danger" size="sm"
                                                            onClick={() => {
                                                                if (window.confirm(`Deseja realmente remover este item (${item.establishment?.tradingName}) ?`)) {
                                                                    handleDeleteEstablishmentBusinessHours(item.establishment?.id, item.id)
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
                                                    to={`/home/establishment/${item.establishment?.id}/business-hours/${item.id}/edit`}>
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

export default EstablishmentBusinessHoursList;