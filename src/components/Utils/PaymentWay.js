import React from "react";
import {Form} from "react-bootstrap";

function PaymentWay(props) {

    return (
        <>
            <Form.Control
                value={props.paymentWay}
                onChange={props.handlePaymentWayChange}
                as="select"
                className="mr-sm-0"
                id="inlineFormCustomSelect"
                //custom
                readOnly={props.isReadOnly}
            >
                {props.isSelectVisible ?
                    <option
                        key="-1"
                        value="-1"
                    >
                        Selecione...
                    </option> : <></>
                }

                <option
                    key="MONEY"
                    value="MONEY"
                >
                    DINHEIRO
                </option>
                <option
                    key="CREDIT_CARD"
                    value="CREDIT_CARD"
                >
                    CARTÃO DE CRÉDITO
                </option>

            </Form.Control>
        </>
    )
}

export default PaymentWay;