"use client"
import { useEffect, useState } from 'react';
import { Client, Databases } from 'appwrite';
import Table from "../Table";

const RoomTable: React.FC = () => {
  const [data, setData] = useState<string[][]>([]);
  const columns = ["SrNo", "Name", "Capacity"];
  const pollingInterval = 5000; // Poll every 5 seconds

  useEffect(() => {
    const client = new Client();
    client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('65af81642532e75bf90e');

    const databases = new Databases(client);

    const fetchData = () => {
      databases.listDocuments("65b12ffa18f8493c948e", "65b1300f9d902549e29f")
        .then((response) => {
          const mappedData = response.documents.map((doc, index) => [
            (index + 1),
            doc.name,
            doc.capacity,
          ]);
          setData(mappedData);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, pollingInterval); // Set up polling

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default RoomTable;
