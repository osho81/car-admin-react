import React, { useState, useEffect } from 'react';
import CarService from '../services/CarService';
import { Card, Table, Container, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

// Fontawsome for react; combine into an element before usage
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ViewCarComponent(props) {

    const navigate = useNavigate();

    const {keycloak, initialized} = useKeycloak()

    // Variables, states
    const [car, setCar] = useState('');
    const { id } = useParams(); // get id param from current url


    useEffect(() => { // Get customer with aquired

        async function getCar() {
            CarService.getAllCars(keycloak.token).then((response) => {
                response.data.map((c) => {
                    if (c.id === Number(id)) { // Find specific car
                        setCar(c);
                    }
                })
            }).catch(error => {
                console.log(error);
            })
        }
        getCar();

    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const editCar = () => {
        navigate(`/update-car-view/${id}`);
    }

    const backToListCars = () => {
        navigate('/allcars', { replace: true });
    }




    return (
        <Container style={{ marginTop: '3%', marginLeft: '12,5%', marginBottom: '5%', width: '75%', justifyContent: 'center', fontSize: "12px" }}>

            <Card style={{ marginLeft: '15%', width: '70%' }}>
                <Card.Body>
                    <Card.Title>Details for car with id {car.id}</Card.Title>
                </Card.Body>

                {/* Table with no table head, only table body */}
                <Table striped bordered hover>
                    <tbody style={{ fontWeight: 500 }}>
                        <tr>
                            <td>Car ID</td>
                            <td>{car.id}</td>
                        </tr>
                        <tr>
                            <td>Registration Nr</td>
                            <td>{car.regNr}</td>
                        </tr>
                        <tr>
                            <td>Model</td>
                            <td>{car.model}</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{car.type}</td>
                        </tr>
                        <tr>
                            <td>Model Year</td>
                            <td>{car.modelYear}</td>
                        </tr>
                        <tr>
                            <td>SEK per day</td>
                            <td>{car.dailySek}</td>
                        </tr>
                    </tbody>
                </Table>
                <Card.Body>
                    <div className="separate-btns-row">
                        <Button className="neutral-btn broad-btn" variant="warning" onClick={backToListCars}>
                            <span className="not-clickable-part"><FontAwesomeIcon icon={faArrowLeft} />
                            </span>
                        </Button>{" "}

                        <Button variant="primary" onClick={editCar}>Edit</Button>
                    </div>
                </Card.Body>
            </Card>
        </Container >
    );
}

export default ViewCarComponent;