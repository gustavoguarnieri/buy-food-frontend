import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import Api from "../../services/Api";
import UserService from "../../services/UserService";
import InputMask from "react-input-mask";

function EstablishmentBusinessHoursEdit() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};
    const {establishmentId} = useParams();
    const {establishmentBusinessHoursId} = useParams();

    const history = useHistory()
    const [establishment, setEstablishment] = useState('');
    const [startTimeFirstPeriodSunday, setStartTimeFirstPeriodSunday] = useState('');
    const [finalTimeFirstPeriodSunday, setFinalTimeFirstPeriodSunday] = useState('');
    const [startTimeSecondPeriodSunday, setStartTimeSecondPeriodSunday] = useState('');
    const [finalTimeSecondPeriodSunday, setFinalTimeSecondPeriodSunday] = useState('');
    const [startTimeFirstPeriodMonday, setStartTimeFirstPeriodMonday] = useState('');
    const [finalTimeFirstPeriodMonday, setFinalTimeFirstPeriodMonday] = useState('');
    const [startTimeSecondPeriodMonday, setStartTimeSecondPeriodMonday] = useState('');
    const [finalTimeSecondPeriodMonday, setFinalTimeSecondPeriodMonday] = useState('');
    const [startTimeFirstPeriodTuesday, setStartTimeFirstPeriodTuesday] = useState('');
    const [finalTimeFirstPeriodTuesday, setFinalTimeFirstPeriodTuesday] = useState('');
    const [startTimeSecondPeriodTuesday, setStartTimeSecondPeriodTuesday] = useState('');
    const [finalTimeSecondPeriodTuesday, setFinalTimeSecondPeriodTuesday] = useState('');
    const [startTimeFirstPeriodWednesday, setStartTimeFirstPeriodWednesday] = useState('');
    const [finalTimeFirstPeriodWednesday, setFinalTimeFirstPeriodWednesday] = useState('');
    const [startTimeSecondPeriodWednesday, setStartTimeSecondPeriodWednesday] = useState('');
    const [finalTimeSecondPeriodWednesday, setFinalTimeSecondPeriodWednesday] = useState('');
    const [startTimeFirstPeriodThursday, setStartTimeFirstPeriodThursday] = useState('');
    const [finalTimeFirstPeriodThursday, setFinalTimeFirstPeriodThursday] = useState('');
    const [startTimeSecondPeriodThursday, setStartTimeSecondPeriodThursday] = useState('');
    const [finalTimeSecondPeriodThursday, setFinalTimeSecondPeriodThursday] = useState('');
    const [startTimeFirstPeriodFriday, setStartTimeFirstPeriodFriday] = useState('');
    const [finalTimeFirstPeriodFriday, setFinalTimeFirstPeriodFriday] = useState('');
    const [startTimeSecondPeriodFriday, setStartTimeSecondPeriodFriday] = useState('');
    const [finalTimeSecondPeriodFriday, setFinalTimeSecondPeriodFriday] = useState('');
    const [startTimeFirstPeriodSaturday, setStartTimeFirstPeriodSaturday] = useState('');
    const [finalTimeFirstPeriodSaturday, setFinalTimeFirstPeriodSaturday] = useState('');
    const [startTimeSecondPeriodSaturday, setStartTimeSecondPeriodSaturday] = useState('');
    const [finalTimeSecondPeriodSaturday, setFinalTimeSecondPeriodSaturday] = useState('');
    let [status, setStatus] = useState('')

    const handleStartTimeFirstPeriodSundayChange = (event) => {
        setStartTimeFirstPeriodSunday(event.target.value)
    }

    const handleFinalTimeFirstPeriodSundayChange = (event) => {
        setFinalTimeFirstPeriodSunday(event.target.value)
    }

    const handleStartTimeSecondPeriodSundayChange = (event) => {
        setStartTimeSecondPeriodSunday(event.target.value)
    }

    const handleFinalTimeSecondPeriodSundayChange = (event) => {
        setFinalTimeSecondPeriodSunday(event.target.value)
    }

    const handleStartTimeFirstPeriodMondayChange = (event) => {
        setStartTimeFirstPeriodMonday(event.target.value)
    }

    const handleFinalTimeFirstPeriodMondayChange = (event) => {
        setFinalTimeFirstPeriodMonday(event.target.value)
    }

    const handleStartTimeSecondPeriodMondayChange = (event) => {
        setStartTimeSecondPeriodMonday(event.target.value)
    }

    const handleFinalTimeSecondPeriodMondayChange = (event) => {
        setFinalTimeSecondPeriodMonday(event.target.value)
    }

    const handleStartTimeFirstPeriodTuesdayChange = (event) => {
        setStartTimeFirstPeriodTuesday(event.target.value)
    }

    const handleFinalTimeFirstPeriodTuesdayChange = (event) => {
        setFinalTimeFirstPeriodTuesday(event.target.value)
    }

    const handleStartTimeSecondPeriodTuesdayChange = (event) => {
        setStartTimeSecondPeriodTuesday(event.target.value)
    }

    const handleFinalTimeSecondPeriodTuesdayChange = (event) => {
        setFinalTimeSecondPeriodTuesday(event.target.value)
    }

    const handleStartTimeFirstPeriodWednesdayChange = (event) => {
        setStartTimeFirstPeriodWednesday(event.target.value)
    }

    const handleFinalTimeFirstPeriodWednesdayChange = (event) => {
        setFinalTimeFirstPeriodWednesday(event.target.value)
    }

    const handleStartTimeSecondPeriodWednesdayChange = (event) => {
        setStartTimeSecondPeriodWednesday(event.target.value)
    }

    const handleFinalTimeSecondPeriodWednesdayChange = (event) => {
        setFinalTimeSecondPeriodWednesday(event.target.value)
    }

    const handleStartTimeFirstPeriodThursdayChange = (event) => {
        setStartTimeFirstPeriodThursday(event.target.value)
    }

    const handleFinalTimeFirstPeriodThursdayChange = (event) => {
        setFinalTimeFirstPeriodThursday(event.target.value)
    }

    const handleStartTimeSecondPeriodThursdayChange = (event) => {
        setStartTimeSecondPeriodThursday(event.target.value)
    }

    const handleFinalTimeSecondPeriodThursdayChange = (event) => {
        setFinalTimeSecondPeriodThursday(event.target.value)
    }

    const handleStartTimeFirstPeriodFridayChange = (event) => {
        setStartTimeFirstPeriodFriday(event.target.value)
    }

    const handleFinalTimeFirstPeriodFridayChange = (event) => {
        setFinalTimeFirstPeriodFriday(event.target.value)
    }

    const handleStartTimeSecondPeriodFridayChange = (event) => {
        setStartTimeSecondPeriodFriday(event.target.value)
    }

    const handleFinalTimeSecondPeriodFridayChange = (event) => {
        setFinalTimeSecondPeriodFriday(event.target.value)
    }

    const handleStartTimeFirstPeriodSaturdayChange = (event) => {
        setStartTimeFirstPeriodSaturday(event.target.value)
    }

    const handleFinalTimeFirstPeriodSaturdayChange = (event) => {
        setFinalTimeFirstPeriodSaturday(event.target.value)
    }

    const handleStartTimeSecondPeriodSaturdayChange = (event) => {
        setStartTimeSecondPeriodSaturday(event.target.value)
    }

    const handleFinalTimeSecondPeriodSaturdayChange = (event) => {
        setFinalTimeSecondPeriodSaturday(event.target.value)
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    useEffect(() => {
            Api.get(`/api/v1/establishments/${establishmentId}`, axiosConfig)
                .then((res) => {
                    setEstablishment(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    useEffect(() => {
            Api.get(`/api/v1/establishments/${establishmentId}/business-hours/${establishmentBusinessHoursId}`, axiosConfig)
                .then((res) => {
                    setStartTimeFirstPeriodSunday(res.data.startTimeFirstPeriodSunday)
                    setFinalTimeFirstPeriodSunday(res.data.finalTimeFirstPeriodSunday)
                    setStartTimeSecondPeriodSunday(res.data.startTimeSecondPeriodSunday)
                    setFinalTimeSecondPeriodSunday(res.data.finalTimeSecondPeriodSunday)
                    setStartTimeFirstPeriodMonday(res.data.startTimeFirstPeriodMonday)
                    setFinalTimeFirstPeriodMonday(res.data.finalTimeFirstPeriodMonday)
                    setStartTimeSecondPeriodMonday(res.data.startTimeSecondPeriodMonday)
                    setFinalTimeSecondPeriodMonday(res.data.finalTimeSecondPeriodMonday)
                    setStartTimeFirstPeriodTuesday(res.data.startTimeFirstPeriodTuesday)
                    setFinalTimeFirstPeriodTuesday(res.data.finalTimeFirstPeriodTuesday)
                    setStartTimeSecondPeriodTuesday(res.data.startTimeSecondPeriodTuesday)
                    setFinalTimeSecondPeriodTuesday(res.data.finalTimeSecondPeriodTuesday)
                    setStartTimeFirstPeriodWednesday(res.data.startTimeFirstPeriodWednesday)
                    setFinalTimeFirstPeriodWednesday(res.data.finalTimeFirstPeriodWednesday)
                    setStartTimeSecondPeriodWednesday(res.data.startTimeSecondPeriodWednesday)
                    setFinalTimeSecondPeriodWednesday(res.data.finalTimeSecondPeriodWednesday)
                    setStartTimeFirstPeriodThursday(res.data.startTimeFirstPeriodThursday)
                    setFinalTimeFirstPeriodThursday(res.data.finalTimeFirstPeriodThursday)
                    setStartTimeSecondPeriodThursday(res.data.startTimeSecondPeriodThursday)
                    setFinalTimeSecondPeriodThursday(res.data.finalTimeSecondPeriodThursday)
                    setStartTimeFirstPeriodFriday(res.data.startTimeFirstPeriodFriday)
                    setFinalTimeFirstPeriodFriday(res.data.finalTimeFirstPeriodFriday)
                    setStartTimeSecondPeriodFriday(res.data.startTimeSecondPeriodFriday)
                    setFinalTimeSecondPeriodFriday(res.data.finalTimeSecondPeriodFriday)
                    setStartTimeFirstPeriodSaturday(res.data.startTimeFirstPeriodSaturday)
                    setFinalTimeFirstPeriodSaturday(res.data.finalTimeFirstPeriodSaturday)
                    setStartTimeSecondPeriodSaturday(res.data.startTimeSecondPeriodSaturday)
                    setFinalTimeSecondPeriodSaturday(res.data.finalTimeSecondPeriodSaturday)
                    setStatus(res.data.status)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handlePutEstablishmentBusinessHours = (e) => {
        e.preventDefault()

        const data = {
            startTimeFirstPeriodSunday: startTimeFirstPeriodSunday,
            finalTimeFirstPeriodSunday: finalTimeFirstPeriodSunday,
            startTimeSecondPeriodSunday: startTimeSecondPeriodSunday,
            finalTimeSecondPeriodSunday: finalTimeSecondPeriodSunday,
            startTimeFirstPeriodMonday: startTimeFirstPeriodMonday,
            finalTimeFirstPeriodMonday: finalTimeFirstPeriodMonday,
            startTimeSecondPeriodMonday: startTimeSecondPeriodMonday,
            finalTimeSecondPeriodMonday: finalTimeSecondPeriodMonday,
            startTimeFirstPeriodTuesday: startTimeFirstPeriodTuesday,
            finalTimeFirstPeriodTuesday: finalTimeFirstPeriodTuesday,
            startTimeSecondPeriodTuesday: startTimeSecondPeriodTuesday,
            finalTimeSecondPeriodTuesday: finalTimeSecondPeriodTuesday,
            startTimeFirstPeriodWednesday: startTimeFirstPeriodWednesday,
            finalTimeFirstPeriodWednesday: finalTimeFirstPeriodWednesday,
            startTimeSecondPeriodWednesday: startTimeSecondPeriodWednesday,
            finalTimeSecondPeriodWednesday: finalTimeSecondPeriodWednesday,
            startTimeFirstPeriodThursday: startTimeFirstPeriodThursday,
            finalTimeFirstPeriodThursday: finalTimeFirstPeriodThursday,
            startTimeSecondPeriodThursday: startTimeSecondPeriodThursday,
            finalTimeSecondPeriodThursday: finalTimeSecondPeriodThursday,
            startTimeFirstPeriodFriday: startTimeFirstPeriodFriday,
            finalTimeFirstPeriodFriday: finalTimeFirstPeriodFriday,
            startTimeSecondPeriodFriday: startTimeSecondPeriodFriday,
            finalTimeSecondPeriodFriday: finalTimeSecondPeriodFriday,
            startTimeFirstPeriodSaturday: startTimeFirstPeriodSaturday,
            finalTimeFirstPeriodSaturday: finalTimeFirstPeriodSaturday,
            startTimeSecondPeriodSaturday: startTimeSecondPeriodSaturday,
            finalTimeSecondPeriodSaturday: finalTimeSecondPeriodSaturday,
            status: status
        }

        Api.put(`/api/v1/establishments/${establishmentId}/business-hours/${establishmentBusinessHoursId}`, data, axiosConfig)
            .then((res) => {
            })
            .then((res) => {
                alert("Alterado com sucesso!")
                history.push("/home/establishment/business-hours")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="6">
                        <Card>
                            <Card.Header>
                                <p>
                                    <Link to="/home/establishment/business-hours">&laquo; voltar</Link>
                                </p>
                                <Card.Title as="h4">
                                    Alterar Horário de Funcionamento
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handlePutEstablishmentBusinessHours}>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Estabelecimento</label>
                                                <Form.Control
                                                    value={`${establishment.id} - ${establishment.tradingName}`}
                                                    placeholder="Estabelecimento"
                                                    type="text"
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group align="center">
                                                <label>Domingo</label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Início manhã</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={startTimeFirstPeriodSunday}
                                                    onChange={handleStartTimeFirstPeriodSundayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Final manhã</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={finalTimeFirstPeriodSunday}
                                                    onChange={handleFinalTimeFirstPeriodSundayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Início tarde</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={startTimeSecondPeriodSunday}
                                                    onChange={handleStartTimeSecondPeriodSundayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Final tarde</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={finalTimeSecondPeriodSunday}
                                                    onChange={handleFinalTimeSecondPeriodSundayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group align="center">
                                                <label>segunda-feira</label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Início manhã</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={startTimeFirstPeriodMonday}
                                                    onChange={handleStartTimeFirstPeriodMondayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Final manhã</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={finalTimeFirstPeriodMonday}
                                                    onChange={handleFinalTimeFirstPeriodMondayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Início tarde</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={startTimeSecondPeriodMonday}
                                                    onChange={handleStartTimeSecondPeriodMondayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Final tarde</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={finalTimeSecondPeriodMonday}
                                                    onChange={handleFinalTimeSecondPeriodMondayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group align="center">
                                                <label>terça-feira</label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Início manhã</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={startTimeFirstPeriodTuesday}
                                                    onChange={handleStartTimeFirstPeriodTuesdayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Final manhã</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={finalTimeFirstPeriodTuesday}
                                                    onChange={handleFinalTimeFirstPeriodTuesdayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Início tarde</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={startTimeSecondPeriodTuesday}
                                                    onChange={handleStartTimeSecondPeriodTuesdayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Final tarde</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={finalTimeSecondPeriodTuesday}
                                                    onChange={handleFinalTimeSecondPeriodTuesdayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group align="center">
                                                <label>quarta-feira</label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Início manhã</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={startTimeFirstPeriodWednesday}
                                                    onChange={handleStartTimeFirstPeriodWednesdayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Final manhã</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={finalTimeFirstPeriodWednesday}
                                                    onChange={handleFinalTimeFirstPeriodWednesdayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Início tarde</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={startTimeSecondPeriodWednesday}
                                                    onChange={handleStartTimeSecondPeriodWednesdayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Final tarde</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={finalTimeSecondPeriodWednesday}
                                                    onChange={handleFinalTimeSecondPeriodWednesdayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group align="center">
                                                <label>quinta-feira</label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Início manhã</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={startTimeFirstPeriodThursday}
                                                    onChange={handleStartTimeFirstPeriodThursdayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Final manhã</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={finalTimeFirstPeriodThursday}
                                                    onChange={handleFinalTimeFirstPeriodThursdayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Início tarde</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={startTimeSecondPeriodThursday}
                                                    onChange={handleStartTimeSecondPeriodThursdayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Final tarde</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={finalTimeSecondPeriodThursday}
                                                    onChange={handleFinalTimeSecondPeriodThursdayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group align="center">
                                                <label>sexta-feira</label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Início manhã</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={startTimeFirstPeriodFriday}
                                                    onChange={handleStartTimeFirstPeriodFridayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Final manhã</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={finalTimeFirstPeriodFriday}
                                                    onChange={handleFinalTimeFirstPeriodFridayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Início tarde</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={startTimeSecondPeriodFriday}
                                                    onChange={handleStartTimeSecondPeriodFridayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Final tarde</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={finalTimeSecondPeriodFriday}
                                                    onChange={handleFinalTimeSecondPeriodFridayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group align="center">
                                                <label>sábado</label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Início manhã</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={startTimeFirstPeriodSaturday}
                                                    onChange={handleStartTimeFirstPeriodSaturdayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Final manhã</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={finalTimeFirstPeriodSaturday}
                                                    onChange={handleFinalTimeFirstPeriodSaturdayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Início tarde</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={startTimeSecondPeriodSaturday}
                                                    onChange={handleStartTimeSecondPeriodSaturdayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Final tarde</label>
                                                <br/>
                                                <InputMask
                                                    mask="99:99"
                                                    value={finalTimeSecondPeriodSaturday}
                                                    onChange={handleFinalTimeSecondPeriodSaturdayChange}
                                                    placeholder="09:30"
                                                    style={{width: "60px"}}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Status</label>
                                                <Form.Control
                                                    value={status}
                                                    onChange={handleStatusChange}
                                                    as="select"
                                                    className="mr-sm-0"
                                                    id="inlineFormCustomSelect"
                                                    custom
                                                >
                                                    <option value="1">ATIVO</option>
                                                    <option value="0">INATIVO</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill float-right"
                                        variant="info"
                                        type="submit"
                                    >
                                        Salvar Alteração
                                    </Button>
                                    <div className="clearfix"/>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default EstablishmentBusinessHoursEdit;