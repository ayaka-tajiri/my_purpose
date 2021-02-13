import React, {ReactElement, useEffect, useState} from "react";
import Link from "next/link";
import {Table, TableBody, TableCell, TableContainer, TableRow} from "@react-md/table";
import styles from "./Purposes.module.scss";
import {Text} from "react-md";
import {MyPurposeClient} from "../../generated/mypurpose_pb_service";
import {PurposeRequest} from "../../generated/mypurpose_pb";
import PurposesAddDialog from "./PurposesAddDialog";
import PurposeDeleteDialog from "./PurposeDeleteDialog";
import {useFetchUser} from "../../lib/User";

const myPurposeClient = new MyPurposeClient('http://localhost:8080', {});
const request = new PurposeRequest();

interface Purpose {
    id: string
    userId: string
    description: string
}

export default function Purposes(): ReactElement {
    const [purposes, setPurposes] = useState<Purpose[]>([])
    const [userId, setUserId] = useState<string>("")
    const [addPurpose, setAddPurpose] = useState<Purpose>()
    const [deletePurposeId, setDeletePurposeId] = useState<string>("")

    const user = useFetchUser();
    const sub = (user.user?.sub) ? user.user?.sub : '';

    useEffect(() => {
        setUserId(sub);
        request.setUserId(sub);
        const response = myPurposeClient.indexPurposes(request);
        let newPurposes: Purpose[] = [];
        response.on('data', (message) => {
            newPurposes.push({
                id: message.getId(),
                userId: message.getUserId(),
                description: message.getDescription()
            })
            newPurposes = newPurposes.slice()
            setPurposes(newPurposes)
        })
    }, [])

    useEffect(() => {
        if (addPurpose) {
            let newPurposes = [...purposes];
            newPurposes.push(addPurpose);
            setPurposes(newPurposes);
        }
    }, [addPurpose])

    useEffect(() => {
        if (deletePurposeId) {
            // 消された値を配列から削除する
            const deleteIndex = purposeListIndex(deletePurposeId);
            let newPurposes = [...purposes];
            newPurposes.splice(deleteIndex, 1);
            setPurposes(newPurposes);
        }
    }, [deletePurposeId])

    function purposeListIndex(id: string) {
        return purposes.findIndex(purpose => purpose.id === id);
    }

    return (
        <div className={styles.div}>
            <Text type="headline-5">PURPOSES</Text>
            <TableContainer>
                <Table fullWidth>
                    <TableBody>
                        {
                            purposes.map(purpose =>
                                <TableRow key={purpose.id}>
                                    <Link href={{
                                        pathname: "/purpose/[id]",
                                        query: {id: [purpose.id]},
                                    }}
                                          key={'link_' + purpose.id}>
                                        <TableCell grow={true}>{purpose.description}</TableCell>
                                    </Link>
                                    <TableCell grow={false}>
                                        <PurposeDeleteDialog purposeId={purpose.id} setDeletePurposeId={setDeletePurposeId}/>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <PurposesAddDialog userId={userId} setAddPurpose={setAddPurpose}/>
        </div>
    )
}
