import React, { useEffect, useState } from "react";
import { useSubheader } from "../../../../_metronic/layout";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { useSelector } from "react-redux";
import ProjectSubscriptionCard from "../components/ProjectSubscriptionCard";
import { delay } from "../../../../services/delayLoading";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { em_room, timestamp } from "../../../../services/firebaseInit"
import ProjectSubscriptionManagementChart from "../components/PSMChart";
import ProjectSubscriptionManagementAddOnTable from "../components/PSMAddOnTable";
import ProjectSubscriptionManagementRecordForm from "../components/PSMRecordForm";
import ProjectSubscriptionManagementPaymentRecordTable from "../components/PSMPaymentRecordTable";
import { formatDate } from "../../../../services/datePrintingService";

const pscards = [
    {
        title: "Monthly Plan.",
        subtitle: "For personal and small business",
        desList: [
            "Personal / Small business website design.",
            "Free website hosting.",
            "Domain name email services.",
            "Server maintenance."
        ],
        pid: "JKLISOFONIO",
        price: "CAD $50 / Month"
    },
    {
        title: "Custom Plan.",
        subtitle: "For detailed design",
        desList: [
            "Custom design.",
            "Free website hosting.",
            "Domain name email services.",
            "Server maintenance."
        ],
        pid: "JKLISOFONIO",
        price: "CAD $5000"
    },
    {
        title: "SEO Plan.",
        subtitle: "For your business",
        desList: [
            "Search engine optimization.",
            "Monthly report.",
            "Social media control.",
            "Pro service."
        ],
        pid: "JKLISOFONIO",
        price: "CAD $150 / Month"
    },
    {
        title: "Contact Us...",
        subtitle: "For more infomation",
        desList: [
            "Your one-stop solution provider.",
            "Web design and hosting.",
            "App design and deploy.",
            "Pro SEO service."
        ],
        pid: "CONTACT-US",
        price: "Plan starts at $0"
    },
]

export const ProjectSubscriptionManagerPage = ({ match, history }) => {
    const suhbeader = useSubheader();
    suhbeader.setTitle("Manage Subscription and Payment");
    const [estAmount, setEstAmount] = useState(0);
    const [status, setStatus] = useState(0);
    const [startDate, setStartDate] = useState(formatDate(Date.now()));
    const [endDate, setEndDate] = useState(formatDate(Date.now()));
    const [loading, setLoading] = useState(true);
    const [psCards, setPSCard] = useState(pscards);
    const [cardHolder, setCardHolder] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExp, setCardExp] = useState("");
    const [cardCVV, setCardCVV] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [postal, setPostal] = useState("");
    const [country, setCountry] = useState("");
    const [power, setPower] = useState(false);
    const uid = useSelector((state) => state.auth.user.id);

    useEffect(() => {
        async function checkDoc() {
            try {
                if (match.params.id.length === 20) {
                    await em_room(match.params.id).get().then((doc) => {
                        if (!doc.exists) {
                            throw new Error();
                        }
                        if (doc.data().project) {
                            const project = doc.data().project;
                            if (project.start) {
                                setStartDate(formatDate(project.start.toDate()));
                            }
                            if (project.end) {
                                setEndDate(formatDate(project.end.toDate()));
                            }
                            setStatus(project.status);
                            setCardHolder(project.cardHolder);
                            setCardNumber(project.cardNumber);
                            setCardExp(project.cardExp);
                            setCardCVV(project.cardCVV);
                            setProvince(project.province);
                            setCity(project.city);
                            setAddress(project.address);
                            setPostal(project.postal);
                            setCountry(project.country);
                        }
                        setPower(true);
                    });
                } else {
                    throw new Error();
                }
            } catch (err) {
                alert("Access Denied");
                history.goBack();
            }
        }

        checkDoc();

        delay().then(setLoading(false));
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        const project = {
            start: timestamp(new Date(startDate)),
            end: timestamp(new Date(endDate)),
            status,
            cardHolder,
            cardNumber,
            cardExp,
            cardCVV,
            province,
            city,
            address,
            postal,
            country
        }
        if (power) {
            em_room(match.params.id).set({ project }, { merge: true })
                .then(() => alert("success"))
        } else {
            alert("Denied");
        }
    }

    if (loading) {
        return <LayoutSplashScreen />
    } else {
        return <>
            <div className="my-6"><h1 className="text-light">For project: {match.params.id}</h1></div>
            <div className="card">
                <div className="card-body">
                    <ProjectSubscriptionManagementChart pid={match.params.id} />
                    <ProjectSubscriptionManagementRecordForm pid={match.params.id} estAmount={estAmount} setEstAmount={setEstAmount} />
                    <ProjectSubscriptionManagementPaymentRecordTable pid={match.params.id} />
                </div>
            </div>
            <div className="card mt-6">
                <div className="card-body">
                    <ProjectSubscriptionManagementAddOnTable pid={match.params.id} setEstAmount={setEstAmount} />
                </div>
            </div>
            <div className="card mt-6">
                <Form className="card-body" onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group controlId="formStatus">
                        <Form.Label>
                            状态
                        </Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="0">...</option>
                            <option value="1">选模版</option>
                            <option value="2">制作中</option>
                            <option value="3">已上线</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formOP">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" />
                    </Form.Group>

                    <Form.Group controlId="formEND">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" />
                    </Form.Group>

                    <Form.Group controlId="formCH">
                        <Form.Label>Card Holder</Form.Label>
                        <Form.Control disabled value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} type="text" placeholder="John Doe" />
                    </Form.Group>

                    <Form.Group controlId="formCN">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control disabled value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} type="text" placeholder="4111 1111 1111 1111" />
                        <Form.Text className="text-muted">
                            Visa and Mastercard Only.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formED">
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control disabled value={cardExp} onChange={(e) => setCardExp(e.target.value)} type="text" placeholder="MM/YY" />
                    </Form.Group>
                    <Form.Group controlId="formCVV">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control disabled value={cardCVV} onChange={(e) => setCardCVV(e.target.value)} type="text" placeholder="xxx" />
                    </Form.Group>
                    <Form.Group controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control value={country} onChange={(e) => setCountry(e.target.value)} type="text" placeholder="Canada" />
                    </Form.Group>
                    <Form.Group controlId="formProv">
                        <Form.Label>Province / State</Form.Label>
                        <Form.Control value={province} onChange={(e) => setProvince(e.target.value)} type="text" placeholder="Ontario" />
                    </Form.Group>
                    <Form.Group controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="Markham" />
                    </Form.Group>
                    <Form.Group controlId="formADDR">
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="25 Valleywood Drive" />
                    </Form.Group>
                    <Form.Group controlId="formPost">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control value={postal} onChange={(e) => setPostal(e.target.value)} type="text" placeholder="A1B 2C3" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </Form>
            </div>

        </>;
    }
};