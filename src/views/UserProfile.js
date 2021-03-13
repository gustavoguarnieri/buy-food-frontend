import React from "react";
import {
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";

function User() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          placeholder="Username"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="7">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            readOnly
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          placeholder="First Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5">
                      <Form.Group>
                        <label>Senha</label>
                        <Form.Control
                            placeholder="***"
                            type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="3">
                      <Form.Group>
                        <label>Tipo de conta</label>
                          <Form.Control
                              as="select"
                              lassName="mr-sm-2"
                              id="inlineFormCustomSelect"
                              custom
                          >
                            <option value="0">Escolha...</option>
                            <option value="1">usuario</option>
                            <option value="2">estabelecimento</option>
                          </Form.Control>
                    </Form.Group>
                    </Col>
                  </Row>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>          
        </Row>
      </Container>
    </>
  );
}

export default User;
