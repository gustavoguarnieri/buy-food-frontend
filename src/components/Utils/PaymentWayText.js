import React from "react";
import {Form} from "react-bootstrap";

function PaymentWayText(props) {

    return (
        <>
            {(() => {
                switch (props.paymentWay) {
                    case 'MONEY':
                        return (
                            <td>DINHEIRO</td>
                        )
                    case 'CREDIT_CARD':
                        return (
                            <td>CARTÃO DE CRÉDITO</td>
                        )
                    case 'DEBIT_CARD':
                        return (
                            <td>CARTÃO DE DÉBITO</td>
                        )
                    default:
                        return (
                            <td>NI</td>
                        )
                }
            })()}
        </>
    )
}

export default PaymentWayText;