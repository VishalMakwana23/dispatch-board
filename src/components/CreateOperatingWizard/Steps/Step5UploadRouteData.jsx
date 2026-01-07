import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Papa from 'papaparse';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const Step5UploadRouteData = ({ data, updateData }) => {
    const fileInputRef = useRef(null);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        if (data.routeDataFile) {
            setFileName(data.routeDataFile.name);
            parseCSV(data.routeDataFile);
        }
    }, [data.routeDataFile]);

    const parseCSV = (file) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const { meta, data: parsedData } = results;

                if (meta.fields) {
                    const cols = meta.fields.map((field) => ({
                        field: field,
                        headerName: field,
                        width: 150,
                        editable: true,
                    }));
                    setColumns(cols);
                }

                const rowsWithId = parsedData.map((row, index) => ({
                    id: index,
                    ...row
                }));
                setRows(rowsWithId);
            },
            error: (error) => {
                console.error("CSV Parsing Error:", error);
            }
        });
    };

    const handleFile = (file) => {
        if (file) {
            updateData('routeDataFile', file);
            setFileName(file.name);
            parseCSV(file);
        }
    };

    const handleFileChange = (event) => {
        handleFile(event.target.files[0]);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        handleFile(event.dataTransfer.files[0]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>



            {/* Compact Upload Area - Top Left */}
            <Box
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                    width: 350,
                    p: 2,
                    border: '1px dashed #FF8A65',
                    bgcolor: '#FAFAFA',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    transition: '0.2s',
                    '&:hover': { bgcolor: '#F5F5F5', borderColor: '#FF7043' }
                }}
            >
                <Box sx={{
                    width: 40, height: 40,
                    bgcolor: '#FFF3E0',
                    borderRadius: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#FF8A65'
                }}>
                    <UploadFileIcon />
                </Box>

                <Box sx={{ flex: 1, overflow: 'hidden' }}>
                    <Typography variant="subtitle2" color="#1B3E38" fontWeight="600" noWrap>
                        {fileName ? 'Change File' : 'Upload CSV'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap display="block">
                        {fileName || 'Drag & drop or click'}
                    </Typography>
                </Box>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".csv"
                    onChange={handleFileChange}
                />
            </Box>

            {/* Data Grid Area */}
            {rows.length > 0 ? (
                <Paper sx={{
                    flex: 1,
                    width: '100%',
                    overflow: 'hidden',
                    boxShadow: 'none',
                    border: '1px solid #E0E0E0',
                    borderRadius: 2,
                    // Custom Scrollbar Styles
                    '& ::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px',
                    },
                    '& ::-webkit-scrollbar-track': {
                        background: 'transparent',
                    },
                    '& ::-webkit-scrollbar-thumb': {
                        backgroundColor: 'transparent',
                        borderRadius: '4px',
                    },
                    '&:hover ::-webkit-scrollbar-thumb': {
                        backgroundColor: '#BDBDBD',
                    }
                }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                            },
                        }}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 25 } },
                        }}
                        pageSizeOptions={[15, 25, 50, 100]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        density="compact"
                        sx={{
                            border: 0,
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#F5F5F5',
                                '& .MuiDataGrid-columnHeaderTitle': {
                                    fontWeight: 700,
                                    color: '#1B3E38',
                                }
                            },
                        }}
                    />
                </Paper>
            ) : (
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.disabled', border: '1px dashed #E0E0E0', borderRadius: 2, bgcolor: '#FDFDFD' }}>
                    <Typography>No data to display. Please upload a CSV file via the box above.</Typography>
                </Box>
            )}
        </Box>
    );
};

export default Step5UploadRouteData;
