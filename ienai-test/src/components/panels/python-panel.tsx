"use client"

import React, { useState } from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';
import { executePythonCode } from '@/services/python-calls';
import dynamic from 'next/dynamic';
import { python } from '@codemirror/lang-python';
import { PlotPanel } from './plot-panel';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { ssr: false,  loading: () => <div>Loading Python editor...</div>  });


const PythonPanel: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [logs, setLogs] = useState<string>('');
  const [plots, setPlots] = useState<{ data: never; layout: never }[]>([]); 

  const executeCode = async () => {
    setLogs('');
    setPlots([]); // Limpiar plots previos

    try {
      const result = await executePythonCode(code);

      if (result.error) {
        setLogs(result.error);
      } else {
        setLogs(result.output.join('\n'));

        const plotData = result.output.filter((line: string) => 
          line.startsWith('{') && line.includes('data')
        );
        
        setPlots(plotData.map((data: string) => JSON.parse(data)));
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLogs(`Execution error: ${error.message}`);
      } else {
        setLogs('An unknown error occurred during execution.');
      }
    }
  };

  return (
    <Box sx={{ p: 2, backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 2, color: 'white' }}>
        Python Code Editor
      </Typography>

      <CodeMirror
        value={code}
        height="200px"
        extensions={[python()]}
        theme={"dark"}  
        onChange={(value) => setCode(value)}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={executeCode}>
        Execute
      </Button>

      <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>
        Logs
      </Typography>
      <TextField
        multiline
        value={logs}
        rows={5}
        fullWidth
        variant="outlined"
        InputProps={{ readOnly: true }}
        sx={{ mt: 1, backgroundColor: '#333', color: 'white' }}
      />
      {
        
      }
      <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>
        Plots
      </Typography>
      {plots.length > 0 ? (
        <PlotPanel plots={plots} />
      ) : (
        <Typography sx={{ color: 'gray' }}>No plots available</Typography>
      )}
    </Box>
  );
};

export default PythonPanel;
