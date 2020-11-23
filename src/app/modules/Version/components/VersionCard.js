import React from "react";
import PropTypes from "prop-types";

export default function VersionCard({ title, fix, update, add, className }) {
    return <div className={className}>
        <div className={`card`}>
            <div className="card-body">
                <h4>Version {title}</h4>
                {fix.length !== 0 ? (<>

                    <p>Fixed:</p>
                    <ul>
                        {fix.map((element, index) => (
                            <li key={index}>{element}</li>
                        ))}
                    </ul>

                </>) : ""}
                {update.length !== 0 ? (<>

                    <p>Updated:</p>
                    <ul>
                        {update.map((element, index) => (
                            <li key={index}>{element}</li>
                        ))}
                    </ul>

                </>) : ""}
                {add.length !== 0 ? (<>

                    <p>Added:</p>
                    <ul>
                        {add.map((element, index) => (
                            <li key={index}>{element}</li>
                        ))}
                    </ul>

                </>) : ""}

            </div>
        </div>
        </div>;
}

VersionCard.propTypes = {
    title: PropTypes.string.isRequired,
    fix: PropTypes.array.isRequired,
    update: PropTypes.array.isRequired,
    add: PropTypes.array.isRequired,
    className: PropTypes.string.isRequired
}
