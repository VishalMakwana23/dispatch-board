import React, { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const Step5UploadRouteData = ({ data, updateData }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            updateData('routeDataFile', file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            updateData('routeDataFile', file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>

            <Box>
                <Typography variant="subtitle2" fontWeight="600" color="#1B3E38" gutterBottom>Upload your CSV File</Typography>
                <Typography variant="caption" color="text.secondary">Ensure that all the necessary information has been filled in</Typography>
            </Box>

            <Box
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                    flex: 1,
                    border: '1px dashed #FF8A65', // Orange dashed border
                    bgcolor: '#FAFAFA',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: '0.2s',
                    '&:hover': { bgcolor: '#F5F5F5' },
                    minHeight: 300
                }}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".csv"
                    onChange={handleFileChange}
                />

                <Box sx={{
                    width: 48, height: 48,
                    bgcolor: '#FFF3E0',
                    borderRadius: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#FF8A65',
                    mb: 2
                }}>
                    <FolderOpenIcon />
                </Box>

                <Typography variant="body2" color="#1B3E38" fontWeight="500" gutterBottom>
                    Drag your file here or <Box component="span" sx={{ color: '#FF7043' }}>click to upload</Box>
                </Typography>

                <Typography variant="caption" color="text.disabled">
                    Maximum file of xMB. Supports.csv
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AttachFileIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                    {data.routeDataFile ? data.routeDataFile.name : 'No file added'}
                </Typography>
            </Box>
        </Box>
    );
};

export default Step5UploadRouteData;
