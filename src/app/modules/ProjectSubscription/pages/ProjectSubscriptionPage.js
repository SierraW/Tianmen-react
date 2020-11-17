import React, { useEffect, useState } from "react";
import { useSubheader } from "../../../../_metronic/layout";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { useSelector } from "react-redux";
import ProjectSubscriptionCard from "../components/ProjectSubscriptionCard";
import { delay } from "../../../../services/delayLoading";

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

export const ProjectSubscriptionPage = () => {
    const suhbeader = useSubheader();
    suhbeader.setTitle("Projects Overview");
    const [loading, setLoading] = useState(true);
    const [psCards, setPSCard] = useState(pscards);
    const uid = useSelector((state) => state.auth.user.id);

    useEffect(() => {
        delay().then(setLoading(false));
    }, [])

    if (loading) {
        return <LayoutSplashScreen />
    } else {
        return <>
            <div className="row">
                {
                    psCards.map((card, index) => (<ProjectSubscriptionCard key={index} className="col-lg-4 my-4" title={card.title} subtitle={card.subtitle} desList={card.desList} pid={card.pid} price={card.price} />))
                }
            </div>
        </>;
    }
};