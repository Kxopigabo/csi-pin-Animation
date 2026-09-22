import { useEffect, useRef, useState } from "react";

import wallpaper from "../assets/img/wallpaper.jpg";
import basketball from "../assets/img/basketball.jpg";
import football from "../assets/img/football.jpg";
import volleyball from "../assets/img/volleyball.jpg";
import student from "../assets/img/std_img.jpg";

const Animation = ({
  fieldWidth,
  fieldHeight,
  ballRadius,
  keyEvent,
  velocity,
}) => {
  //default
  const _fieldWidth = fieldWidth || 640;
  const _fieldHeight = fieldHeight || 480;
  const _ballRadius = ballRadius || 50;
  const _keyEvent = keyEvent || null;
  const _velocity = velocity || 100;

  // internal calculation
  const xVelocity = Math.round(_velocity * Math.sqrt(2));
  const yVelocity = Math.round(_velocity * Math.sqrt(2));

  const frameRate = 25;
  const frameTime = 1 / frameRate;
  const _ballDiameter = 2 * _ballRadius;
  const maxX = _fieldWidth - _ballDiameter - 5; 
  const maxY = _fieldHeight - _ballDiameter - 5;

  // state
  const [ballType, setBallType] = useState("none");
  const [runing, setRuning] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [moveLeft, setMoveLeft] = useState(true);
  const [moveDown, setMoveDown] = useState(true);

  useEffect(() => {
    if (_keyEvent != null) {
      if (_keyEvent === "") setRuning(!runing);
      else if (_keyEvent.key === "0") setBallType("none");
      else if (_keyEvent.key === "1") setBallType("basketball");
      else if (_keyEvent.key === "2") setBallType("football");
      else if (_keyEvent.key === "3") setBallType("volleyball");
      else if (_keyEvent.key === "4") setBallType("std");
    }
  }, [_keyEvent]);

  // refer
  const ballRef = useRef();
  const timer = useRef(null);

  useEffect(() => {
    if (runing) {
      if (timer.current === null) {
        timer.current =
          setTimeout(() => {
            calculateNextFrame();
          }, frameTime * 1000);
      }
    }
    return () => {
      clearTimeout(timer.current);
      timer.current = null;
    };
  });
  //effect (monitor)
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

  const calculateNextFrame = () => {
    // x axis
    if (moveLeft) {
      // ->
      setX(() => x + xVelocity / frameRate);
      if (x >= maxX) {
        setX((x) => maxX - (x - maxX));
        setMoveLeft(() => false);
      }
    } else {
      // <-
      setX((x) => x - xVelocity / frameRate);
      if (x <= 0) {
        setX((x) => -x);
        setMoveLeft(() => true);
      }
    }

    // y axis
    if (moveDown) {
      // down
      setY(() => y + yVelocity / frameRate);
      if (y >= maxY) {
        setY((y) => maxY - (y - maxY));
        setMoveDown(() => false);
      }
    } else {
      // up
      setY((y) => y - yVelocity / frameRate);
      if (y <= 0) {
        setY((y) => -y);
        setMoveDown(() => true);
      }
    }
  }

  
  

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
              left: `${x}px`,
              top: `${y}px`,
              width: `${_ballDiameter}px`,
              height: `${_ballDiameter}px`,
              backgroundColor: "lightblue",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            ref={ballRef}
          ></div>
        </div>

        {/* button low */}
        <div className="d-flex justify-content-between mt-2 gap-4">
          <button className={`btn ${runing ? 'btn-warning' : 'btn-success'}`} onClick={() => setRuning(!runing)}>
            {runing ? 
              <span className="bi bi-pause">&nbsp;Pause</span>
              :
              <span className="bi bi-play">&nbsp;Play</span>
            }
          </button>

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

export default Animation
