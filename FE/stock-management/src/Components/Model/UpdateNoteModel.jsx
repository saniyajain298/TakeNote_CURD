import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { updateNoteDetails } from "../AxiosAPI/noteAPI";

const UpdateNoteModel = (props) => {
  const handleClose = () => props.setShow(false);
  const [title, setTitle] = useState(props.modelData?.title || "");
  const [content, setContent] = useState(props.modelData?.content || "");
  const [id, setId] = useState(props.modelData?.id || "");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setTitle(props.modelData?.title || "");
    setContent(props.modelData?.content || "");
    setId(props.modelData?.id || "");
  }, [props.modelData]);

  const postData = async () => {
    try {
      const data = {
        "title": title,
        "content": content
      }
      await updateNoteDetails(data, id);
      handleClose()
      props.setReload(true)
      
      
    } catch (error) {}
  };

  const onSubmit = async (data) => {
    try {
      await new Promise(() => postData(data, id));
      
    } catch (error) {
      setError("title", {
        message: "",
      });
      setError("content", {
        message: "",
      });
    }
  };
  return (
    <div>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Title</label>
            <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="form-control"
              required
              
            />
            {errors.name && (
              <div className="error-massage">{errors.title.message}</div>
            )}
            <br />
            <label>Content</label>
            <br />
            <textarea
              value={content}
              className="form-control"
              placeholder="Enter content"
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
            {errors.name && (
              <div className="error-massage">{errors.content.message}</div>
            )}
            <br />
            <button className="btn btn-primary submit-btn" type="submit" >
              Submit
            </button>
            {errors.root && (
              <div className="error-massage">{errors.root.message}</div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateNoteModel;
