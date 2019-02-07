import domtoimage from "dom-to-image";

function downloadPNG(e) {
  const link = document.createElement("a");

  const prefix = "amzn-review";

  const config = {
    style: {
      // transform: `scale(${exportSize})`,
      "transform-origin": "center",
      background: "white"
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

export default downloadPNG;
