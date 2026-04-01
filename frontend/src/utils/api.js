export async function askRAG(question, language = 'ne') {
  const response = await fetch('http://localhost:8001/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: question }),
  });
  
  if (!response.ok) {
    throw new Error(`AI Engine failed: ${response.statusText}`);
  }
  
  return await response.json();
}
