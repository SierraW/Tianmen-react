import React, { useEffect, useState } from "react";
import { useSubheader } from "../../../../_metronic/layout";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { useSelector } from "react-redux";
import ProjectSubscriptionCard from "../components/ProjectSubscriptionCard";
import { delay } from "../../../../services/delayLoading";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../style/home.css";

export const ProjectSubscriptionManagerPage = () => {
    const suhbeader = useSubheader();
    suhbeader.setTitle("Manage Subscription and Payment");
    const [loading, setLoading] = useState(true);
    const uid = useSelector((state) => state.auth.user.id);

    useEffect(() => {
        delay().then(setLoading(false));
    }, [])

    if (loading) {
        return <LayoutSplashScreen />
    } else {
        return <>
            <div className="d-flex flex-row scrollable">
                <ProjectSubscriptionCard className="col-lg-4 my-4" />
                <ProjectSubscriptionCard className="col-lg-4 my-4" />
                <ProjectSubscriptionCard className="col-lg-4 my-4" />
                <ProjectSubscriptionCard className="col-lg-4 my-4" />
            </div>
            <div className="card mx-4">
                <Form className="card-body">
                    <Form.Group controlId="formCH">
                        <Form.Label>Card Holder</Form.Label>
                        <Form.Control type="text" placeholder="John Doe" />
                    </Form.Group>

                    <Form.Group controlId="formCN">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control type="text" placeholder="4111 1111 1111 1111" />
                        <Form.Text className="text-muted">
                            Visa and Mastercard Only.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formED">
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control type="text" placeholder="MM" />
                        <Form.Control type="text" placeholder="YY" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </Form>
            </div>

        </>;
    }
};