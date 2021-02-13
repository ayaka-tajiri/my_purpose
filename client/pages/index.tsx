import React, {ReactElement} from "react";
import WithAuth from "../components/Authentication/WithAuth";

export default function Home(): ReactElement {
    return (
        <WithAuth>
            <p>Dashboard</p>
        </WithAuth>
    )
}
