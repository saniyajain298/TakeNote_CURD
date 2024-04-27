import React, { useState } from "react";

import logolight from "../../assets/logo-black.png";
import "./Header.css";
import AddStockModel from "../Model/AddNoteModel";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  
  return (
    <div className={`navbar-head light-head`}>
      <img src={logolight} alt="Logo" className="logo" />
 
      <button type="button" className="btn-main"  onClick={handleShow}>
        Add stock
      </button>
      <AddStockModel show={show} setShow={setShow} handleShow={handleShow}></AddStockModel>
    </div>
  );
};

export default Header;
