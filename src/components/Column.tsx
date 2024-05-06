import React, { useState } from "react";
import Cell from "./Cell";
import { CellValue } from "../types";
import Arrow from "./Arrow";

interface ColumnProps {
  column: CellValue[];
  columnIndex: number;
  onClick: (column: CellValue[], columnIndex: number) => void;
}

const Column: React.FC<ColumnProps> = ({ column, columnIndex, onClick }) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      className="flex flex-col justify-center items-center cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onClick(column, columnIndex)}
    >
      <div className="flex flex-col items-center">
        <div className="mb-2">
          <Arrow visible={isHovering} />
        </div>
        {column.map((_, index: number) => (
          <Cell key={index} value={column[column.length - 1 - index]} />
        ))}
      </div>
    </div>
  );
};

export default Column;
