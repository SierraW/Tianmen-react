import React, { useEffect, useState } from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from "react-router-dom";
import { em_appointment } from "../../../../services/firebaseInit";
import { formatDate } from "../../../../services/datePrintingService";
import { useSelector } from "react-redux";
import { appointmentConverter } from "../objects/Appointment";
import TimelineOngoingAppointmentTable from "../components/TOAppointmentTable";
import VerticallyCenteredModal from "../../Modal/VCModal";
import CustomVCModal from "../../Modal/CustomVCModal";
import { sendCancelationEmail } from "../../../../services/emailService";
import { formatDateMDY } from "../../../../services/datePrintingService";
import TimelineOngoingAppointmentCancelForm from "../components/TOAppointmentCancelForm";

export function TimelineOngoingPage() {
    const user = useSelector((state) => state.auth.user);
    const [showCancelForm, setShowCancelForm] = useState(null);
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
                    appointment = { ...appointment, id: doc.id };
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
                    appointment = { ...appointment, id: doc.id };
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
    }, [now, user.user_login]);

    function handleReqDel(loc, docId) {
        if (loc === 2) {
            setWarning("You cannot delete appointment from the past.");
        } else {
            setShowCancelForm({
                loc,
                docId
            });
        }
    }

    function handleDelete(rua) {
        var reason = "";
        if (!/^\s*$/.test(rua)) {
            reason = `, due to ${rua}`
        }
        const loc = showCancelForm.loc;
        const docId = showCancelForm.docId;
        em_appointment().doc(docId).delete()
            .then(() => {
                var newApps = [...appointments];
                if (loc === 0) {
                    newApps = [...hostedAppointments];
                }

                const index = newApps.findIndex((app) => app.id === docId);
                const deletedApp = newApps.splice(index, 1)[0];

                if (loc === 0) {
                    setHostedAppointment(newApps);
                } else {
                    setAppointment(newApps);
                }

                if (deletedApp) {
                    sendCancelationEmail(deletedApp.advisor.display_name, deletedApp.advisor.email, deletedApp.user.display_name, deletedApp.user.email, formatDateMDY(deletedApp.date), deletedApp.timeline, deletedApp.contact.method, deletedApp.contact.content, user.display_name, reason);
                }
            })
            .catch(() => {
                setWarning("Delete failed, please check your network.");
            })
        setShowCancelForm(null);
    }

    if (loading) {
        return <div className="card card-body">
            <Skeleton animation="wave" variant="rect" height={200} />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
        </div>
    } else {
        return <>
            <CustomVCModal body={() => (<TimelineOngoingAppointmentCancelForm onSubmit={(rua) => handleDelete(rua)} />)} show={showCancelForm !== null} onHide={() => setShowCancelForm(null)} />
            <VerticallyCenteredModal title="Warning" body={warning ? warning : ""} show={warning !== false} onHide={() => setWarning(false)} />
            {
                hostedAppointments.length > 0 ? (
                    <div className="card card-body mb-6">
                        <h3 className="text-center">Hosted Appointments</h3>
                        <TimelineOngoingAppointmentTable handleDelete={(docId) => handleReqDel(0, docId)} appointments={hostedAppointments} login={user.user_login} />
                    </div>
                ) : (
                        appointments.length > 0 ? (
                            <div className="card card-body mb-6">
                                <h3 className="text-center">My Appointments</h3>
                                <TimelineOngoingAppointmentTable handleDelete={(docId) => handleReqDel(1, docId)} appointments={appointments} login={user.user_login} />
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
                        <TimelineOngoingAppointmentTable handleDelete={(docId) => handleReqDel(2, docId)} appointments={pastAppointments} login={user.user_login} />
                    </div>
                ) : ""
            }
        </>;
    }

}