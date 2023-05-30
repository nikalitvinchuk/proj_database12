import React, { useEffect, useState } from "react";
import Header from "../pages/Header";

const BaseList = () => {
  const [users, setUsers] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    fetch(`/baseList`)
      .then(response => response.json())
      .then(data => {
        setUsers(data.users);
        setTables(data.tables);
      });
    if (users.length > 0) {
      setHeaders(Object.keys(users[0])); // Aktualizacja stanu nagłówków na podstawie nazw kolumn
    }
  }, [users]);
  const handleTableChange = event => {
    const selectedTable = event.target.value;
    setSelectedTable(selectedTable);
    console.log("zmiana stanu - wybrano inną tabele");
    console.log({ selectedTable });
  };
  const handleDisplayClick = () => {
    if (selectedTable) {
      fetch(`/baseList/${selectedTable}`)
        .then(response => response.json())
        .then(data => {
          setTableData(data.tableData);
        });
    }
  };
  return (
    <div>
      <Header />
      <section
        id="hero"
        className="d-flex align-items-center justify-content-center"
      >
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-8 mb-3">
              <h1 style={{ marginTop: "40px" }}>Table List</h1>
              <select
                style={{ width: "340px", height: "50px" }}
                value={selectedTable}
                onChange={handleTableChange}
              >
                {tables.map(table => (
                  <option key={table}>{table}</option>
                ))}
              </select>
              <br />
              <button style={{ width: "340px", height: "50px" }}>
                Wyświetl
              </button>
              <div className="BLResult">
                {users && users.length > 0 ? (
                  <table className="bl_table text-center">
                    <thead>
                      <tr>
                        {headers.map(header => (
                          <th key={header}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id}>
                          <td>{user.id}</td>   
                          <td>{user.imie}</td>
                          <td>{user.nazwisko}</td>
                          <td>{user.wiek}</td>
                          <td>{user.email}</td>
                          <td>{user.login}</td>
                          <td>brak podglądu </td>
                          <td>{user.isAdmin ? "Tak" : "Nie"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div>Brak danych użytkowników</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BaseList;
