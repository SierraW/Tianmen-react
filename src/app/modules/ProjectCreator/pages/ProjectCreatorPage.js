import React, { useState, useEffect } from "react";
import EnhancedTable from "../components/EnhancedTable";
import ProjectCreatorPageTitle from "../components/PCPTitle";
import { useSubheader } from "../../../../_metronic/layout";

export const ProjectCreatorPage = () => {

    const suhbeader = useSubheader();
    suhbeader.setTitle("Project Creator");

    const [users, setUsers] = useState([
        createData('Cupcake', 'cpcak', 'Firestudio', false),
        createData('Cupcake2', 'cpcak2', 'Firestudio', false)
    ]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        setSelectedUsers(users.filter(user => user.isSelected));
    }, [users])

    function createData(name, login, company, isSelected) {
        return { name, login, company, isSelected };
    }

    function selectUser(event, userLogin) {

        setUsers(users.map(user => {
            if (user.login === userLogin) {
                user.isSelected = !user.isSelected;
            }
            return user;
        }));
    }

    return <>
        <div className="row">
            <div className="col-lg-12">
                <ProjectCreatorPageTitle selectedUsers={selectedUsers} removeSelectAt={selectUser}></ProjectCreatorPageTitle>
            </div>
            <div className="col-lg-4">
                <EnhancedTable users={users} selectUser={selectUser} tableTitle="Users sorted by name" defaultOrderBy="name"></EnhancedTable>
            </div>
            <div className="col-lg-4">
                <EnhancedTable users={users} selectUser={selectUser} tableTitle="Users sorted by company" defaultOrderBy="company"></EnhancedTable>
            </div>
            <div className="col-lg-4">
                <EnhancedTable users={users} selectUser={selectUser} tableTitle="Users sorted by login" defaultOrderBy="login"></EnhancedTable>
            </div>
        </div>

    </>;
} 