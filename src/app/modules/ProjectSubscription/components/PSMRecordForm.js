import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { paymentType } from '../data/PaymentTypeData';
import { formatDate } from "../../../../services/datePrintingService";
import { em_payment, timestamp } from "../../../../services/firebaseInit";
import PropTypes from "prop-types";

export default function ProjectSubscriptionManagementRecordForm({ pid, estAmount, setEstAmount }) {

    const [billDate, setBillDate] = useState(formatDate(Date.now()));
    const [billType, setBillType] = useState(0);

    function handleSubmit(event) {
        event.preventDefault();
        em_payment(pid).add({
            amount: estAmount,
            date: billDate,
            type: billType,
            time: timestamp()
        })
    }

    return <>
        <Form onSubmit={(e) => handleSubmit(e)}>

            <Form.Group controlId="formRFDate">
                <Form.Label>日期</Form.Label>
                <Form.Control value={billDate} onChange={(e) => setBillDate(e.target.value)} type="date" />
            </Form.Group>

            <Form.Group controlId="formRFAmount">
                <Form.Label>金额</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">CAD$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        type="number"
                        aria-describedby="inputGroupPrepend"
                        value={estAmount}
                        onChange={(e) => setEstAmount(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid number.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Form.Group controlId="formType">
                <Form.Label>
                    Payment Type
                </Form.Label>
                <Form.Control
                    as="select"
                    custom
                    value={billType}
                    onChange={(e) => setBillType(e.target.value)}
                >
                    {
                        paymentType.map(item => (
                            <option key={item.value} value={item.value}>{item.name}</option>
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

ProjectSubscriptionManagementRecordForm.propTypes = {
    pid: PropTypes.string.isRequired,
    estAmount: PropTypes.number.isRequired,
    setEstAmount: PropTypes.func.isRequired
}