import React from "react";

function PaymentStatusText(props) {

    return (
        <>
            {(() => {
                switch (props.paymentStatus) {
                    case 'PENDING':
                        return (
                            <td>Pendente</td>
                        )
                    case 'DECLINED':
                        return (
                            <td>Recusado</td>
                        )
                    case 'APPROVED':
                        return (
                            <td>Aprovado</td>
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

export default PaymentStatusText;