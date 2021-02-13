import React, {ReactElement} from "react";
import styles from "./TimeSchedule.module.scss"
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function TimeSchedule(): ReactElement {
    return (
        <div className={styles.time_schedule}>
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                height="auto"
            />
        </div>
    )
}
