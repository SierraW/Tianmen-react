import React from "react";
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export default function ProjectCreatorPageTitle ({ selectedUsers, removeSelectAt }) {

    return <>
        <div className="card card-custom gutter-b">
            <div className="card-header">
                <h3 className="card-title">
                    Project Name
                </h3>
            </div>
            <div className="card-body">
                <p>Selected user: 0</p>
                {
                    selectedUsers.map(user => (
                        <Button variant="primary" key={user.login} className="mr-6" onClick={event => removeSelectAt(event, user.login)}>
                            {user.name} <Badge variant="light">{user.login}</Badge>
                        </Button>
                    ))
                }
            </div>
        </div>

    </>;
}

ProjectCreatorPageTitle.propTypes = {
    selectedUsers: PropTypes.array.isRequired,
    removeSelectAt: PropTypes.func.isRequired
}