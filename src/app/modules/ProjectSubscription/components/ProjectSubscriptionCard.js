import React from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';

export default function ProjectSubscriptionCard({ className }) {



    return <>
        <div className={className}>
            <div className="card card-custom">
                <div className="card-body">
                    <h2 >Monthly Plan.</h2>
                    <p>For personal and small business</p>
                    <br />
                    <ul>
                        <li>Personal / Small business website design.</li>
                        <li>Free website hosting.</li>
                        <li>Domain name email services.</li>
                        <li>Server maintenance.</li>
                    </ul>
                </div>
                <div className="card-footer">
                    <Button variant="outline-primary" size="lg">
                        Subscribe!
                    </Button>
                </div>
            </div>
        </div>
    </>
}

ProjectSubscriptionCard.propTypes = {
    className: PropTypes.string
}