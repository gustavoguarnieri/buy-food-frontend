import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

function EstablishmentEdit() {

    const { establishmentId } = useParams();
    const [establishment, setEstablishment] = useState();
    const { books } = useSelector((state) => state);

    return (
        <>
            <p>página para edição do estabelecimento</p>
            <p>
                <Link to="/home/establishment">&laquo; voltar</Link>
            </p>
        </>
    )

}

export default EstablishmentEdit;