import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";
import { em_addOn } from "../../../../services/firebaseInit";

export default function ProjectAddOnManageForm(props) {

    const [name, setName] = useState(props.name);
    const [des, setDes] = useState(props.des);
    const [price, setPrice] = useState(props.price);

    function handleSubmit(event) {
        event.preventDefault();
        if (props.aid.length !== 20) {
            em_addOn.add({
                name,
                des,
                price: Number.parseFloat(price),
                available: true
            })
            .then(() => alert("success"))
        } else {
            em_addOn.doc(props.aid).update({
                name,
                des,
                price: Number.parseFloat(price)
            })
            .then(() => alert("success"))
        }
    }

    function handleNumberChange(num) {
        if (num === "") {
            setPrice(0);
        } else if (num % 1 === 0) {
            setPrice(Number.parseInt(num).toFixed(0));
        } else if (num * 10 % 1 === 0) {
            setPrice(Number.parseFloat(num).toFixed(1));
        } else {
            setPrice(Number.parseFloat(num).toFixed(2));
        }
    }

    return <>
        <Form className="card-body" onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId="formAN">
                <Form.Label>Add-on Name</Form.Label>
                <Form.Control required value={name} onChange={(e) => setName(e.target.value)} type="text" />
            </Form.Group>

            <Form.Group controlId="formAD">
                <Form.Label>Description</Form.Label>
                <Form.Control required value={des} onChange={(e) => setDes(e.target.value)} as="textarea" row="7" />
                <Form.Text className="text-muted">
                    Separated by line.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formAP">
                <Form.Label>Regular Price</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">CAD$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        type="number"
                        aria-describedby="inputGroupPrepend"
                        value={price}
                        onChange={(e) => handleNumberChange(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid number.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>
}

ProjectAddOnManageForm.propTypes = {
    aid: PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    des : PropTypes.string.isRequired,
    price : PropTypes.number.isRequired
}