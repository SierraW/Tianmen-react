import React, { useEffect, useState } from "react";
import { useSubheader } from "../../../../_metronic/layout";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import ProjectSubscriptionCard from "../components/ProjectSubscriptionCard";
import { delay } from "../../../../services/delayLoading";
import { em_addOn } from "../../../../services/firebaseInit";

export const ProjectAddOnPage = () => {
    const suhbeader = useSubheader();
    suhbeader.setTitle("Projects Overview");
    const [loading, setLoading] = useState(true);
    const [psCards, setPSCard] = useState([]);

    useEffect(() => {
        em_addOn.where("available", "==", true).get().then((querySnapshot) => {
            var dataArr = [];
            querySnapshot.forEach((doc) => {
                dataArr.push({
                    pid: doc.id,
                    title: doc.data().name,
                    desList: doc.data().des.split(/\r?\n/),
                    price: doc.data().price
                })
            });
            setPSCard(dataArr);
        })
        delay().then(setLoading(false));
    }, [])

    if (loading) {
        return <LayoutSplashScreen />
    } else {
        return <>
            <div className="row">
                {
                    psCards.map((card, index) => (<ProjectSubscriptionCard key={index} className="col-lg-4 my-4" title={card.title} subtitle="Add-On" desList={card.desList} pid={card.pid} price={`CAD$${card.price}/Month`} />))
                }
            </div>
        </>;
    }
};