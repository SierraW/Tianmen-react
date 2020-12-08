import emailjs, { init } from 'emailjs-com';
init("user_4DPuwLdPkRHSfCeBhbGI9");

export function sendConfrimationEmail(managerDN, userDN, userEmail, date, timeline, method, contactInfo, managerEmail) {
    emailjs.send("service_x67lyfo", "template_b0sshdq", {
        from_name: managerDN,
        to_name: userDN,
        to_email: userEmail,
        date,
        from: timeline.from,
        to: timeline.to,
        method: method,
        contact: contactInfo,
        reply_to: managerEmail,
        manager: managerDN
    });
    emailjs.send("service_x67lyfo", "template_7p5zkow", {
        from_name: managerDN,
        to_name: userDN,
        to_email: managerEmail,
        date,
        from: timeline.from,
        to: timeline.to,
        method: method,
        contact: contactInfo,
        reply_to: managerEmail,
        manager: managerDN
    });
}

export function sendCancelationEmail(managerDN, managerEmail, userDN, userEmail, date, timeline, method, contactInfo, can_name, can_reason) {
    emailjs.send("service_x67lyfo", "template_l3ciywl", {
        from_name: managerDN,
        to_name: userDN,
        to_email: userEmail,
        date,
        from: timeline.from,
        to: timeline.to,
        method: method,
        contact: contactInfo,
        reply_to: managerEmail,
        manager: managerDN,
        can_name,
        can_reason
    });
    emailjs.send("service_x67lyfo", "template_l3ciywl", {
        from_name: managerDN,
        to_name: userDN,
        to_email: managerEmail,
        date,
        from: timeline.from,
        to: timeline.to,
        method: method,
        contact: contactInfo,
        reply_to: managerEmail,
        manager: managerDN,
        can_name,
        can_reason
    });
}