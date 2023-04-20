import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [validationError, setValidationError] = useState({});

    const createUser = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);

        await axios.post('http://pb-be.test/api/v1/users', formData).then(({data}) => {
            Swal.fire({
                icon: 'success',
                text: data.message
            })
            navigate('/')
        }).catch(({response}) => {
            console.log('res', response.status)
            if (response.status === 422) {
                setValidationError(response.data.errors)
                console.log(e);
            } else {
                console.log('error', e);
            }
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create User</h4>
                            <hr/>
                            <div className="form-wrapper">
                                {
                                    Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {
                                                            Object.entries(validationError).map(([key, value])=>(
                                                                <li key={key}>{value}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <Form onSubmit={createUser}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Name">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" value={name} onChange={(event) => {
                                                    setName(event.target.value)
                                                }}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col>
                                            <Form.Group controlId="Email">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="text" value={email} onChange={(event) => {
                                                    setEmail(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Phone">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control type="text" value={phone} onChange={(event) => {
                                                    setPhone(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button variant="primary" className="mt-2" size="lg" type="submit">Save</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}