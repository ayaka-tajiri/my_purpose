import React, {ReactElement, useEffect, useState} from "react";
import {TextField} from "@react-md/form"
import {Text} from "react-md"
import styles from "./Purpose.module.scss"
import {MyPurposeClient} from "../../generated/mypurpose_pb_service";
import {PurposeRequest} from "../../generated/mypurpose_pb";

const myPurposeClient = new MyPurposeClient('http://localhost:8080', {});
const request = new PurposeRequest();

interface Purpose {
    id: string
    userId: string
    description: string
}

interface PurposeProps {
    purposeId: string
}

export default function Purpose({purposeId}:PurposeProps): ReactElement {
    const [purpose, setPurpose] = useState<Purpose>({id: "", userId: "", description: ""})

    useEffect(() => {
        request.setId(purposeId)
        myPurposeClient.showPurpose(request, (_, responseMessage) => {
            const id = (responseMessage?.getId()) ? responseMessage?.getId() : '';
            const userId = (responseMessage?.getUserId()) ? responseMessage?.getUserId() : '';
            const description = (responseMessage?.getDescription()) ? responseMessage?.getDescription() : '';
            const newPurpose = {id: id, userId: userId, description: description}
            setPurpose(newPurpose)
        });
    }, [])

    function updatePurpose(description: string): void {
        request.setId(purpose.id)
        request.setDescription(description)
        myPurposeClient.editPurpose(request, (err) => {
            if (err) {
                console.log(err)
            }
        })
    }

    return (
        <div className={styles.div}>
            <Text type="headline-5">MY PURPOSE</Text>
            <TextField id="textField"
                       value={purpose.description}
                       theme={"underline"}
                       type={"text"}
                       onChange={(event) => {
                           const newPurpose = {id: purpose.id, userId: purpose.userId, description: event.target.value}
                           setPurpose(newPurpose)
                           updatePurpose(event.target.value)
                       }}
                       placeholder="PURPOSE"/>
            <Text type="headline-5">ACTIONS</Text>
        </div>
    )
}
