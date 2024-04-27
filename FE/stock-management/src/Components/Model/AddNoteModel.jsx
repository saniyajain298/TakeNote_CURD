import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { createNoteDetails } from "../AxiosAPI/noteAPI";

const AddNoteModel = (props) => {
  const handleClose = () => props.setShow(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const postData = async (data) => {
    try {
      await createNoteDetails(data);
    } catch (error) {}
  };

  const onSubmit = async (data) => {
    try {
      console.log("data");
      await new Promise(() => postData(data));
      console.log(data);
      props.setReload(true)
      handleClose()
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
          <Modal.Title>Create Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Title</label>
            <br />
            <input
              type="text"
              placeholder="Enter title"
              className="form-control"
              {...register("title", {
                required: "title is required",
              })}
            />
            {errors.name && (
              <div className="error-massage">{errors.title.message}</div>
            )}
            <br />
            <label>Content</label>
            <br />
            <textarea
              className="form-control"
              placeholder="Enter content"
              {...register("content", {
                required: "content is required",
              })}
            ></textarea>
            {errors.name && (
              <div className="error-massage">{errors.content.message}</div>
            )}
            <br />
            <button className="btn btn-primary submit-btn" type="submit">
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

export default AddNoteModel;
