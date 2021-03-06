import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import Api from "../../../services/Api";
import UserService from "../../../services/UserService";
import InputMask from "react-input-mask";
import State from "../../../components/Utils/State";

function UserAddressNewEdit() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};
    const {addressId} = useParams();

    const history = useHistory()
    const [recipientName, setRecipientName] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [address, setAddress] = useState('')
    const [addressNumber, setAddressNumber] = useState('')
    const [neighbourhood, setNeighbourhood] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('SP')
    const [observation, setObservation] = useState('')
    const [status, setStatus] = useState('')

    const handleRecipientNameChange = (event) => {
        setRecipientName(event.target.value)
    }
    const handleZipCodeChange = (event) => {
        setZipCode(event.target.value)
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value)
    }
    const handleAddressNumberChange = (event) => {
        setAddressNumber(event.target.value)
    }
    const handleNeighbourhoodChange = (event) => {
        setNeighbourhood(event.target.value)
    }
    const handleCityChange = (event) => {
        setCity(event.target.value)
    }
    const handleStateChange = (event) => {
        setState(event.target.value)
    }
    const handleObservationChange = (event) => {
        setObservation(event.target.value)
    }
    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    useEffect(() => {
            Api.get(`/api/v1/users/address/${addressId}`, axiosConfig)
                .then((res) => {
                    setRecipientName(res.data.recipientName)
                    setZipCode(res.data.zipCode)
                    setAddress(res.data.address)
                    setAddressNumber(res.data.addressNumber)
                    setNeighbourhood(res.data.neighbourhood)
                    setCity(res.data.city)
                    setState(res.data.state)
                    setObservation(res.data.observation)
                    setStatus(res.data.status)
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

    const handlePutUserAddress = (e) => {
        e.preventDefault()

        let data = {
            recipientName: recipientName,
            zipCode: zipCode,
            address: address,
            addressNumber: addressNumber,
            neighbourhood: neighbourhood,
            city: city,
            state: state,
            observation: observation,
            status: status
        }

        Api.put(`/api/v1/users/address/${addressId}`, data, axiosConfig)
            .then((res) => {
            })
            .then((res) => {
                alert("Alterado com sucesso!")
                history.push("/home/user/address")
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
                                    <Link to="/home/user/address">&laquo; voltar</Link>
                                </p>
                                <Card.Title as="h4">
                                    Alterar Endere??o de Entrega
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handlePutUserAddress}>
                                    <Row>
                                        <Col md="4">
                                            <Form.Group>
                                                <label>Cep</label>
                                                <br/>
                                                <InputMask
                                                    mask="99.999-999"
                                                    value={zipCode}
                                                    onChange={handleZipCodeChange}
                                                    placeholder="CEP"
                                                    style={{width: "110px"}}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="4">
                                            <Form.Group>
                                                <label>Estado</label>
                                                <State state={state}
                                                       handleStateChange={handleStateChange}/>
                                            </Form.Group>
                                        </Col>
                                        <Col md="4">
                                            <Form.Group>
                                                <label>Cidade</label>
                                                <Form.Control
                                                    value={city}
                                                    onChange={handleCityChange}
                                                    placeholder="Cidade"
                                                    type="text"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Logradouro</label>
                                                <Form.Control
                                                    value={address}
                                                    onChange={handleAddressChange}
                                                    placeholder="Endere??o"
                                                    type="text"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="2">
                                            <Form.Group>
                                                <label>N??mero</label>
                                                <Form.Control
                                                    value={addressNumber}
                                                    onChange={handleAddressNumberChange}
                                                    placeholder="N??mero"
                                                    type="text"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="4">
                                            <Form.Group>
                                                <label>Bairro</label>
                                                <Form.Control
                                                    value={neighbourhood}
                                                    onChange={handleNeighbourhoodChange}
                                                    placeholder="Bairro"
                                                    type="text"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Contato</label>
                                                <Form.Control
                                                    value={recipientName}
                                                    onChange={handleRecipientNameChange}
                                                    placeholder="Contato para entrega"
                                                    type="text"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Observa????o</label>
                                                <Form.Control
                                                    value={observation}
                                                    onChange={handleObservationChange}
                                                    placeholder="Observa????o"
                                                    type="text"
                                                />
                                            </Form.Group>
                                        </Col>
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
                                        Salvar Altera????o
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

export default UserAddressNewEdit;