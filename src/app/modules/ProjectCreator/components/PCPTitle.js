import React, { useState, useEffect } from "react";
import { useFormik, produce } from "formik";
import * as Yup from "yup";
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { ModalProgressBar } from "../../../../_metronic/_partials/controls";
import Switch from '@material-ui/core/Switch';
import { em_chat, em_room, timestamp } from '../../../../services/firebaseInit';
import VCModal from "../../Modal/VCModal";
import Grow from '@material-ui/core/Grow';

export default function ProjectCreatorPageTitle({ roomData, selectedUsers, removeSelectAt }) {
    const defaultHead = "http://tianmengroup.com/server/projectimages/blank.png";
    const [loading, setloading] = useState(false);
    const [pic, setPic] = useState(defaultHead);
    const [modalValuesLength, setModalValuesLength] = useState(false);
    const [initialValues, setValues] = useState({
        expiry: false,
        name: "",
        type: "",
    });

    useEffect(() => {
        if (roomData.id.length === 20) {
            setPic(roomData.head);
            formik.setValues({
                expiry: roomData.expiry,
                name: roomData.name,
                type: roomData.type
            });
        }
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
            em_chat.add({
                head: pic,
                expiry: values.expiry,
                name: values.name,
                type: values.type,
                time: timestamp(),
                attenders: selectedUsers.map(user => parseInt(user.id))
            })
                .then(() => {
                    console.log("success!!!!!!");
                    setloading(false);
                    setSubmitting(false);
                })

            // Do request to your server for user update, we just imitate user update there, For example:
            // update(updatedUser)
            //  .then(()) => {
            //    setloading(false);
            //  })
            //  .catch((error) => {
            //    setloading(false);
            //    setSubmitting(false);
            //    setStatus(error);
            // });
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
        if (!pic) {
            return defaultHead;
        }
        return `url(${pic})`;
    };
    const removePic = () => {
        setPic(defaultHead);
    };
    const handleChange = (event) => {
        setPic(URL.createObjectURL(event.target.files[0]))
    }

    return <>
        <VCModal title="Not Enough Members" body="You must have at leats two members in a project." show={modalValuesLength} onHide={() => setModalValuesLength(false)} />
        <form
            className="card card-custom gutter-b"
            onSubmit={formik.handleSubmit}
        >
            <div className="card-header d-flex justify-content-between">
                <h3 className="card-title">
                    {roomData.id.length === 20 ? `Project id: ${roomData.id}` : "New Project"}
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
                                        <div
                                            className="image-input-wrapper"
                                            style={{ backgroundImage: `${getProjectPic()}` }}
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
    roomData: PropTypes.object.isRequired,
    selectedUsers: PropTypes.array.isRequired,
    removeSelectAt: PropTypes.func.isRequired
}