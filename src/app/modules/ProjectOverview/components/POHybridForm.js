import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";
import { addNews, addNaughtys } from "../../../../services/infoService";

export default function ProjectOverviewHybridForm(props) {

    const [title, setTitle] = useState(props.title);
    const [subtitle, setSubtitle] = useState(props.subtitle);
    const [url, setUrl] = useState(props.url ? props.url : "");
    const [date, setDate] = useState(props.date);

    function handleSubmit(event) {
        event.preventDefault();
        if (props.hid === "") {
            if (props.type === 0) {
                addNews(props.session, {
                    title,
                    subtitle,
                    url,
                    color: "primary"
                })
                    .then(() => {
                        alert("Success!");
                    })
            } else {
                addNaughtys(props.session, {
                    title,
                    subtitle,
                    color: "primary"
                })
                    .then(() => {
                        alert("Success!");
                    })
            }
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

            {
                props.type === 0 ? (<Form.Group controlId="formAD">
                    <Form.Label>URL</Form.Label>
                    <Form.Control required value={url} onChange={(e) => setUrl(e.target.value)} type="text" />
                </Form.Group>) : ""
            }

            {
                props.hid !== "" ? (<Form.Group controlId="formAP">
                    <Form.Label>Date</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </InputGroup>
                </Form.Group>) : ""
            }

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>
}

ProjectOverviewHybridForm.propTypes = {
    type: PropTypes.number.isRequired,
    hid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    url: PropTypes.string,
    date: PropTypes.string.isRequired,
    session: PropTypes.string.isRequired
}