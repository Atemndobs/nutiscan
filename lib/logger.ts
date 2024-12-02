export async function serverLog(message: string, data: any) {
  // Log locally
  console.log(message, data);
  
  // Send to server
  try {
    await fetch('/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        data,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      }),
    });
  } catch (error) {
    console.error('Failed to send log to server:', error);
  }
}
