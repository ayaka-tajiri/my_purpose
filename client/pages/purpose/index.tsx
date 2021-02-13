import React, {ReactElement} from "react";
import PurposesComponent from "../../components/Purposes/Purposes"
import WithAuth from "../../components/Authentication/WithAuth";

export default function Purposes(): ReactElement {
    return (
        <WithAuth>
            <PurposesComponent />
        </WithAuth>
    )
}
