import { useState } from "react";
import { useNavigate } from "react-router-dom";

// implementing the search functionallity

export default function Search() {

  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();


  function handleClick (e) {
    const search = e.target.value;
    setKeyword(search);
  }

  function searchHandler() {
    navigate('/search?keyword='+ keyword);
  }

  return (
    <div className="input-group">
      <input
      onChange={handleClick}
        type="text"
        id="search_field"
        className="form-control"
        placeholder="Enter Product Name ..."
        onBlur={searchHandler}
      />
      <div className="input-group-append">
        <button onClick={searchHandler} id="search_btn" className="btn">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
 