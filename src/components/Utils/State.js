import React from "react";
import {Form} from "react-bootstrap";

function State(props) {

    return (
        <>
            <Form.Control
                value={props.state}
                onChange={props.handleStateChange}
                as="select"
                className="mr-sm-0"
                id="inlineFormCustomSelect"
                custom
            >
                <option key="AC" value="AC">Acre</option>
                <option key="AL" value="AL">Alagoas</option>
                <option key="AP" value="AP">Amapá</option>
                <option key="AM" value="AM">Amazonas</option>
                <option key="BA" value="BA">Bahia</option>
                <option key="CE" value="CE">Ceará</option>
                <option key="DF" value="DF">Distrito Federal</option>
                <option key="ES" value="ES">Espírito Santo</option>
                <option key="GO" value="GO">Goiás</option>
                <option key="MA" value="MA">Maranhão</option>
                <option key="MT" value="MT">Mato Grosso</option>
                <option key="MS" value="MS">Mato Grosso do Sul</option>
                <option key="MG" value="MG">Minas Gerais</option>
                <option key="PA" value="PA">Pará</option>
                <option key="PB" value="PB">Paraíba</option>
                <option key="PR" value="PR">Paraná</option>
                <option key="PE" value="PE">Pernambuco</option>
                <option key="PI" value="PI">Piauí</option>
                <option key="RJ" value="RJ">Rio de Janeiro</option>
                <option key="RN" value="RN">Rio Grande do Norte</option>
                <option key="RS" value="RS">Rio Grande do Sul</option>
                <option key="RO" value="RO">Rondônia</option>
                <option key="RR" value="RR">Roraima</option>
                <option key="SC" value="SC">Santa Catarina</option>
                <option key="SP" value="SP">São Paulo</option>
                <option key="SE" value="SE">Sergipe</option>
                <option key="TO" value="TO">Tocantins</option>
            </Form.Control>
        </>
    )
}

export default State;