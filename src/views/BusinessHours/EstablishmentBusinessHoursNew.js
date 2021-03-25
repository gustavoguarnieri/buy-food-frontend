import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import UserService from "../../services/UserService";
import Api from "../../services/Api";
import InputMask from "react-input-mask";
import Establishment from "../../components/Utils/Establishment";

function EstablishmentBusinessHoursNew() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const history = useHistory()
    const [establishments, setEstablishments] = useState('');
    const [establishment, setEstablishment] = useState('');

    const [startTimeFirstPeriodSunday, setStartTimeFirstPeriodSunday] = useState('');
    const [finalTimeFirstPeriodSunday, setFinalTimeFirstPeriodSunday] = useState('');
    const [startTimeSecondPeriodSunday, setStartTimeSecondPeriodSunday] = useState('');
    const [finalTimeSecondPeriodSunday, setFinalTimeSecondPeriodSunday] = useState('');
    const [startTimeFirstPeriodMonday, setStartTimeFirstPeriodMonday] = useState('09:30');
    const [finalTimeFirstPeriodMonday, setFinalTimeFirstPeriodMonday] = useState('14:00');
    const [startTimeSecondPeriodMonday, setStartTimeSecondPeriodMonday] = useState('17:30');
    const [finalTimeSecondPeriodMonday, setFinalTimeSecondPeriodMonday] = useState('22:00');
    const [startTimeFirstPeriodTuesday, setStartTimeFirstPeriodTuesday] = useState('09:30');
    const [finalTimeFirstPeriodTuesday, setFinalTimeFirstPeriodTuesday] = useState('14:00');
    const [startTimeSecondPeriodTuesday, setStartTimeSecondPeriodTuesday] = useState('17:30');
    const [finalTimeSecondPeriodTuesday, setFinalTimeSecondPeriodTuesday] = useState('22:00');
    const [startTimeFirstPeriodWednesday, setStartTimeFirstPeriodWednesday] = useState('09:30');
    const [finalTimeFirstPeriodWednesday, setFinalTimeFirstPeriodWednesday] = useState('14:00');
    const [startTimeSecondPeriodWednesday, setStartTimeSecondPeriodWednesday] = useState('17:30');
    const [finalTimeSecondPeriodWednesday, setFinalTimeSecondPeriodWednesday] = useState('22:00');
    const [startTimeFirstPeriodThursday, setStartTimeFirstPeriodThursday] = useState('09:30');
    const [finalTimeFirstPeriodThursday, setFinalTimeFirstPeriodThursday] = useState('14:00');
    const [startTimeSecondPeriodThursday, setStartTimeSecondPeriodThursday] = useState('17:30');
    const [finalTimeSecondPeriodThursday, setFinalTimeSecondPeriodThursday] = useState('22:00');
    const [startTimeFirstPeriodFriday, setStartTimeFirstPeriodFriday] = useState('09:30');
    const [finalTimeFirstPeriodFriday, setFinalTimeFirstPeriodFriday] = useState('14:00');
    const [startTimeSecondPeriodFriday, setStartTimeSecondPeriodFriday] = useState('17:30');
    const [finalTimeSecondPeriodFriday, setFinalTimeSecondPeriodFriday] = useState('22:00');
    const [startTimeFirstPeriodSaturday, setStartTimeFirstPeriodSaturday] = useState('09:30');
    const [finalTimeFirstPeriodSaturday, setFinalTimeFirstPeriodSaturday] = useState('14:00');
    const [startTimeSecondPeriodSaturday, setStartTimeSecondPeriodSaturday] = useState('17:30');
    const [finalTimeSecondPeriodSaturday, setFinalTimeSecondPeriodSaturday] = useState('22:00');


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

    const handleEstablishmentChange = (event) => {
        setEstablishment(event.target.value)
    }

    useEffect(() => {
            Api.get(`/api/v1/establishments/mine?status=1`, axiosConfig)
                .then((res) => {
                    setEstablishments(res.data.filter(item => item.businessHours === undefined))
                    setEstablishment(res.data.filter(item => item.businessHours === undefined)[0].id)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handleNewEstablishmentBusinessHours = async (e) => {
        e.preventDefault();

        const newEstablishmentBusinessHoursData = {
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
            finalTimeSecondPeriodSaturday: finalTimeSecondPeriodSaturday
        }

        try {
            await Api.post(`/api/v1/establishments/${establishment}/business-hours`, newEstablishmentBusinessHoursData, axiosConfig);
        } catch (err) {
            alert("Ops, ocorreu um erro verifique os dados e tente novamente")
            return err
        }

        alert("Inserido com sucesso!")

        history.push("/home/establishment/business-hours")
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
                                    Criar Horário de Funcionamento
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleNewEstablishmentBusinessHours}>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Estabelecimento</label>
                                                <Establishment establishments={establishments}
                                                               establishment={establishment}
                                                               handleEstablishmentChange={handleEstablishmentChange}/>
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
                                    <Button
                                        className="btn-fill float-right"
                                        variant="info"
                                        type="submit"
                                    >
                                        Salvar
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

export default EstablishmentBusinessHoursNew;