
const GreenDot = ({ height = 20, width = 20}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      className="inline"
    >
      <circle cx="10" cy="10" r="8" fill="#4CAF50" />
    </svg>
  );
};

export default GreenDot;
