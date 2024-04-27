import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoteDetail } from "../Components/AxiosAPI/noteAPI";
import { Navbar } from "react-bootstrap";

const ViewNote = (props) => {
  let { id } = useParams();
  const [note, setNote] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const note = await getNoteDetail(id);
        setNote(note);
      } catch (error) {}
    };

    fetchData();
  }, [id]);

  return (
    <div className="container-main light-main">
      <Navbar />
      <div className="container">
        <div className="text-center mt-5">
          <div className="mt-5">
            <h2 className="mt-5">{note ? note.title : ""}</h2>
            <p className="mt-5">{note ? note.content : ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
