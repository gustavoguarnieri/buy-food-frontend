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
                custom
            >
                {props.isSelectVisible ?
                    <option
                        key="-1"
                        value="-1">Selecione...
                    </option> : <></>
                }
                {props.preparationStatusList && props.preparationStatusList.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}>{item.description}
                    </option>
                ))}
            </Form.Control>
        </>
    )
}

export default PreparationStatus;