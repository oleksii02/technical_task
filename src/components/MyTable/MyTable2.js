import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {DataGrid, GridCellModes} from '@mui/x-data-grid';
import {useEffect, useState} from "react";


function EditToolbar(props) {
    const {selectedCellParams, cellMode, cellModesModel, setCellModesModel} = props;


    const handleSaveOrEdit = () => {

        if (!selectedCellParams) {
            return;
        }
        const {id, field} = selectedCellParams;
        if (cellMode === 'edit') {

            console.log('EditToolbar',props )

            setCellModesModel({
                ...cellModesModel,
                [id]: {...cellModesModel[id], [field]: {mode: GridCellModes.View}},
            });
        } else {
            setCellModesModel({
                ...cellModesModel,
                [id]: {...cellModesModel[id], [field]: {mode: GridCellModes.Edit}},
            });
        }
    };

    const handleCancel = () => {
        if (!selectedCellParams) {
            return;
        }
        const {id, field} = selectedCellParams;
        console.log('handleCancel',selectedCellParams)
        setCellModesModel({
            ...cellModesModel,
            [id]: {
                ...cellModesModel[id],
                [field]: {mode: GridCellModes.View, ignoreModifications: true},
            },
        });
    };

    const handleMouseDown = (event) => {
        // Keep the focus in the cell
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: 'divider',
                p: 1,
            }}
        >
            <Button
                onClick={handleSaveOrEdit}
                onMouseDown={handleMouseDown}
                disabled={!selectedCellParams}
                variant="outlined"
            >
                {cellMode === 'edit' ? 'Save' : 'Edit'}
            </Button>
            <Button
                onClick={handleCancel}
                onMouseDown={handleMouseDown}
                disabled={cellMode === 'view'}
                variant="outlined"
                sx={{ml: 1}}
            >
                Cancel
            </Button>
        </Box>
    );
}

export default function StartEditButtonGrid() {

    const [selectedCellParams, setSelectedCellParams] = React.useState(null);
    const [cellModesModel, setCellModesModel] = React.useState({});

    const handleCellFocus = React.useCallback((event) => {
        const row = event.currentTarget.parentElement;
        const id = row.dataset.id;
        const field = event.currentTarget.dataset.field;



        const newRow = {
            "name": row.childNodes[1].innerText,
            "email": row.childNodes[2].innerText,
            "birthday_date": row.childNodes[3].innerText,
            "phone_number": row.childNodes[4].innerText,
            "address": row.childNodes[5].innerText
        };

        setSelectedCellParams({id, field, newRow});
    }, []);


    const cellMode = React.useMemo(() => {

        if (!selectedCellParams) {
            return 'view';
        }
        const {id, field, newRow, } = selectedCellParams;
       // console.log(id, field, newRow, 'cellMode')
        return cellModesModel[id]?.[field]?.mode || 'view';
    }, [cellModesModel, selectedCellParams]);

    const handleCellKeyDown = React.useCallback(

        (params, event ) => {
            console.log(params, event, 'handleCellKeyDown')
            if (cellMode === 'edit') {
                // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
                event.defaultMuiPrevented = true;
            }
        },
        [cellMode],
    );
    const [newRow, setNewRow] = useState()
    const handleCellEditStop = React.useCallback((params, event) => {


        setNewRow(params)
        event.defaultMuiPrevented = true;
    }, []);

    useEffect(() => {
        console.log(newRow, 'newRow')

    }, [newRow])


    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid

                rows={rows}
                columns={columns}
                onCellKeyDown={handleCellKeyDown}
                cellModesModel={cellModesModel}
                onCellEditStop={handleCellEditStop}
                onCellModesModelChange={(model) => setCellModesModel(model)}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: {
                        cellMode,
                        selectedCellParams,
                        setSelectedCellParams,
                        cellModesModel,
                        setCellModesModel,
                    },
                    cell: {
                        onFocus: handleCellFocus,
                    },
                }}
            />
        </div>
    );
}

const columns = [

    {field: 'id', headerName: 'ID', width: 100},
    {field: 'name', headerName: 'Name', width: 150, editable: true},
    {field: 'email', headerName: 'Email', width: 230, editable: true},
    {field: 'birthday_date', headerName: 'Birthday Date', width: 120, editable: true},
    {field: 'phone_number', headerName: 'Phone Number', width: 150, editable: true},
    {field: 'address', headerName: 'Address', width: 550, editable: true},


];

const rows = [
    {
        "id": 2,
        "name": "Santos Garcia",
        "email": "yhernandez@example.net",
        "birthday_date": "01-03-01",
        "phone_number": "+11111111",
        "address": "390 Sanchez Orchard\nFordburgh, OK 71390"
    },
    {
        "id": 21,
        "name": "Jessica Taylor",
        "email": "sadasd@asdasd.er",
        "birthday_date": "12-01-46",
        "phone_number": "+380672003856",
        "address": "225 Lauren Ways\nTaylortown, KS 50017"
    },
    {
        "id": 9,
        "name": "Jeffrey Fish",
        "email": "fkoch@example.org",
        "birthday_date": "01-03-13",
        "phone_number": "+380375437435",
        "address": "5450 Alexis Unions\nJamesbury, WY 29158"
    },
    {
        "id": 17,
        "name": "Ca",
        "email": "ofarmer@example.com",
        "birthday_date": "01-03-13",
        "phone_number": "+380919442368",
        "address": "465 Roman Drives\nJulieland, NV 36863"
    },
    {
        "id": 6,
        "name": "Rachael Jenkins",
        "email": "wardstephanie@example.net",
        "birthday_date": "20-10-23",
        "phone_number": "+380208866590",
        "address": "2750 Michael Wall Apt. 101\nGrantstad, IN 46577"
    },
    {
        "id": 18,
        "name": "Christopher Cunningham",
        "email": "zgregory@example.org",
        "birthday_date": "11-12-99",
        "phone_number": "+380689606278",
        "address": "1930 Billy Point Suite 331\nKimberlyfort, NV 26243"
    },
    {
        "id": 1,
        "name": "Vasyl Stokes",
        "email": "edwardbrown@example.com",
        "birthday_date": "28-02-13",
        "phone_number": "380998776567",
        "address": "71496 Emily Oval Apt. 735\nWest Dwayneton, AL 19828"
    },
    {
        "id": 30,
        "name": "Lisa We",
        "email": "kevinwells@example.org",
        "birthday_date": "06-10-23",
        "phone_number": "+380803091515",
        "address": "Unit 4414 Box 2936\nDPO AP 74533"
    },
    {
        "id": 35,
        "name": "John J",
        "email": "awright@example.com",
        "birthday_date": "09-10-92",
        "phone_number": "+380054395496",
        "address": "808 Matthews Parkways Suite 868\nLake Haley, OH 74543"
    },
    {
        "id": 10,
        "name": "string",
        "email": "user@example1.com",
        "birthday_date": "12-10-23",
        "phone_number": "string",
        "address": "string"
    },]
