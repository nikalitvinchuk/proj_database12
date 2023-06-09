import React, { useEffect, useState } from "react";
import Header from "../pages/Header";

const BaseList = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    fetch(`/baseList`)
      .then(response => response.json())
      .then(data => {
        setTables(data.tables);
        setHeaders([]); 
      });
  }, []);

  const handleTableChange = event => {
    const selectedTable = event.target.value;
    setSelectedTable(selectedTable);
    console.log("zmiana stanu - wybrano inną tabele");
    console.log({ selectedTable });
  };

  const handleDisplayClick = () => {
    if (selectedTable) {
      fetch(`/baseList/${selectedTable}`) // Pass selectedTable as a route parameter
        .then(response => response.json())
        .then(data => {
          setHeaders(Object.keys(data.tableData[0])); // Set headers based on the selected table's columns
          setTableData(data.tableData);
        });
    }
    };
    const handleDeleteRow = (index) => {
        const updatedTableData = [...tableData];
        const deletedRow = updatedTableData.splice(index, 1)[0]; // Usuwa wybrany rekord z tablicy tableData i zapisuje go jako deletedRow
        setTableData(updatedTableData);

        fetch(`/baseList/${selectedTable}/${deletedRow.id}`, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    // Usunięcie rekordu z bazy danych powiodło się
                    console.log("Rekord został pomyślnie usunięty z bazy danych.");
                } else {
                    // Obsługa przypadku, gdy usuwanie rekordu nie powiodło się
                    console.log("Wystąpił błąd podczas usuwania rekordu z bazy danych.");
                }
            })
            .catch(error => {
                // Obsługa błędu zapytania
                console.error("Wystąpił błąd podczas wykonywania zapytania DELETE:", error);
            });
    };

  return (
    <div>
      <Header />
      <section id="hero" className="d-flex align-items-center justify-content-center">
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
              <button style={{ width: "340px", height: "50px" }} onClick={handleDisplayClick}>
                Wyświetl
              </button>
              <div className="BLResult">
                {tableData && tableData.length > 0 ? (
                  <table className="bl_table text-center">
                    <thead>
                      <tr>
                        {headers.map(header => (
                          <th key={header}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={index}>
                          {headers.map(header => (
                            <td key={`${index}-${header}`}>
                               {header === "password" ? (
                                  "brak podglądu"
                                ) : header === "isAdmin" ? (
                                  row[header] === 0 ? (
                                    "Nie"
                                  ) : (
                                    "Tak"
                                  )
                                ) : (
                                  row[header] === null ? "null" : row[header]
                                )}
                            </td>
                          ))}
                              {row["isAdmin"] !== 1 && (
                                  <td>
                                      <button onClick={() => handleDeleteRow(index)} style={{ width: "90px" }}>Usuń</button>
                                  </td>
                              )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div>Wybierz tabelę i kliknij przycisk "wyświetl"</div>
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
