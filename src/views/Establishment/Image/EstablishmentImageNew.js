import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import UserService from "../../../services/UserService";
import Api from "../../../services/Api";
import Establishment from "../../../components/Utils/Establishment";

function EstablishmentImageNew() {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    const history = useHistory()
    const [establishments, setEstablishments] = useState('');
    const [establishmentId, setEstablishmentId] = useState('-1');
    let [file, setFile] = useState('')

    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    const handleEstablishmentChange = (event) => {
        setEstablishmentId(event.target.value)
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

    const handleNewEstablishmentImage = async (e) => {
        e.preventDefault();

        if (file !== '') {
            try {
                const formData = new FormData()
                formData.append('file', file)

                await Api.post(`/api/v1/establishments/${establishmentId}/images/upload-file`, formData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${UserService.getToken()}`
                        }
                    });
            } catch (err) {
                alert("Ops, ocorreu um erro verifique os dados e tente novamente")
                return err
            }
        }

        alert("Cadastro realizado com sucesso!")

        history.push("/home/establishment/product/image")
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
                                    Criar Upload de Imagem de Estabelecimento
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleNewEstablishmentImage}>
                                    <Row>
                                        <Col md="5">
                                            <Form.Group className="m-2">
                                                <label>Estabelecimento</label>
                                                <Establishment establishments={establishments}
                                                               establishment={establishmentId}
                                                               handleEstablishmentChange={handleEstablishmentChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <label>File Upload</label>
                                            <br/>
                                            <input type="file" onChange={handleFileChange}/>
                                            <Form.Text className="text-muted">
                                                Faça upload da imagem do estabelecimento.
                                            </Form.Text>
                                        </Col>
                                    </Row>
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

export default EstablishmentImageNew;