import { useEffect, useState } from 'react';
function App() {
  const [person, setPerson] = useState({});
  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPerson(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <>
      {person && (
        <div>
          <h1>Name: {person.name}</h1>
          <p>Age: {person.age}</p>
          <p>
            isFrontEndDeveloper - {person.isFrontEndDeveloper ? 'yes' : 'no'}
          </p>
        </div>
      )}
    </>
  );
}

export default App;
