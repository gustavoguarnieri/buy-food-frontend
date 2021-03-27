import React, {useEffect, useRef, useState} from "react";
import Api from "../../services/Api";
import UserService from "../../services/UserService";
import {Button, Card, CardDeck, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import DefaultNoImg from "../../assets/img/no-image.jpg"

function EstablishmentMyList() {

    const componentRef = useRef();
    const [products, setProducts] = useState('');
    const [purchasedProducts, setPurchasedProducts] = useState([]);
    //const [establishments, setEstablishments] = useState('');
    //const [statusFilter, setStatusFilter] = useState('-1');
    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};

    // const handleStatusFilterChange = (event) => {
    //     setStatusFilter(event.target.value)
    //     handleStatusFilter(event.target.value)
    // }

    useEffect(() => {
            Api.get(`/api/v1/products`, axiosConfig)
                .then((res) => {
                    setProducts(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        []
    )

    const handleAddFilterChange = (setPurchasedProducts) => {
        setPurchasedProducts(setPurchasedProducts)
    }

    // useEffect(() => {
    //         Api.get(`/api/v1/establishments`, axiosConfig)
    //             .then((res) => {
    //                 setEstablishments(res.data)
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //     },
    //     []
    // )

    // const handleStatusFilter = (statusCode) => {
    //
    //     let url = `/api/v1/establishments/mine`
    //
    //     if (statusCode !== "-1") {
    //         url = url + `?status=${statusCode}`
    //     }
    //
    //     Api.get(`${url}`, axiosConfig)
    //         .then((res) => {
    //             setEstablishments(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    // const handleDeleteEstablishment = (id) => {
    //     Api.delete(`/api/v1/establishments/${id}`, axiosConfig)
    //         .then((res) => {
    //             console.log(res.data)
    //         })
    //         .then((res) => {
    //             alert("Removido com sucesso!")
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //     window.location.reload();
    // }

    return (
        <>
            <Container fluid>
                <Row>
                    <CardDeck>
                        {products && products.map((item) => (
                            <Col md="2" className="m-2">
                                <Card style={{ width: '15rem'}}>
                                <Card.Img variant="top" src={item.images[0]?.fileUri || DefaultNoImg}/>
                                    <Card.Body>
                                        <Card.Title style={{textAlign: 'center'}}>{item.name.toUpperCase()}</Card.Title>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <Button className="m-2 btn-fill float-right" variant="info" size="sm">
                                            Adicionar
                                        </Button>
                                    </ListGroup>
                                </Card>
                            </Col>
                        ))}
                    </CardDeck>
                </Row>
            </Container>
        </>
    )
}

export default EstablishmentMyList;