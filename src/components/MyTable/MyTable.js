import * as React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer, GridToolbarDensitySelector,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import axios from "axios";
import MuiPagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';


export default function MyTable() {

    function CustomToolbar() {

        return (
            <GridToolbarContainer sx={{
                display: 'grid', gridTemplateColumns: '2fr repeat(4, 1fr)', borderBottom: 1,
                borderColor: 'divider',
                p: 1,
            }}>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
            <GridToolbarQuickFilter/>
    </GridToolbarContainer>
    )
        ;
    }

    function Pagination({className}) {

        return (
            <MuiPagination
                color="primary"
                className={className}
                count={allPage - 1}
                page={currentPage}
                variant="outlined" shape="rounded"
                onChange={(e, value) => setCurrentPage(value)}
            />
        );
    }

    function CustomPagination() {
        return <Pagination/>;
    }

    const [userTable, setUserTable] = useState([])
    const [circular, setCircular] = useState(false)
    const [allPage, setAllPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)


    const getApiTable = async () => {
        setCircular(true)
        try {
            const response = await axios.get(`https://technical-task-api.icapgroupgmbh.com/api/table/?limit=${(10 * currentPage) - 10}&offset=${10 * currentPage}`)
            console.log(response.data)
            setUserTable(response.data.results)
            setAllPage(Math.ceil(response.data.count / 10))
            setCircular(false)

        } catch (err) {
            console.error(err.toJSON())
            setCircular(false)
        }
    }


    useEffect(() => {
            getApiTable()
        },
        [currentPage])


    const columns = [

        {field: 'id', headerName: 'ID', width: 100},
        {field: 'name', headerName: 'Name', width: 150, editable: true},
        {field: 'email', headerName: 'Email', width: 230, editable: true},
        {field: 'birthday_date', headerName: 'Birthday Date', width: 120, editable: true},
        {field: 'phone_number', headerName: 'Phone Number', width: 150, editable: true},
        {field: 'address', headerName: 'Address', width: 550, editable: true},


    ];

    return (
        <Box sx={{height: 500, width: "90%"}}>

            <DataGrid
                onRowEditStop={(e) => console.log(e, 'onRowEditStop')}
                rows={userTable}
                loading={circular}
                columns={columns}


                slots={{
                    toolbar: CustomToolbar,
                    loadingOverlay: LinearProgress,
                    pagination: CustomPagination
                }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                initialState={{


                    pagination: {
                        paginationModel: {page: 0, pageSize: 10},
                    },
                }}
            />
        </Box>

    );
}
