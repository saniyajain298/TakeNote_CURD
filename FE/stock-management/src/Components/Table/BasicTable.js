import React, { useState } from "react";
import { useTable } from "react-table";
import EditIcon from "../../assets/SVG/edit-icon.svg";
import DeleteIcon from "../../assets/SVG/delete-icon.svg";
import "./table.css";
import UpdateNoteModel from "../Model/UpdateNoteModel";
import { deleteNoteDetails } from "../AxiosAPI/noteAPI";

const BasicTable = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [data] = useState(props.tableData);
  const [modelData, setModelData] = useState();

  const [destination, setDestination] = useState("");

  console.log(props.tableData)
  const handleEdit = (title, content, id) => {
    handleShow();
    setModelData({
      title: title,
      content: content,
      id: id,
    });
  };
  const handleDelete = async (id) => {
    try {
      await deleteNoteDetails(id);
      props.setReload(true)
    } catch (error) {}
  };

  const [columns] = useState([
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Content",
      accessor: "content",
    },
    {
      Header: "Created At",
      accessor: "created_at",
    },
    {
      Header: "Updated At",
      accessor: "updated_at",
    },
    {
      Header: "Action",
      Cell: (row) => (
        <>
          <img
            src={EditIcon}
            alt="edit-icon"
            style={{ cursor: "pointer", width: "17px" }}
            onClick={() =>
              handleEdit(
                row.row.original.title,
                row.row.original.content,
                row.row.original.id
              )
            }
          />
          <img
            src={DeleteIcon}
            alt="edit-icon"
            style={{ cursor: "pointer", width: "17px" }}
            onClick={() => handleDelete(row.row.original.id)}
          />
        </>
      ),
    },
  ]);
  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const formatDateTimeString = (dateTimeString) => {
    try {
      const dateTime = new Date(dateTimeString);
      if (isNaN(dateTime.getTime())) {
        return dateTimeString;
      }
      const formattedDate = dateTime.toLocaleDateString("en", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      });
      const formattedTime = dateTime.toLocaleTimeString("en", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      return `${formattedDate} ${formattedTime}`;
    } catch (error) {
      return dateTimeString;
    }
  };
  const handleRowClick = (row) => {
    setDestination("/viewNote/" + row.original.id);
  };

  React.useEffect(() => {
    if (destination) {
      window.location.href = destination;
    }
  }, [destination]);

  return (
    <>
      <UpdateNoteModel
        show={show}
        setShow={setShow}
        handleShow={handleShow}
        modelData={modelData}
        setReload={props.setReload}
      ></UpdateNoteModel>
      <table
        {...getTableProps}
        className={`table table-striped table-${props.themeMode}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {rows &&
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} >
                  {row.cells.map((cell) => {

                    if (cell.column.Header === "Title") {
                      return (
                        <td {...cell.getCellProps()} onClick={() => handleRowClick(row)}>{cell.render("Cell")}</td>
                      );

                    }
                    else if (typeof cell.value === "string") {
                      return (
                        <>
                          <td {...cell.getCellProps()}>
                            {formatDateTimeString(cell.value)}
                          </td>
                        </>
                      );
                    }  
                    else {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    }
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default BasicTable;
