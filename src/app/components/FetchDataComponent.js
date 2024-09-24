// src/components/FetchDataComponent.js
import { db } from '../lib/firebase'; // Adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore';

const FetchDataComponent = () => {
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "your-collection"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};

export default FetchDataComponent;