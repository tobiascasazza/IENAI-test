"use client";

import React, { useState, useCallback } from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';
import { executePythonCode } from '@/services/python-calls';
import dynamic from 'next/dynamic';
import { python } from '@codemirror/lang-python';
import { PlotPanel } from '../panels/plot-panel';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { 
  ssr: false, 
  loading: () => <div>Loading Python editor...</div> 
});

interface ExecutionResult {
  logs: string;
  plots: { data: never; layout: never }[];
}

const PythonPanel: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [executionResult, setExecutionResult] = useState<ExecutionResult>({
    logs: '',
    plots: [],
  });

  const executeCode = useCallback(async () => {
    setExecutionResult({ logs: '', plots: [] });

    try {
      const result = await executePythonCode(code);

      if (result.error) {
        setExecutionResult({ logs: result.error, plots: [] });
      } else {
        const outputLogs = result.output.join('\n');
        const plotData = result.output
          .filter((line: string) => line.startsWith('{') && line.includes('data'))
          .map((data: string) => JSON.parse(data));

        setExecutionResult({
          logs: outputLogs,
          plots: plotData,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? `Execution error: ${error.message}` : 'An unknown error occurred during execution.';
      setExecutionResult({ logs: errorMessage, plots: [] });
    }
  }, [code]);

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: '#121212',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
      }}
    >
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Python Code Editor
        </Typography>

        <CodeMirror
          value={code}
          height="300px"
          extensions={[python()]}
          theme="dark"
          onChange={(value) => setCode(value)}
        />

        <Button variant="contained" sx={{ mt: 2 }} onClick={executeCode}>
          Execute
        </Button>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Logs
        </Typography>

        <TextField
          multiline
          value={executionResult.logs}
          rows={11}
          fullWidth
          variant="outlined"
          slotProps={{ input: { readOnly: true } }}
          sx={{
            backgroundColor: '#333',
            color: 'white',
            height: '300px',
          }}
        />
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Plots
        </Typography>
        {executionResult.plots.length > 0 ? (
          <PlotPanel plots={executionResult.plots} />
        ) : (
          <Typography sx={{ color: 'gray' }}>No plots available</Typography>
        )}
      </Box>
    </Box>
  );
};

export default PythonPanel;
