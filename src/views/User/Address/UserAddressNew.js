import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import React, {useState} from "react";
import UserService from "../../../services/UserService";
import Api from "../../../services/Api";
import State from "../../../components/Utils/State";
import InputMask from "react-input-mask";

function UserAddressNew() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const history = useHistory()
    const [recipientName, setRecipientName] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [address, setAddress] = useState('')
    const [addressNumber, setAddressNumber] = useState('')
    const [neighbourhood, setNeighbourhood] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('SP')
    const [observation, setObservation] = useState('')

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

    const handleNewUserAddress = async (e) => {
        e.preventDefault();

        let newUserAddressData = {
            recipientName: recipientName,
            zipCode: zipCode,
            address: address,
            addressNumber: addressNumber,
            neighbourhood: neighbourhood,
            city: city,
            state: state,
            observation: observation
        }

        try {
            await Api.post(`/api/v1/users/address`, newUserAddressData, axiosConfig);
        } catch (err) {
            alert("Ops, ocorreu um erro verifique os dados e tente novamente")
            return err
        }

        alert("Cadastro realizado com sucesso!")

        history.push("/home/user/address")
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
                                    Alterar Endereço de Entrega
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleNewUserAddress}>
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
                                                    placeholder="Endereço"
                                                    type="text"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="2">
                                            <Form.Group>
                                                <label>Número</label>
                                                <Form.Control
                                                    value={addressNumber}
                                                    onChange={handleAddressNumberChange}
                                                    placeholder="Número"
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
                                                <label>Observação</label>
                                                <Form.Control
                                                    value={observation}
                                                    onChange={handleObservationChange}
                                                    placeholder="Observação"
                                                    type="text"
                                                />
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

export default UserAddressNew;