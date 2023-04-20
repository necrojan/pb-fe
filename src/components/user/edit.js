import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditUser() {
    const navigate = useNavigate();
    const {id} = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [validationError,setValidationError] = useState({})

    useEffect(()=>{
        fetchUser()
    },[])

    const fetchUser = async () => {
        await axios.get(`http://pb-be.test/api/v1/users/${id}`).then(({data}) => {
            console.log('data', data)
            const {name, email, phone} = data;
            setName(name);
            setEmail(email);
            setPhone(phone);
        }).catch((e) => {
            console.log(e);
        })
    }

    const updateUser = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);

        await axios.post(`http://pb-be.test/api/v1/users/${id}`, formData).then(({data}) => {
            Swal.fire({
                icon:"success",
                text:data.message
            })
            navigate("/")
        }).catch(({res}) => {
            if (res.status == 422) {
                setValidationError(res.data.errors);
            } else {
                Swal.fire({
                    text: res.data.message,
                    icon: 'error'
                })
            }
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Update User</h4>
                            <hr />
                            <div className="form-wrapper">
                                {
                                    Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
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
                                <Form onSubmit={updateUser}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Name">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" value={name} onChange={(event)=>{
                                                    setName(event.target.value)
                                                }}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col>
                                            <Form.Group controlId="Email">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control as="textarea" rows={3} value={email} onChange={(event)=>{
                                                    setEmail(event.target.value)
                                                }}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col>
                                            <Form.Group controlId="Phone">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control as="textarea" rows={3} value={phone} onChange={(event)=>{
                                                    setPhone(event.target.value)
                                                }}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                                        Update
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}