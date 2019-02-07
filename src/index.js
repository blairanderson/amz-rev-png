import React, { useState } from "react";
import { render } from "react-dom";
import StarComponent from "./StarComponent";
import domtoimage from "dom-to-image";
import "./styles.css";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function App() {
  const [starCount, updateStarCount] = useState(5);
  const [title, setTitle] = useState("Some Title Here");
  const [date, setDate] = useState(new Date("2019-03-21"));
  const [editDate, toggleEditDate] = useState(false);
  const [desc, updateDesc] = useState(
    "This product gets two thumbs up, saved me a lot of re-plumbing. Take your time cutting the old drain out and clean it like you mean it including the outer walls of the pipe, follow the instructions and it goes together in minutes. Don't forget to give the silicone a few hrs to set up before testing."
  );
  const [editDesc, toggleEditDesc] = useState(false);

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

  function downloadPNG(e) {
    const link = document.createElement("a");

    const prefix = "amzn-review";

    const config = {
      style: {
        // transform: `scale(${exportSize})`,
        "transform-origin": "center",
        background: "black"
      },
      filter: n => {
        return true;
      },
      width: "500",
      height: "300"
    };

    domtoimage
      .toPng(document.getElementById("container-dom-node"), config)
      .then(function(dataUrl) {
        link.download = `${prefix}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(function(error) {
        console.error("oops, something went wrong!", error);
      });
  }

  return (
    <div className="App">
      <h1>Amazon Review Screenshotter</h1>
      <div>
        <button onClick={e => downloadPNG()}>Save PNG</button>
      </div>
      <button onClick={e => capStars(starCount - 1)}>-</button>
      <input
        type="text"
        style={{ textAlign: "center", width: "50px" }}
        step="1"
        min="1"
        max="5"
        value={starCount}
        onChange={e => updateStarCount(parseInt(e.target.value))}
      />
      <button onClick={e => capStars(starCount + 1)}>+</button>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

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
            <textarea value={desc} rows={10} cols={50} />
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
            {desc}
          </div>
        )}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
