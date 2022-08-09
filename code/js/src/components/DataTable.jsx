import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({
    rows,
    columns,
    rowsPerPageOptions,
}) => {
    const rowsWithId = rows.hasOwnProperty('id') ? rows : rows.map((row, index) => ({ ...row, id: index.toString() }))
    const [pageSize, setPageSize] = React.useState(5);

    return (
        <div style={{ width: '75%' }}>
            <DataGrid
                rows={rowsWithId}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={rowsPerPageOptions}
                pagination
                autoHeight />
        </div >
    );
}


export default DataTable