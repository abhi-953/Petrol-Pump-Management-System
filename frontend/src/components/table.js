import React, { useEffect, useState } from "react";
import { Table, Dropdown, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Delete from "./deleteData";

const Records = (props) => {
  const [fields, setFields] = useState([]);
  const [values, setValues] = useState([]);
  const [filteredValues, setFilteredValues] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFields([]);
    fetch("http://localhost:8000/" + props.module + "/fields")
      .then((res) => res.json())
      .then((data) => setFields(data.data));

    fetch("http://localhost:8000/" + props.module)
      .then((res) => res.json())
      .then((data) => {
        setValues(data.data);
        setFilteredValues(data.data);
      });
  }, [props.module]);

  const handlePrint = () => {
    window.print();
  };

  const getUniqueValues = (field) => {
    return [...new Set(values.map((item) => item[field]))];
  };

  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);

    let filteredData = values.filter((item) =>
      Object.keys(updatedFilters).every(
        (key) => updatedFilters[key] === "" || item[key] === updatedFilters[key]
      )
    );

    setFilteredValues(filteredData);
  };

  const handleSortChange = (e) => {
    const field = e.target.value;
    setSortField(field);

    const sortedData = [...filteredValues].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
        return 0;
    });

    setFilteredValues(sortedData);
  };

  return (
    <div className="container table-container" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
      <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: "20px" }}>
        <Link to="Form" className="btn btn-success" style={{ marginLeft: "20px" }}>
          New
        </Link>
        <button className="btn btn-success" onClick={handlePrint} style={{ marginRight: "20px" }}>
          Print
        </button>
      </div>

      <h2 className="text-center" style={{ paddingBottom: "20px" }}>{props.module} Records</h2>

      <div className="d-flex justify-content-end mb-3">
        <Form.Select 
          onChange={handleSortChange} 
          value={sortField} 
          style={{ width: "200px" }} 
        >
          <option value="" disabled>Sort by...</option>
          {fields.map((field) => (
            <option key={field} value={field}>{field}</option>
          ))}
        </Form.Select>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover responsive="lg" className="table-fixed">
          <thead>
            <tr>
              <th>Edit</th>
              <th>Delete</th>
              {fields.map((field) => (
                <th key={field}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{field}</span>
                    <Dropdown>
                      <Dropdown.Toggle variant="light" size="sm">
                        <FilterAltIcon />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleFilterChange(field, "")}>
                          Show All
                        </Dropdown.Item>
                        {getUniqueValues(field).map((value, index) => (
                          <Dropdown.Item key={index} onClick={() => handleFilterChange(field, value)}>
                            {value}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredValues.map((value, index) => (
              <tr key={index}>
                <td>
                  <Link to={`Edit/${value._id}`}>
                    <EditIcon />
                  </Link>
                </td>
                <td>
                    <IconButton
                        onClick={async () => {
                        const success = await Delete(value._id, props.module);
                        if (success) {
                            setValues((prev) => prev.filter((item) => item._id !== value._id));
                            setFilteredValues((prev) => prev.filter((item) => item._id !== value._id));
                        }
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </td>

                {fields.map((field) => (
                    <td key={field}>{JSON.stringify(value[field])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Records;
