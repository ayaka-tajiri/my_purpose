import React, {ReactElement, useEffect, useState} from 'react';
import {Select, TextField} from '@react-md/form'
import {Button, Grid, GridCell} from 'react-md'
import {RemoveSVGIcon, AddSVGIcon} from '@react-md/material-icons'
import styles from './Action.module.scss'
import {v4 as uuidV4} from 'uuid'
import {MyPurposeClient} from '../../generated/mypurpose_pb_service';
import {ActionRequest} from '../../generated/mypurpose_pb';
import moment from 'moment';

const myPurposeClient = new MyPurposeClient('http://localhost:8080', {});
const request = new ActionRequest();
const currentDate = moment(new Date()).format('YYYY-MM-DD')

interface Action {
    id: string
    description: string
    period: string
    date: string
    orderNumber: number
}

interface PurposeProps {
    purposeId: string
}

export default function Action({purposeId}:PurposeProps): ReactElement {
    const [actions, setActions] = useState<Action[]>([])
    const period = ['everyday', 'every week', 'every month', 'day'];

    useEffect(() => {
        setActions([])
        request.setPurposeid(purposeId)
        const response = myPurposeClient.indexActions(request);
        let newActions: Action[] = []
        response.on('data', (message) => {
            const date = moment(new Date(message.getDate())).format('YYYY-MM-DD');
            newActions.push({
                id: message.getId(),
                description: message.getDescription(),
                period: message.getPeriod(),
                date: date,
                orderNumber: message.getOrdernumber()
            })
            newActions = newActions.slice()
            setActions(newActions)
        })
    }, [])

    function addAction(id: string, orderNumber: number): void {
        actions.push({id: id, description: '', period: 'everyday', date: '', orderNumber: orderNumber})
        const newActions = actions.slice()
        setActions(newActions)
    }

    function createAction(id: string, orderNumber: number): void {
        request.setId(id)
        request.setPurposeid(purposeId)
        request.setDescription('')
        request.setPeriod('everyday')
        request.setDate('')
        request.setOrdernumber(orderNumber)
        myPurposeClient.createAction(request, (error) => {
            if (error) {
                console.log(error)
            }
        })
    }

    function changeAction(action: Action): void {
        const index = getIndex(action.id)
        actions.splice(index, 1, action)
        const newActions = actions.slice()
        setActions(newActions)
    }

    function updateAction(action: Action): void {
        request.setId(action.id)
        request.setPurposeid(purposeId)
        request.setDescription(action.description)
        request.setPeriod(action.period)
        request.setDate(action.date)
        request.setOrdernumber(action.orderNumber)
        myPurposeClient.editAction(request, (error) => {
            if (error) {
                console.log(error)
            }
        })
    }

    function changeActionOrderNumber(): void {
        const newActions = actions.map((action, index) => {
            if (action.orderNumber !== index + 1) {
                action.orderNumber = index + 1
                updateAction(action)
            }
            return action
        })
        setActions(newActions)
    }

    function removeAction(id: string): void {
        const index = getIndex(id)
        actions.splice(index, 1)
        const newActions = actions.slice()
        setActions(newActions)
    }

    function deleteAction(id: string) {
        request.setId(id)
        request.setPurposeid(purposeId)
        myPurposeClient.deleteAction(request, (error) => {
            if (error) {
                console.log(error)
                return
            }
            changeActionOrderNumber()
        })
    }

    function getIndex(id: string): number {
        return actions.findIndex(action => action.id === id)
    }

    return (
        <div className={styles.div}>
            {
                actions.map(action =>
                    <Grid key={action.id}>
                        <GridCell colSpan={1} key={'remove_' + action.id} className={styles.item}>
                            <Button onClick={() => {
                                const id = action.id
                                removeAction(id)
                                deleteAction(id)
                            }}>
                                <RemoveSVGIcon/>
                            </Button>
                        </GridCell>
                        <GridCell colSpan={7} key={'action_' + action.id}>
                            <TextField id={'description_' + action.id}
                                       placeholder='ACTION'
                                       theme={'underline'}
                                       value={action.description}
                                       onChange={(event) => {
                                           action.description = event.target.value
                                           changeAction(action)
                                           updateAction(action)
                                       }}/>
                        </GridCell>
                        <GridCell colSpan={2} key={'period_' + action.id}>
                            <Select
                                id={'period_' + action.id}
                                options={period}
                                value={action.period}
                                theme={'underline'}
                                onChange={(event) => {
                                    action.period = event
                                    if (event === 'day') {
                                        action.date = currentDate
                                    }
                                    changeAction(action)
                                    updateAction(action)
                                }}
                            />
                        </GridCell>
                        <GridCell colSpan={2} key={'date_' + action.id}>
                            {
                                action.period === 'day' &&
                                <TextField id={'date_' + action.id}
                                           theme={'underline'}
                                           value={action.date}
                                           type={'date'}
                                           onChange={(event) => {
                                               action.date = event.target.value
                                               changeAction(action)
                                               updateAction(action)
                                           }}/>
                            }
                        </GridCell>
                    </Grid>
                )
            }
            <Grid key={'add_button'}>
                <GridCell colSpan={1}>
                </GridCell>
                <GridCell colSpan={7}>
                    <Button className={styles.add_button} onClick={()=>{
                        const id = uuidV4().toString()
                        const orderNumber = actions.length + 1
                        addAction(id, orderNumber)
                        createAction(id, orderNumber)
                    }}>
                        <AddSVGIcon/> add action
                    </Button>
                </GridCell>
                <GridCell colSpan={4}>
                </GridCell>
            </Grid>
        </div>
    )
}
