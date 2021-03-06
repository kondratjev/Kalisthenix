import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Calendar({ color }: { color?: string }) {
  return (
    <Svg viewBox="0 0 512 512" height={22} width={22}>
      <Path
        fill={color || "#fff"}
        d="M448 64h-21.332V21.332C426.668 9.559 417.109 0 405.332 0H384c-11.777 0-21.332 9.559-21.332 21.332V64H149.332V21.332C149.332 9.559 139.777 0 128 0h-21.332C94.891 0 85.332 9.559 85.332 21.332V64H64C28.715 64 0 92.715 0 128v320c0 35.285 28.715 64 64 64h384c35.285 0 64-28.715 64-64V128c0-35.285-28.715-64-64-64zm21.332 384c0 11.754-9.578 21.332-21.332 21.332H64c-11.754 0-21.332-9.578-21.332-21.332V214.187h426.664zm0 0"
      />
    </Svg>
  );
}

export default Calendar;
