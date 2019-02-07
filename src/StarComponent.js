import React from "react";

const DEFAULT_DIMENSION = 18;

const StarComponent = props => {
  const {
    width = DEFAULT_DIMENSION,
    height = DEFAULT_DIMENSION,
    style,
    className
  } = props;

  const fill = props.fill || "#FEC20F";
  const stroke = props.stroke || "#b78900";

  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      className={className}
      style={style}
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
      xmlSpace="preserve"
    >
      <polygon
        fill={fill}
        stroke={stroke}
        strokeWidth="4"
        strokeMiterlimit="10"
        points="31.866,6.618 40.09,23.281 
	58.479,25.953 45.172,38.923 48.313,57.239 31.866,48.592 15.418,57.239 18.56,38.923 5.253,25.953 23.642,23.281 "
      />
    </svg>
  );
};

export default StarComponent;
