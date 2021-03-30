import React from "react";
import {Form} from "react-bootstrap";

function PreparationStatusText(props) {

    return (
        <>
            {(() => {
                switch (props.preparationStatus) {
                    case 'PENDING':
                        return (
                            <td>PENDENTE</td>
                        )
                    case 'COOKING':
                        return (
                            <td>COZINHANDO</td>
                        )
                    case 'DELIVERY':
                        return (
                            <td>ENTREGANDO</td>
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

export default PreparationStatusText;