import React, { useEffect, useState } from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from "react-router-dom";
import { em_appointment } from "../../../../services/firebaseInit";
import { formatDate } from "../../../../services/datePrintingService";
import { useSelector } from "react-redux";
import { appointmentConverter } from "../objects/Appointment";
import TimelineOngoingAppointmentTable from "../components/TOAppointmentTable";
import VerticallyCenteredModal from "../../Modal/VCModal";
import {sendCancelationEmail} from "../../../../services/emailService";
import {formatDateMDY} from "../../../../services/datePrintingService";

export function TimelineOngoingPage() {
    const user = useSelector((state) => state.auth.user);
    const [loading, setLoading] = useState(true);
    const [hostedAppointments, setHostedAppointment] = useState([]);
    const [appointments, setAppointment] = useState([]);
    const [pastAppointments, setPastAppointment] = useState([]);
    const [warning, setWarning] = useState(false);
    const now = formatDate(new Date());
    var pastMonth = function () {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        return formatDate(d);
    }

    useEffect(() => {
        async function load() {
            var pastResult = [];
            await em_appointment(user.user_login).withConverter(appointmentConverter).get().then((querySnapshot) => {
                var result = [];
                querySnapshot.forEach((doc) => {
                    var appointment = doc.data();
                    appointment = {...appointment, id: doc.id};
                    if (appointment.date < now) {
                        if (appointment.date < pastMonth()) {
                            em_appointment.doc(doc.id).delete();
                        } else {
                            pastResult.push(appointment);
                        }
                    } else {
                        result.push(appointment);
                    }
                });
                setHostedAppointment(result);
            })
            await em_appointment().where("user.login", "==", user.user_login).withConverter(appointmentConverter).get().then((querySnapshot) => {
                var result = [];
                querySnapshot.forEach((doc) => {
                    var appointment = doc.data();
                    appointment = {...appointment, id: doc.id};
                    if (appointment.date < now) {
                        pastResult.push(appointment);
                    } else {
                        result.push(appointment);
                    }
                });
                setAppointment(result);
                setPastAppointment(pastResult);
            })
            setLoading(false);
        }
        load();
    }, []);

    function handleDelete(loc, docId) {
        if (loc === 0 || loc === 1) {
            em_appointment().doc(docId).delete()
            .then(() => {
                if (loc === 0 ) {
                    var newApps = [...hostedAppointments];
                } else {
                    var newApps = [...appointments];
                }
                
                const index = newApps.findIndex((app) => app.id === docId);
                const deletedApp = newApps.splice(index, 1)[0];

                if (loc === 0 ) {
                    setHostedAppointment(newApps);
                } else {
                    setAppointment(newApps);
                }

                if (deletedApp) {
                    sendCancelationEmail(deletedApp.advisor.display_name, deletedApp.user.display_name, deletedApp.advisor.email, formatDateMDY(deletedApp.date), deletedApp.timeline, deletedApp.contact.method, deletedApp.contact.content, deletedApp.advisor.email);
                }
            })
            .catch(() => {
                setWarning("Delete failed, please check your network.");
            })
        } else {
            setWarning("You cannot delete appointment from the past.");
        }
    }

    if (loading) {
        return <div className="card card-body">
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
        </div>
    } else {
        return <>
            <VerticallyCenteredModal title="Warning" body={warning ? warning : ""} show={warning !== false} onHide={() => setWarning(false)} />
            {
                hostedAppointments.length > 0 ? (
                    <div className="card card-body mb-6">
                        <h3 className="text-center">Hosted Appointments</h3>
                        <TimelineOngoingAppointmentTable handleDelete={(docId) => handleDelete(0, docId)} appointments={hostedAppointments} login={user.user_login} />
                    </div>
                ) : (
                        appointments.length > 0 ? (
                            <div className="card card-body mb-6">
                                <h3 className="text-center">My Appointments</h3>
                                <TimelineOngoingAppointmentTable handleDelete={(docId) => handleDelete(1, docId)} appointments={appointments} login={user.user_login} />
                            </div>
                        ) : (
                                <div className="card card-body">
                                    <h3 className="text-center">My Appointments</h3>
                                    <p className="text-center">You don't have any upcoming appointments.</p>
                                    <Link className="text-center" to="/timeline/reservation" >Make an Appointment</Link>
                                </div>
                            )
                    )
            }

            {
                pastAppointments.length > 0 ? (
                    <div className="card card-body mt-6">
                        <h3 className="text-center">Past Appointments</h3>
                        <TimelineOngoingAppointmentTable handleDelete={(docId) => handleDelete(2, docId)} appointments={pastAppointments} login={user.user_login} />
                    </div>
                ) : ""
            }
        </>;
    }

}