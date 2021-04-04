import React from "react";
import {Form} from "react-bootstrap";

function PaymentStatus(props) {

    return (
        <>
            <Form.Control
                value={props.paymentStatus}
                onChange={props.handlePaymentStatusChange}
                as="select"
                className="mr-sm-0"
                id="inlineFormCustomSelect"
                readOnly={props.isReadOnly}
            >
                {props.isSelectVisible ?
                    <option
                        key="-1"
                        value="-1">Selecione...
                    </option> : <></>
                }
                <option
                    key="APPROVED"
                    value="APPROVED"
                >
                    Aprovado
                </option>
                <option
                    key="PENDING"
                    value="PENDING"
                >
                    Pendente
                </option>
                <option
                    key="DECLINED"
                    value="DECLINED"
                >
                    Recusado
                </option>
            </Form.Control>
        </>
    )
}

export default PaymentStatus;