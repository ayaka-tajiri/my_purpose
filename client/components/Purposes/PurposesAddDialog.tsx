import React, {ReactElement, useState} from "react";
import {AddSVGIcon, Button, Dialog, DialogContent, DialogFooter, TextField} from "react-md";
import {MyPurposeClient} from "../../generated/mypurpose_pb_service";
import {PurposeRequest} from '../../generated/mypurpose_pb';

const myPurposeClient = new MyPurposeClient('http://localhost:8080', {});
const request = new PurposeRequest();

interface Purpose {
    id: string
    userId: string
    description: string
}

interface PurposesAddDialogProps {
    userId: string
    setAddPurpose: (purposes: Purpose) => void
}

export default function PurposesAddDialog({userId, setAddPurpose}: PurposesAddDialogProps): ReactElement {
    const [state, setState] = useState({ visible: false, modal: false });
    const [purposeDescription, setPurposeDescription] = useState("")
    const hide = (): void => {
        setState((prevState) => ({ ...prevState, visible: false }));
    };
    const show = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setState({
            visible: true,
            modal: event.currentTarget.id === "purpose-dialog-button",
        });
    };
    const { visible, modal } = state;

    function createPurpose() {
        request.setUserId(userId)
        request.setDescription(purposeDescription);
        myPurposeClient.createPurpose(request, (error, response) => {
            if (error) {
                console.log(error);
            }
            const newId = response?.getId();
            const newDescription = response?.getDescription();
            if (newId && newDescription) {
                const newPurpose = {
                    id: newId,
                    userId : '',
                    description: newDescription
                }
                setAddPurpose(newPurpose);
            }
            hide();
        })
    }
    return (
        <>
            <Button
                id="purpose-dialog-button"
                floating="bottom-right"
                onClick={show}>
                <AddSVGIcon />
            </Button>
            <Dialog
                id="purpose-add-dialog"
                modal={modal}
                visible={visible}
                onRequestClose={hide}
                aria-labelledby="add-dialog">
                <DialogContent>
                    <TextField
                        id="new-purpose"
                        label="New Purpose"
                        theme={'underline'}
                        onChange={(event) => {
                            setPurposeDescription(event.target.value)
                        }}
                    >
                    </TextField>
                </DialogContent>
                <DialogFooter>
                    <Button id="dialog-cancel" onClick={hide}>
                        Cancel
                    </Button>
                    <Button id="dialog-add" onClick={() => {
                        createPurpose();
                    }}>
                        Add
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}
