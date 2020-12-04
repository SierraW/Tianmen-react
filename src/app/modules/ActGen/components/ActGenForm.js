import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Paper from '@material-ui/core/Paper';
import { em_company, timestamp } from "../../../../services/firebaseInit";
import axios from "axios";
import { getAllTitle, createNewCompany } from "../../../../services/infoService";
import ActGenAutoCompleteCompanies from "./ActGenACCompanies";
import { useSelector } from "react-redux";

export default function ActGenForm() {
    const [numOfActCodes, setNumOfActCode] = useState(1);
    const [title, setTitle] = useState(9);
    const [company, setCompany] = useState("");
    const [actCodes, setActCode] = useState([]);
    const user = useSelector((state) => state.auth.user);

    async function handleSubmit(event) {
        event.preventDefault();
        var companyId = 0;
        var success = true;
        if (/^\s*$/.test(company)) {
            alert("Company name cannot be empty.");
            return;
        }
        await em_company.where("name", "==", company).get().then((querySnapshot) => {
            if (querySnapshot.size === 1) {
                querySnapshot.forEach(doc => {
                    companyId = doc.data().id;
                })
            }
        })
        if (companyId === 0) {
            await createNewCompany(em_company, timestamp, user, company).then(id => companyId = id)
            .catch((err) => {
                alert(err);
                success = false;
            })
        }

        if (!success) {
            return;
        }
        if (companyId === 0) {
            alert("Something went wrong.");
            return;
        }

        var formData = {
            session: user.user_session,
            num: numOfActCodes,
            title_id: title,
            role_id: 4,
            com_id: companyId,
            des: "Generated from tianmengroup.com"
        };
        axios.post("http://tianmengroup.com/server/socket/user/generateActCode.php", formData)
            .then(({ data }) => {
                var items = data.data;
                if (items.length == 0) {
                    throw new Error(data.message);
                }
                setActCode(items);
            })
            .catch(({ message }) => {
                alert("Generate Failed", message, "danger");
            });
    }

    return <>
        <Form onSubmit={(e) => handleSubmit(e)}>

            <Form.Group controlId="formNACN">
                <Form.Label>Number of activation codes nedded</Form.Label>
                <Form.Control value={numOfActCodes} onChange={(e) => setNumOfActCode(e.target.value)} type="number" />
            </Form.Group>

            <Form.Group controlId="formTIT">
                <Form.Label>
                    Title
                </Form.Label>
                <Form.Control
                    as="select"
                    custom
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                >
                    {
                        getAllTitle().map((ps, index) => (
                            <option key={index} value={ps.value}>{ps.text}</option>
                        ))
                    }
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formACAC">
                <Form.Label>Company</Form.Label>
                <ActGenAutoCompleteCompanies setCompany={setCompany} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        { actCodes.length === 0 ? "" : (
            <Paper elevation={3} className="mt-6">
                <div className="mx-6">
                    <br />
                    {
                        actCodes.map((code, index) => (
                            <h3 key={index}>{code}</h3>
                        ))
                    }
                    <br />
                </div>
            </Paper>
        )}
    </>
}