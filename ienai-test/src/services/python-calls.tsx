export const executePythonCode = async (code: string) => {
    try {
      const response = await fetch('/api/execute-python', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
  
      if(response.status === 500){
        const errorResponse = await response.json() 
        throw new Error(`Error: ${errorResponse.error}`);
      }
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

  
      const result = await response.json();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to execute Python code: ${error.message}`);
      } else {
        throw new Error('Unknown error occurred while executing Python code.');
      }
    }
  };
  