import React from "react";
import {Form} from "react-bootstrap";

function EstablishmentDeliveryTax(props) {

    return (
        <>
            <Form.Control
                value={props.delivery}
                onChange={props.handleDeliveryChange}
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

                {props.establishmentDeliveries && props.establishmentDeliveries.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}>R$ {item.taxAmount}
                    </option>
                ))}
            </Form.Control>
        </>
    )
}

export default EstablishmentDeliveryTax;