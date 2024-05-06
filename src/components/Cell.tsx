import React from "react";

interface CellProps {
  value: 0 | 1 | 2;
}

const Cell: React.FC<CellProps> = ({ value }) => {
  return (
    <div className="w-16 h-16 p-1 select-none">
      {value === 0 && (
        <div className="w-full h-full bg-blue-500 rounded-full"></div>
      )}
      {value === 1 && (
        <div className="w-full h-full bg-red-500 rounded-full"></div>
      )}
      {value === 2 && (
        <div className="w-full h-full bg-yellow-500 rounded-full"></div>
      )}
    </div>
  );
};

export default Cell;
