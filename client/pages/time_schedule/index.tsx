import React, {ReactElement} from "react";
import TimeScheduleComponent from "../../components/TimeSchedule/TimeSchedule";
import WithAuth from "../../components/Authentication/WithAuth";

export default function TimeSchedule(this: any): ReactElement {
    return (
        <WithAuth>
            <TimeScheduleComponent/>
        </WithAuth>
    )
}
