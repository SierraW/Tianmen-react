import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export default function ProjectCreatorPageTitle({ selectedUsers, removeSelectAt }) {

    const [pic, setPic] = useState("");

    // const user = useSelector((state) => state.auth.user, shallowEqual);
    // useEffect(() => {
    //     if (user.head) {
    //         setPic(user.head);
    //     }
    // }, [user]);

    const getUserPic = () => {
        if (!pic) {
            return "none";
        }

        return `url(${pic})`;
    };
    const removePic = () => {
        setPic("");
    };
    const handleChange = (event) => {
        setPic(URL.createObjectURL(event.target.files[0]))
    }

    return <>
        <div className="card card-custom gutter-b">
            <div className="card-header">
                <h3 className="card-title">
                    Project Name
                </h3>
            </div>
            <div className="form">
                {/* begin::Body */}
                <div className="card-body">
                    <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">Avatar</label>
                        <div className="col-lg-9 col-xl-6">
                            <div
                                className="image-input image-input-outline"
                                id="kt_profile_avatar"
                                style={{
                                    backgroundImage: 'url("http://tianmengroup.com/server/projectimages/0.png")',
                                }}
                            >
                                <div
                                    className="image-input-wrapper"
                                    style={{ backgroundImage: `${getUserPic()}` }}
                                />
                                <label
                                    className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                                    data-action="change"
                                    data-toggle="tooltip"
                                    title=""
                                    data-original-title="Change avatar"
                                >
                                    <i className="fa fa-pen icon-sm text-muted"></i>
                                    <input
                                        type="file"
                                        // name="pic"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={handleChange}
                                    />
                                    <input type="hidden" name="profile_avatar_remove" />
                                </label>
                                <span
                                    className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                                    data-action="cancel"
                                    data-toggle="tooltip"
                                    title=""
                                    data-original-title="Cancel avatar"
                                >
                                    <i className="ki ki-bold-close icon-xs text-muted"></i>
                                </span>
                                <span
                                    onClick={removePic}
                                    className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                                    data-action="remove"
                                    data-toggle="tooltip"
                                    title=""
                                    data-original-title="Remove avatar"
                                >
                                    <i className="ki ki-bold-close icon-xs text-muted"></i>
                                </span>
                            </div>
                            <span className="form-text text-muted">
                                Allowed file types: png, jpg, jpeg.
                            </span>
                        </div>
                    </div>

                    <p>Expired</p>
                    <p></p>
                    {
                        selectedUsers.map(user => (
                            <Button variant="primary" key={user.login} className="mr-6" onClick={event => removeSelectAt(event, user.login)}>
                                {user.name} <Badge variant="light">{user.login}</Badge>
                            </Button>
                        ))
                    }
                </div>
            </div>
        </div>
    </>;
}

ProjectCreatorPageTitle.propTypes = {
    selectedUsers: PropTypes.array.isRequired,
    removeSelectAt: PropTypes.func.isRequired
}