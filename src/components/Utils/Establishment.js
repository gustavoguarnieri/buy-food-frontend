import React from "react";
import {Form} from "react-bootstrap";

function Establishment(props) {

    return (
        <>
            <Form.Control
                value={props.establishment}
                onChange={props.handleEstablishmentChange}
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
                {props.establishments && props.establishments.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}>{item.id} - {item.tradingName}
                    </option>
                ))}
            </Form.Control>
        </>
    )
}

export default Establishment;