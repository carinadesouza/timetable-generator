"use client"
import React, { useEffect, useState } from 'react';
import { Client, Databases } from 'appwrite';
import Table from "../Table";

const MeetingTable: React.FC = () => {
  const [data, setData] = useState<string[][]>([]);
  const columns = ['Srno', 'Meeting Name', 'Day', 'Time'];
  const pollingInterval = 5000; // Poll every 5 seconds

  useEffect(() => {
    const client = new Client();
    client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('65af81642532e75bf90e');

    const databases = new Databases(client);

    const fetchData = () => {
      databases.listDocuments("65b12ffa18f8493c948e", "65b230d0a4b4344bbac0")
        .then((response) => {
          console.log(response.documents);

          const mappedData = response.documents.map((doc, index) => {
            const utcTime = new Date(doc.time);
            const localTime = new Date(utcTime.toLocaleString('en-US', { timeZone: 'UTC' }));

            const formattedTime = localTime.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            });

            return [
              (index + 1),
              doc.name,
              doc.day,
              formattedTime
            ];
          });
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

export default MeetingTable;
