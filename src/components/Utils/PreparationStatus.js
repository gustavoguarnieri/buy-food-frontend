import React from "react";
import {Form} from "react-bootstrap";

function PreparationStatus(props) {

    return (
        <>
            <Form.Control
                value={props.preparationStatus}
                onChange={props.handlePreparationStatusChange}
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
                    key="PENDING"
                    value="PENDING"
                >
                    PENDENTE
                </option>
                <option
                    key="COOKING"
                    value="COOKING"
                >
                    COZINHANDO
                </option>
                <option
                    key="DELIVERY"
                    value="DELIVERY"
                >
                    ENTREGANDO
                </option>
                <option
                    key="DELIVERED"
                    value="DELIVERED"
                >
                    ENTREGUE
                </option>
            </Form.Control>
        </>
    )
}

export default PreparationStatus;