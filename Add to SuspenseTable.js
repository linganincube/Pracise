// Add to SuspenseTable.js
const loadData = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/load');
    const data = await response.json();
    if (data.length > 0) {
      setAccounts(data);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

const saveData = async () => {
  try {
    await fetch('http://localhost:5000/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accounts),
    });
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

useEffect(() => {
  loadData();
  const interval = setInterval(() => {
    saveData();
  }, 3600000); // Auto-save every hour
  return () => clearInterval(interval);
}, []);
