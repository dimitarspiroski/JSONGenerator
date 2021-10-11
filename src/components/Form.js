import { useForm } from "react-hook-form";
import { useState } from "react";

import fs from "fs";

console.log(fs);

let academyObject = {
  timeline: {
    semesters: [],
  },
  competencies: {},
};

const Form = () => {
  const { register, handleSubmit, Fragment } = useForm();

  const [listMode, setListMode] = useState(false);

  const [listTitle, setListTitle] = useState("");
  const [listItem, setListItem] = useState("");
  const [list, setList] = useState([]);

  const onSubmit = data => {
    academyObject = { ...academyObject, ...data };
  };

  const addCompetenciesList = () => {
    academyObject = { ...academyObject, competencies: { listTitle, list } };

    setList([]);
  };

  const addListToTimeLine = () => {
    academyObject["timeline"]["semesters"].push({
      listTitle,
      list,
    });
    setList([]);
  };

  return (
    <>
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <h1>JSON Generator Form</h1>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" {...register("title")} />
        </div>
        <div className="form-group">
          <label>Overview</label>
          <textarea
            rows="6"
            className="form-control"
            {...register("overview")}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Job Opportunities</label>
          <input
            type="text"
            className="form-control"
            {...register("job_opportunities")}
          />
        </div>
        <div className="form-group">
          <label>Trainers</label>
          <textarea
            rows="6"
            className="form-control"
            {...register("trainers")}
          ></textarea>
        </div>
        <button className="btn btn-success" type="submit">
          Generate
        </button>
      </form>
      <div className="container">
        <h1>List generator</h1>
        <div className="form-group">
          <label>List Title</label>
          <input
            type="text"
            className="form-control"
            value={listTitle}
            onChange={e => setListTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>List Item</label>
          <input
            type="text"
            className="form-control"
            value={listItem}
            onChange={e => {
              setListItem(e.target.value);
            }}
          />
        </div>
        <div className="m-3">
          <button
            className="btn btn-primary me-3"
            type="button"
            onClick={() => {
              setList([...list, listItem]);
              setListItem("");
              console.log(list);
            }}
          >
            ADD
          </button>
          <button
            className="btn btn-success"
            type="button"
            onClick={() => {
              !listMode ? addCompetenciesList() : addListToTimeLine();
            }}
          >
            Add to JSON
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setListMode(!listMode)}
          >
            Switch to {listMode ? "competencies" : "timeline"}
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => {
              console.log(academyObject);
              console.table(academyObject);
              console.log(JSON.stringify(academyObject));
            }}
          >
            Print JSON
          </button>
        </div>
      </div>
    </>
  );
};

export default Form;
