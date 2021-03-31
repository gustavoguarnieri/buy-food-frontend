import React from "react";
import {Form} from "react-bootstrap";

function EstablishmentCategory(props) {

    return (
        <>
            <Form.Control
                value={props.category}
                onChange={props.handleCategoryChange}
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
                {props.establishmentCategories && props.establishmentCategories.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}>{item.description}
                    </option>
                ))}
            </Form.Control>
        </>
    )
}

export default EstablishmentCategory;