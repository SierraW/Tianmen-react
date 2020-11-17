import React from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';

export default function ProjectSubscriptionCard({ className, title, subtitle, desList, pid, price }) {

    function subscribe() {
        alert(`you've select ${pid}`);
    }

    return <>
        <div className={className}>
            <div className="card card-custom">
                <div className="card-body">
                    <h2 >{title}</h2>
                    <p>{subtitle}</p>
                    <br />
                    <ul>
                        {
                            desList.map((des, index) => (<li key={index}>{des}</li>))
                        }
                    </ul>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                    <Button variant="outline-primary" size="lg" onClick={() => subscribe()}>
                        Subscribe!
                    </Button>
                    <span className="text-lg-center">{ price }</span>
                </div>
            </div>
        </div>
    </>
}

ProjectSubscriptionCard.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    desList: PropTypes.array.isRequired,
    pid: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
}