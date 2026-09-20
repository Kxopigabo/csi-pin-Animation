import { useEffect, useRef, useState } from "react";

import wallpaper from "../assets/img/wallpaper.jpg";
import basketball from "../assets/img/basketball.jpg";
import football from "../assets/img/football.jpg";
import volleyball from "../assets/img/volleyball.jpg";
import student from "../assets/img/std_img.jpg";

const Animation = ({ fieldWidth, fieldHeight, ballRadius }) => {
  //default
  const _fieldWidth = fieldWidth || 640;
  const _fieldHeight = fieldHeight || 480;
  const _ballRadius = ballRadius || 50;

  // internal calculation
  const _ballDiameter = 2 * _ballRadius;

  const ballRef = useRef();

  const [ballType, setBallType] = useState("none");

  useEffect(() => {
    // console.log(ballType)
    if (ballType === "none") ballRef.current.style.backgroundImage = ` none `;
    else if (ballType === "basketball")
      ballRef.current.style.backgroundImage = `url(${basketball})`;
    else if (ballType === "football")
      ballRef.current.style.backgroundImage = `url(${football})`;
    else if (ballType === "volleyball")
      ballRef.current.style.backgroundImage = `url(${volleyball})`;
    else if (ballType === "std")
      ballRef.current.style.backgroundImage = `url(${student})`;
  }, [ballType]);

  return (
    <>
      {/* animation container */}
      <div className="mx-auto mt-3" style={{ width: "fit-content" }}>
        {/* field */}
        <div
          className="border border-dark border-2 rounded-3 position-relative"
          style={{
            width: `${_fieldWidth}px`,
            height: `${_fieldHeight}px`,
            backgroundImage: `url(${wallpaper})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* ball */}
          <div
            className="border border-dark border-1 rounded-circle position-absolute "
            style={{
              width: `${_ballDiameter}px`,
              height: `${_ballDiameter}px`,
              backgroundColor: "lightblue",
              backgroundSize: "cover",
              backgroundPosition: "center",
              left: "100px",
              top: "100px",
            }}
            ref={ballRef}
          ></div>
        </div>

        {/* button low */}
        <div className="d-flex justify-content-between mt-2 gap-4">
          <button className="btn btn-success btn-lg">Play</button>

          {/* ball type  */}

          <div className="d-flex gap-2 justify-content-end">
            <button
              className="btn btn-outline-secondary btn-lg "
              onClick={() => setBallType("none")}
            >
              None
            </button>
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={() => setBallType("basketball")}
            >
              Basketball{" "}
            </button>
            <button
              className="btn btn-outline-primary btn-lg "
              onClick={() => setBallType("football")}
            >
              Football
            </button>
            <button
              className="btn btn-outline-primary btn-lg "
              onClick={() => setBallType("volleyball")}
            >
              Volleyball
            </button>
            <button
              className="btn btn-outline-primary btn-lg "
              onClick={() => setBallType("std")}
            >
              Student
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Animation;
