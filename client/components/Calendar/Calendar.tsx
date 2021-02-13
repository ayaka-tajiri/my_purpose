import React, {ReactElement, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {MyPurposeClient} from "../../generated/mypurpose_pb_service";
import {CalendarRequest} from "../../generated/mypurpose_pb";
import moment from "moment";
import styles from "./Calender.module.scss";
import {useFetchUser} from "../../lib/User";

const myPurposeClient = new MyPurposeClient('http://localhost:8080', {});
const request = new CalendarRequest();

interface Calendar {
    title: string
    start: string
}

export default function Calendar(): ReactElement {
    const [calendars, setCalendars] = useState<Calendar[]>([])
    const user = useFetchUser();
    const sub = (user.user?.sub) ? user.user?.sub : '';

    function changeCalendar(currentMonth: string) {
        request.setUserId(sub)
        request.setMonth(currentMonth)
        const response = myPurposeClient.indexCalendars(request);
        let newCalendars: Calendar[] = []
        response.on('data', (message) => {
            newCalendars.push({
                title: message.getTitle(),
                start: message.getStart(),
            })
            newCalendars = newCalendars.slice()
            setCalendars(newCalendars)
        })
    }

    return (
        <div className={styles.calender}>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                height="auto"
                events={calendars}
                datesSet={(event) => {
                    const currentStart = event.view.currentStart
                    const currentStartMonth = moment(currentStart).format("YYYY-MM")
                    changeCalendar(currentStartMonth)
                }}
            />
        </div>
    )
}
