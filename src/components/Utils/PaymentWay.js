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
                custom
            >
                {props.isSelectVisible ?
                    <option
                        key="-1"
                        value="-1">Selecione...
                    </option> : <></>
                }
                {props.paymentWayList && props.paymentWayList.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}>{item.description}
                    </option>
                ))}
            </Form.Control>
        </>
    )
}

export default PaymentWay;