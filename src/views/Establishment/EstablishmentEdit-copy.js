import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import FileUpload from "../components/FileUpload";

function EstablishmentEdit() {

    const { establishmentId } = useParams();
    const [establishment, setEstablishment] = useState();
    const { books } = useSelector((state) => state);

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="6">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Estabelecimento</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <label>Login/Email</label>
                                                <Form.Control
                                                    value={email}
                                                    placeholder="Login"
                                                    type="text"
                                                    readOnly
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Primeiro nome</label>
                                                <Form.Control
                                                    value={firstName}
                                                    onChange={handleFirstNameChange}
                                                    placeholder="Primeiro nome"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Último nome</label>
                                                <Form.Control
                                                    value={lastName}
                                                    onChange={handleLastNameChange}
                                                    placeholder="Último nome"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>                                    
                                    <Button
                                        className="btn-fill float-right"
                                        type="submit"
                                        variant="info"
                                    >
                                        Save
                                    </Button>
                                    <div className="clearfix"></div>
                                    <FileUpload />
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default EstablishmentEdit;