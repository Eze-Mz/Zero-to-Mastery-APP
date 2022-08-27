import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imgUrl, boxes }) => {
  return (
    <div className="center-flex ma">
      <div className="absolute mt2">
        {imgUrl ? (
          <img
            id="inputImage"
            alt="face"
            src={imgUrl}
            width="500px"
            height="auto"
          />
        ) : (
          <p>Please, insert an URL</p>
        )}

        {boxes
          ? boxes.map((box) => {
              return (
                <div
                  className="bounding-box"
                  key={box.topRow + box.leftCol + box.bottomRow}
                  style={{
                    top: box.topRow,
                    right: box.rightCol,
                    bottom: box.bottomRow,
                    left: box.leftCol,
                  }}
                ></div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default FaceRecognition;
