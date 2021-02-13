import React, {ReactElement, useState} from "react";
import PurposeComponent from "../../components/Purpose/Purpose";
import ActionComponent from "../../components/Action/Action"
import {router} from "next/client";
import WithAuth from "../../components/Authentication/WithAuth";

export default function Purpose(): ReactElement {
    const [purposeId] = useState<string>(() => {
        return (typeof router.query.id === "string") ? router.query.id : "";
    })
    return (
        <WithAuth>
            <PurposeComponent purposeId={purposeId}/>
            <ActionComponent purposeId={purposeId}/>
        </WithAuth>
    )
}
