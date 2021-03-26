import React from "react";
import {Form} from "react-bootstrap";

function Product(props) {

    return (
        <>
            <Form.Control
                value={props.product}
                onChange={props.handleProductChange}
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

                {props.products && props.products.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}>{item.id} - {item.name}
                    </option>
                ))}
            </Form.Control>
        </>
    )
}

export default Product;