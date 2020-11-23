import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";
import { em_project, timestamp } from "../../../../services/firebaseInit";

export default function ProjectSubscriptionManageForm(props) {

    const [title, setTitle] = useState(props.title);
    const [subtitle, setSubtitle] = useState(props.subtitle);
    const [des, setDes] = useState(props.des);
    const [price, setPrice] = useState(props.price);

    function handleSubmit(event) {
        event.preventDefault();
        if (props.pid.length !== 20) {
            em_project.add({
                title,
                subtitle,
                des,
                price: price,
                available: true,
                time: timestamp()
            })
            .then(() => alert("success"))
        } else {
            em_project.doc(props.pid).update({
                title,
                subtitle,
                des,
                price: price
            })
            .then(() => alert("success"))
        }
    }

    return <>
        <Form className="card-body" onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId="formAT">
                <Form.Label>Title</Form.Label>
                <Form.Control required value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
            </Form.Group>

            <Form.Group controlId="formAS">
                <Form.Label>Subtitle</Form.Label>
                <Form.Control required value={subtitle} onChange={(e) => setSubtitle(e.target.value)} type="text" />
            </Form.Group>

            <Form.Group controlId="formAD">
                <Form.Label>Description</Form.Label>
                <Form.Control value={des} onChange={(e) => setDes(e.target.value)} as="textarea" row="7" />
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
                        type="text"
                        aria-describedby="inputGroupPrepend"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>
}

ProjectSubscriptionManageForm.propTypes = {
    pid: PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    des : PropTypes.string.isRequired,
    price : PropTypes.string.isRequired
}