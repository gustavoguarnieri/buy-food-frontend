import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useHistory } from "react-router-dom";
import React, {useEffect, useState} from "react";
import UserService from "../../services/UserService";
import Api from "../../services/Api";
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
                    setEstablishments(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handleNewEstablishmentBusinessHours = async (e) => {
        e.preventDefault();

        // const newEstablishmentBusinessHoursData = {
        //     taxAmount: establishmentBusinessHoursAmount.replace(",", ".")
        // }

        try{
            await  Api.post(`/api/v1/establishments/delivery-tax`, newEstablishmentBusinessHoursData, axiosConfig);
        }catch (err) {
            alert("Ops, ocorreu um erro verifique os dados e tente novamente")
            return err
        }

        alert("Inserido com sucesso!")

        history.push("/home/establishment/delivery-tax")
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="6">
                        <Card>
                            <Card.Header>
                                <p>
                                    <Link to="/home/establishment/delivery-tax">&laquo; voltar</Link>
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
                                    <Col md="3">
                                        <Form.Group>
                                            <label>segunda-feira</label>
                                        </Form.Group>
                                    </Col>
                                    <Col md="3">
                                        <Form.Group>
                                            <label>Início 1º período</label>
                                            <Form.Control
                                                value={startTimeFirstPeriodSunday}
                                                onChange={handleStartTimeFirstPeriodSundayChange}
                                                placeholder="Início 1º período"
                                                type="text"
                                            />
                                        </Form.Group>
                                    </Col>
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