import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { ModalProgressBar } from "../../../../_metronic/_partials/controls";
import Switch from '@material-ui/core/Switch';
import { em_chat, timestamp } from '../../../../services/firebaseInit';
import VCModal from "../../Modal/VCModal";
import Grow from '@material-ui/core/Grow';
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";

export default function ProjectCreatorPageTitle({ session, roomData, selectedUsers, removeSelectAt }) {
    const defaultHead = "url(http://tianmengroup.com/server/projectimages/blank.png)";
    const [loading, setloading] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);
    const [pic, setPic] = useState("");
    const [modalValuesLength, setModalValuesLength] = useState(false);
    const [isValidRoomId, setValidRoomId] = useState(false);
    const history = useHistory();
    const initialValues = {
        expiry: roomData.expiry,
        name: roomData.name,
        type: roomData.type
    }
    useEffect(() => {
        em_chat.doc(roomData.id).get().then((doc) => {
            if (doc.exists) {
                setValidRoomId(true);
                setPic(roomData.head);
            }
        })
    }, [roomData])
    const submit = (values, setStatus, setSubmitting) => {
        if (selectedUsers.length < 2) {
            setModalValuesLength(true);
            setSubmitting(false);
            return;
        }
        setloading(true);
        //const updatedUser = Object.assign(user, values);

        //dispatch(props.setUser(updatedUser));
        setTimeout(() => {
            if (isValidRoomId) {
                em_chat.doc(roomData.id).set({
                    head: pic,
                    expiry: values.expiry,
                    name: values.name,
                    type: values.type,
                    time: timestamp(),
                    attendees: selectedUsers.map(user => parseInt(user.id))
                })
                    .then(() => {
                        alert("success!");
                        setloading(false);
                        setSubmitting(false);
                        history.push("/management");
                    })
            } else {
                em_chat.add({
                    head: pic,
                    expiry: values.expiry,
                    name: values.name,
                    type: values.type,
                    time: timestamp(),
                    attendees: selectedUsers.map(user => parseInt(user.id))
                })
                    .then(() => {
                        alert("success!");
                        setloading(false);
                        setSubmitting(false);
                        history.push("/management");
                    })
            }


        }, 1000);
    };
    // UI Helpers
    const Schema = Yup.object().shape({
        expiry: Yup.bool(),
        name: Yup.string().required("Required").test("empty-test", "Name must be at least 4 characters", name => !/^\s*$/.test(name) && String(name).length > 3),
        type: Yup.string().required("Required").test("empty-test", "Name must be at least 3 characters", type => !/^\s*$/.test(type) && String(type).length > 2),
    });
    const getInputClasses = (fieldname) => {
        if (formik.touched[fieldname] && formik.errors[fieldname]) {
            return "is-invalid";
        }

        if (formik.touched[fieldname] && !formik.errors[fieldname]) {
            return "is-valid";
        }

        return "";
    };
    const formik = useFormik({
        initialValues,
        validationSchema: Schema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            submit(values, setStatus, setSubmitting);
        },
        onReset: (values, { resetForm }) => {
            resetForm();
        },
    });
    const getProjectPic = () => {
        if (!pic || pic === "") {
            return defaultHead;
        }
        return `url(http://tianmengroup.com/server/projectimages/${pic})`;
    };
    const removePic = () => {
        setPic("");
    };
    const handleChange = (event) => {
        setLoadingImg(true);
        const file = event.target.files[0];

        let formData = new FormData();
        formData.append("file", file);
        formData.append("session", session);
        formData.append("target", "projectimages");

        setTimeout(() => {
            axios
                .post("http://tianmengroup.com/server/universalUpload.php", formData)
                .then(({ data }) => {
                    if (data.success === "success") {
                        setPic(data.data);
                    } else {
                        setPic("");
                        alert(data.message);
                    }
                    setLoadingImg(false);
                })
                .catch(() => {
                    setPic("");
                    alert("Upload failed");
                    setLoadingImg(false);
                });
        }, 1000)
    }

    return <>
        <VCModal title="Not Enough Members" body="You must have at leats two members in a project." show={modalValuesLength} onHide={() => setModalValuesLength(false)} />
        <form
            className="card card-custom gutter-b"
            onSubmit={formik.handleSubmit}
        >
            <div className="card-header d-flex justify-content-between">
                <h3 className="card-title">
                    {isValidRoomId ? `Project id: ${roomData.id}` : "New Project"}
                </h3>
                <button
                    type="submit"
                    className="btn btn-success mr-2 my-6 px-3"
                    disabled={
                        formik.isSubmitting || (formik.touched && !formik.isValid)
                    }
                >
                    Save Changes
            {formik.isSubmitting}
                </button>
            </div>
            <div
                className="form"
            >
                {loading && <ModalProgressBar />}
                {/* begin::Body */}
                <div className="card-body">
                    <div className="form-group row">
                        <div className="col-xl-6 col-lg-6">
                            <div className="row">
                                <label className="col-xl-3 col-lg-3 col-form-label">Avatar</label>
                                <div className="col-lg-9 col-xl-6">
                                    <div
                                        className="image-input image-input-outline"
                                        id="kt_profile_avatar"
                                        style={{
                                            backgroundColor: "white"
                                        }}
                                    >
                                        {loadingImg ? (<Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>) : (<div
                                            className="image-input-wrapper"
                                            style={{ backgroundImage: `${getProjectPic()}` }}
                                        />)}

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
                            <div className="row pt-6">
                                <label className="col-xl-3 col-lg-3 col-form-label">
                                    Name
                            </label>
                                <div className="col-lg-9 col-xl-6 ">
                                    <input
                                        type="text"
                                        placeholder="Project Name"
                                        className={`form-control form-control-lg form-control-solid ${getInputClasses(
                                            "name"
                                        )}`}
                                        name="name"
                                        {...formik.getFieldProps("name")}
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="invalid-feedback">
                                            {formik.errors.name}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="row pt-6">
                                <label className="col-xl-3 col-lg-3 col-form-label">
                                    Type
                            </label>
                                <div className="col-lg-9 col-xl-6 ">
                                    <input
                                        type="text"
                                        placeholder="Mini App, App, Web, Wordpress..."
                                        className={`form-control form-control-lg form-control-solid ${getInputClasses(
                                            "type"
                                        )}`}
                                        name="type"
                                        {...formik.getFieldProps("type")}
                                    />
                                    {formik.touched.type && formik.errors.type ? (
                                        <div className="invalid-feedback">
                                            {formik.errors.type}
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            {isValidRoomId ? (
                                <NavLink to={`/sm/${roomData.id}`}>
                                    <Button variant="primary" size="lg" className="mt-10">
                                        Manage subscription & payment
                                    </Button>
                                </NavLink>
                            ) : (
                                    <Button disabled variant="primary" size="lg" className="mt-10">
                                        Manage subscription & payment
                                    </Button>
                                )}



                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="row">
                                <label className="col-xl-3 col-lg-3 col-form-label">
                                    Expiry
                            </label>
                                <div className="col-lg-9 col-xl-6 ">
                                    <Switch
                                        checked={formik.values.expiry}
                                        name="expiry"
                                        onChange={formik.handleChange}
                                        value="expiry"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </div>
                            </div>
                            <p className="pt-6">Group Members</p>
                            {
                                selectedUsers.length === 0 ? (<Button variant="outline-secondary" size="sm" className="mr-3 my-3" disabled>
                                    Empty <Badge variant="light">NoMember</Badge>
                                </Button>) : selectedUsers.map(user => (
                                    <Grow key={user.login} in={true}>
                                        <Button variant="outline-primary" size="sm" className="mr-3 my-3" onClick={event => removeSelectAt(event, user.login)}>
                                            {user.name} <Badge variant="light">{user.login}</Badge>
                                        </Button>
                                    </Grow>
                                ))
                            }
                        </div>

                    </div>


                </div>
            </div>
        </form>
    </>;
}

ProjectCreatorPageTitle.propTypes = {
    session: PropTypes.string.isRequired,
    roomData: PropTypes.object.isRequired,
    selectedUsers: PropTypes.array.isRequired,
    removeSelectAt: PropTypes.func.isRequired
}