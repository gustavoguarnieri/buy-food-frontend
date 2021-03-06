import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import Api from "../../../services/Api";
import UserService from "../../../services/UserService";

function EstablishmentImageEdit() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};
    const {establishmentId} = useParams();
    const {imageId} = useParams();

    const history = useHistory()
    const [establishment, setEstablishment] = useState('');

    const [fileName, setFileName] = useState('')
    const [fileType, setFileType] = useState('')
    const [fileUri, setFileUri] = useState('')
    const [size, setSize] = useState('')
    const [status, setStatus] = useState('')

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
            let url = `/api/v1/establishments/${establishmentId}/images/${imageId}`

            Api.get(url, axiosConfig)
                .then((res) => {
                    setFileName(res.data.fileName)
                    setFileType(res.data.fileType)
                    setFileUri(res.data.fileUri)
                    setSize(res.data.size)
                    setStatus(res.data.status)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handlePutEstablishmentImage = (e) => {
        e.preventDefault()

        let data = {
            fileName: fileName,
            fileType: fileType,
            fileUri: fileUri,
            size: size,
            status: status
        }

        let url = `/api/v1/establishments/${establishmentId}/images/${imageId}`

        Api.put(url, data, axiosConfig)
            .then((res) => {})
            .then((res) => {
                alert("Alterado com sucesso!")
                history.push("/home/establishment/image")
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
                                    <Link to="/home/establishment/image">&laquo; voltar</Link>
                                </p>
                                <Card.Title as="h4">
                                    Alterar Imagem do Estabelecimento
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handlePutEstablishmentImage}>
                                    <Row>
                                        <Col md="5">
                                            <Form.Group>
                                                <Form.Group>
                                                    <label>Estabelecimento</label>
                                                    <Form.Control
                                                        value={`${establishment.id} - ${establishment.tradingName}`}
                                                        placeholder="Estabelecimento"
                                                        type="text"
                                                        readOnly
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Arquivo</label>
                                                <Form.Control
                                                    value={fileName}
                                                    placeholder="Arquivo"
                                                    type="text"
                                                    readOnly
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
                                        type="submit"
                                        variant="info"
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

export default EstablishmentImageEdit;