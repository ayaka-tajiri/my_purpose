import React, {ReactElement} from "react";
import CalendarComponent from "../../components/Calendar/Calendar"
import WithAuth from "../../components/Authentication/WithAuth";

export default function Calendar(): ReactElement {
    return (
        <WithAuth>
            <CalendarComponent />
        </WithAuth>
    )
}
