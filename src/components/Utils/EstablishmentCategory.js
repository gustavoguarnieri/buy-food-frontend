import React from "react";
import {Form} from "react-bootstrap";

function EstablishmentCategory(props) {

    return (
        <>
            <Form.Control
                value={props.category.description}
                onChange={props.handleCategoryChange}
                as="select"
                className="mr-sm-0"
                id="inlineFormCustomSelect"
                custom
            >
                {props.establishmentCategories && props.establishmentCategories.map((item) => (
                    <option
                        key={item.id}
                        value={item.description}>{item.description}
                    </option>
                ))}
            </Form.Control>
        </>
    )
}

export default EstablishmentCategory;