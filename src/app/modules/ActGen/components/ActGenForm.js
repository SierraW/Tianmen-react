import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { em_payment, timestamp } from "../../../../services/firebaseInit";
import { getAllTitle } from "../../../../services/infoService";
import PropTypes from "prop-types";
import { MultiValueContainer } from "react-select/src/components/MultiValue";

export default function ActGenForm() {

    const [numOfActCodes, setNumOfActCode] = useState(0);
    const [title, setTitle] = useState(9);

    function handleSubmit(event) {
        event.preventDefault();
    }

    return <>
        <Form onSubmit={(e) => handleSubmit(e)}>

            <Form.Group controlId="formNACN">
                <Form.Label>Number of activation codes nedded</Form.Label>
                <Form.Control value={numOfActCodes} onChange={(e) => setNumOfActCode(e.target.value)} type="number" />
            </Form.Group>

            <Form.Group controlId="formTIT">
                <Form.Label>
                    Title
                </Form.Label>
                <Form.Control
                    as="select"
                    custom
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                >
                    {
                        getAllTitle.map((ps, index) => (
                            <option key={index} value={ps.value}>{ps.text}</option>
                        ))
                    }
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>
}