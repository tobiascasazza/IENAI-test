"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { User } from '@/models/user';
import TextField from '@mui/material/TextField';

const getStatusColor = (status: "online" | "offline" | "banned") => {
  switch (status) {
    case "online":
      return "green";
    case "offline":
      return "orange";
    case "banned":
      return "red";
    default:
      return "gray";
  }
};

const columns: GridColDef<User>[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 2 },
  { field: 'created_on', headerName: 'Created On', flex: 2 },
  { field: 'modified_on', headerName: 'Modified On', flex: 2 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => {
      const color = getStatusColor(params.row.status);
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: color,
              marginRight: '8px',
            }}
          />
          {params.row.status}
        </Box>
      );
    },
  },
];

export const UserTable: React.FC<{ tableData: User[] }> = ({ tableData }) => {
  const [data, setData] = React.useState<User[]>(tableData);
  const [filteredData, setFilteredData] = React.useState<User[]>(tableData);
  const [searchQuery, setSearchQuery] = React.useState('');


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = data.filter((user) => {
      return Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(query)
      );
    });
    setFilteredData(filtered);
  };

  React.useEffect(() => {
    setData(tableData);
    setFilteredData(tableData);
  }, [tableData]);

  return (
    <Box sx={{ width: '100%', padding: '10px', overflowX: 'auto' }}>
       <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={searcherCustomStyles}
      />
      <DataGrid
        rows={filteredData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 25, 50, 100]}
        disableRowSelectionOnClick
        sx={dataGridCustomStyles}
      />
    </Box>
  );
};

const searcherCustomStyles = {
    marginBottom: '20px',
    width: '100%',
    '& .MuiInputBase-root': {
      backgroundColor: '#333',
      color: 'white',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#555',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#888',
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& label':{
      color: 'white',
    }
  }

const dataGridCustomStyles = {
    minWidth: 1000,
    maxHeight: 400,
    backgroundColor: '#1e1e1e',
    color: 'white',
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#333',
      
    },
    '& .MuiDataGrid-cell': {
      borderColor: '#333',
    },
    '& .MuiPaginationItem-root': {
      color: 'white',
    },
    '& .MuiTablePagination-toolbar': {
      display: 'inline-flex',
    },
    '& .MuiDataGrid-columnHeader': {
        '& .MuiIconButton-root': {
            color: 'white',
        }
    },
    '& .MuiSvgIcon-root': {
        color: 'white',
    }
  }