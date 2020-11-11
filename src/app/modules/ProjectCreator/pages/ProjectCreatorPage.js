import React, { useState, useEffect } from "react";
import EnhancedTable from "../components/EnhancedTable";
import { useSelector, shallowEqual } from "react-redux";
import ProjectCreatorPageTitle from "../components/PCPTitle";
import { useSubheader } from "../../../../_metronic/layout";
import axios from "axios";

export const ProjectCreatorPage = ({match}) => {

    const suhbeader = useSubheader();
    suhbeader.setTitle("Project Creator");
    const user = useSelector((state) => state.auth.user, shallowEqual);

    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        axios.get("http://tianmengroup.com/server/socket/user/getAllUser.php", {
            params: {
                session: user.user_session
            }
        })
        .then(({data}) => {
            if (data.success === "success"){
                setUsers(data.data.map(user => {
                    return createData(user.id, user.display_name, user.user_login, user.company_name, false);
                }));
            } else {
                alert("wrong!");
            }
        })
    }, [])

    useEffect(() => {
        setSelectedUsers(users.filter(user => user.isSelected));
    }, [users])

    function createData(id, name, login, company, isSelected) {
        return { id, name, login, company, isSelected };
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
                <ProjectCreatorPageTitle title={match.params.id} selectedUsers={selectedUsers} removeSelectAt={selectUser}></ProjectCreatorPageTitle>
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