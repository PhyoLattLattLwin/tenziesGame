import React from "react";

const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391":"white"
  }
  return (
    <>
      <div
        onClick={props?.hollDie}
        style={styles}
        className="flex select-none justify-center w-full items-center h-10 shadow-lg font-bold rounded-md cursor-pointer"
      >
        {props.value}
      </div>
    </>
  );
};

export default Die;