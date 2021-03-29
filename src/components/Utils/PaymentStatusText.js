import React from "react";
import {Form} from "react-bootstrap";

function PaymentStatusText(props) {

    return (
        <>
            {(() => {
                switch (props.paymentStatus) {
                    case 'PENDING':
                        return (
                            <td>PENDENTE</td>
                        )
                    case 'DECLINED':
                        return (
                            <td>RECUSADO</td>
                        )
                    case 'APPROVED':
                        return (
                            <td>APROVADO</td>
                        )
                    default:
                        return (
                            <div>NI</div>
                        )
                }
            })()}
        </>
    )
}

export default PaymentStatusText;