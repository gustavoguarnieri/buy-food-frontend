import UserService from "../services/UserService";
import {Col, Figure, Row} from "react-bootstrap";
import React from "react";

const Welcome = () => (
    <>
        <Row>
            <Col md="12">
                <div className="buy-food-jumbotron">
                    <div className="text-center">
                        <h1 className="mx-auto my-0 buy-food-title">Buy food</h1>
                        <h2 className="text-black-50 mx-auto mt-2 mb-5 buy-food-subtitle">O lugar certo para matar sua fome!</h2>
                        <button className="btn btn-lg btn-danger" onClick={() => UserService.doLogin()}>Login</button>
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col md="12">
                <div className="buy-food-title-img"/>
            </Col>
        </Row>
    </>
)

export default Welcome
