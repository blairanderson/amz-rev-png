import React, { useState } from "react";
import { render } from "react-dom";
import downloadPNG from "./downloadPNG";
import StarComponent from "./StarComponent";
import monthNames from "./MonthNames";
import "./styles.css";

function App() {
  const [editDate, toggleEditDate] = useState(false);
  const [editDesc, toggleEditDesc] = useState(false);
  const [starCount, updateStarCount] = useState(5);
  const [title, setTitle] = useState("Some Title Here");
  const [date, setDate] = useState(new Date("2019-03-21"));
  const [review, setReview] = useState(
    "This product gets two thumbs up, saved me a lot of re-plumbing. Take your time cutting the old drain out and clean it like you mean it including the outer walls of the pipe, follow the instructions and it goes together in minutes. Don't forget to give the silicone a few hrs to set up before testing."
  );

  function capStars(stars) {
    if (stars > 5) {
      updateStarCount(5);
    } else if (stars < 1) {
      updateStarCount(1);
    } else {
      updateStarCount(stars);
    }
  }

  function formatDate(date) {
    console.log(typeof date, date);
    setDate(new Date(date));
  }

  return (
    <div className="App">
      <h1>Amazon Review Screenshotter</h1>
      <div>
        <button onClick={e => downloadPNG()}>Save PNG</button>
      </div>
      <button disabled={starCount === 1} onClick={e => capStars(starCount - 1)}>
        -
      </button>
      <input
        type="text"
        style={{ textAlign: "center", width: "50px" }}
        step="1"
        min="1"
        max="5"
        value={starCount}
        onChange={e => updateStarCount(parseInt(e.target.value))}
      />
      <button disabled={starCount === 5} onClick={e => capStars(starCount + 1)}>
        +
      </button>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <div>
        <button onClick={e => toggleEditDate(!editDate)}>
          {editDate ? "Done Editing Date" : "Edit Date"}
        </button>
        <button onClick={e => toggleEditDesc(!editDesc)}>
          {editDesc ? "Done Editing Review" : "Edit Review"}
        </button>
      </div>

      <div
        id="container-dom-node"
        style={{
          textAlign: "left",
          padding: "0 125px",
          margin: "50px auto",
          maxWidth: "500px"
        }}
      >
        {Array.from({ length: starCount }, (_, i) => (
          <StarComponent width={16} />
        ))}
        {starCount < 5 &&
          Array.from({ length: 5 - starCount }, (_, i) => (
            <StarComponent fill="#ffffff" width={16} />
          ))}{" "}
        <strong
          style={{
            fontSize: "13px",
            lineHeight: "19px",
            boxSizing: "border-box",
            fontFamil: "Arial, sans-serif",
            verticalAlign: "top"
          }}
        >
          {title}
        </strong>
        {editDate ? (
          <div>
            <input
              type="date"
              value={date.toISOString().substr(0, 10)}
              onChange={e => formatDate(e.target.value)}
            />
            <button onClick={e => toggleEditDate(!editDate)}>
              done editing
            </button>
          </div>
        ) : (
          <div
            onClick={e => toggleEditDate(!editDate)}
            style={{
              fontSize: "13px",
              lineHeight: "19px",
              boxSizing: "border-box",
              fontFamil: "Arial, sans-serif",
              color: "#555"
            }}
          >
            {monthNames[date.getMonth()]} {date.getDate()}
            {", "}
            {date.getFullYear()}
          </div>
        )}
        {editDesc ? (
          <div>
            <textarea
              value={review}
              rows={10}
              cols={50}
              onChange={e => setReview(e.target.value)}
            />
            <button onClick={e => toggleEditDesc(!editDesc)}>
              done editing
            </button>
          </div>
        ) : (
          <div
            onClick={e => toggleEditDesc(!editDesc)}
            style={{
              fontSize: "13px",
              lineHeight: "19px",
              boxSizing: "border-box",
              fontFamil: "Arial, sans-serif",
              color: "#111"
            }}
          >
            {review}
          </div>
        )}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
