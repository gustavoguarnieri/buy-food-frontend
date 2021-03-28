import React from "react";
import {Form} from "react-bootstrap";

function Addresses(props) {

    return (
        <>
            <Form.Control
                value={props.address}
                onChange={props.handleAddressChange}
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

                {props.addresses && props.addresses.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}>{item.id} - {item.address}, nº{item.addressNumber} - {item.city}/{item.state}
                    </option>
                ))}
            </Form.Control>
        </>
    )
}

export default Addresses;