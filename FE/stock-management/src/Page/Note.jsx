import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Header";
import BasicTable from "../Components/Table/BasicTable";
import { getNoteDetailsList } from "../Components/AxiosAPI/noteAPI";

const Note = () => {
  const [NoteList, setNoteList] = useState();
  const [reload, setReload] = useState(true)
  useEffect(() => {
    if(reload){
      const fetchData = async () => {
        try {
          const NoteDetailsList = await getNoteDetailsList();
          setNoteList(NoteDetailsList);
        } catch (error) {}
      };
      setReload(false)
      fetchData();
    }
  }, [reload]);

  useEffect(() => {
    console.log("BasicTable NoteList updated:", NoteList);
  }, [NoteList]);

  return (
    <div className="container-main light-main">
      <Navbar />
      <div className="table-container">
        <h1 className="heading">Note</h1>
        {NoteList && <BasicTable tableData={NoteList} setReload={setReload} />}
      </div>
    </div>
  );
};

export default Note;
