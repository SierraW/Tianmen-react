export class User {
    constructor (email, login, display_name) {
        this.email = email;
        this.login = login;
        this.display_name = display_name;
    }

    toObject() {
        return {
            email : this.email,
            login : this.login,
            display_name : this.display_name,
        }  
    }
}

export class Contact {
    constructor (method, content) {
        this.method = method;
        this.content = content;
    }

    toObject() {
        return {
            content: this.content,
            method: this.method
        }
    }
}


export class Appointment {
    constructor(advisorData, userData, contactData, date, timeline) {
        this.advisor = advisorData;
        this.user = userData;
        this.contact = contactData
        this.date = date;
        this.timeline = timeline;
    }
}

export var appointmentConverter = {
    toFirestore: function(appointment) {
        return {
            advisor: appointment.advisor.toObject(),
            user: appointment.user.toObject(),
            contact: appointment.contact.toObject(),
            date : appointment.date,
            timeline: appointment.timeline
        }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Appointment(
            new User(data.advisor.email, data.advisor.login, data.advisor.display_name),
            new User(data.user.email, data.user.login, data.user.display_name),
            new Contact(data.contact.method, data.contact.content),
            data.date,
            data.timeline
            )
    }
}