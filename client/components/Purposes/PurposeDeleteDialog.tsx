import React, {ReactElement, useState} from "react";
import {Button, DeleteSVGIcon, Dialog, DialogContent, DialogFooter, Text} from "react-md";
import {MyPurposeClient} from "../../generated/mypurpose_pb_service";
import {PurposeRequest} from "../../generated/mypurpose_pb";

const myPurposeClient = new MyPurposeClient('http://localhost:8080', {});
const request = new PurposeRequest();

interface PurposeDeleteDialogProps {
    purposeId: string
    setDeletePurposeId: (purposeId: string) => void
}

export default function PurposesDeleteDialog({purposeId, setDeletePurposeId}: PurposeDeleteDialogProps): ReactElement {
    const [state, setState] = useState({visible: false, modal: false});
    const hide = (): void => {
        setState((prevState) => ({...prevState, visible: false}));
    };
    const show = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setState({
            visible: true,
            modal: event.currentTarget.id === "dialog-button",
        });
    };
    const {visible, modal} = state;

    function deletePurpose() {
        request.setId(purposeId);
        myPurposeClient.deletePurpose(request, (err) => {
            if (err) {
                console.log(err)
                return
            }
            setDeletePurposeId(purposeId)
            hide()
        });
    }

    return (
        <>
            <Button
                id="dialog-button"
                onClick={show}>
                <DeleteSVGIcon/>
            </Button>
            <Dialog
                id="purpose-delete-dialog"
                modal={modal}
                visible={visible}
                onRequestClose={hide}
                aria-labelledby="delete-dialog">
                <DialogContent>
                    <Text>目標を削除します。</Text>
                </DialogContent>
                <DialogFooter>
                    <Button id="dialog-cancel" onClick={hide}>
                        Cancel
                    </Button>
                    <Button id="dialog-add" onClick={() => {
                        deletePurpose()
                    }}>
                        Delete
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}
