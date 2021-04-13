import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ArrowRight({ color }: { color?: string }) {
  return (
    <Svg viewBox="0 0 792.033 792.033" width={14} height={14}>
      <Path
        fill={color || "#999"}
        d="M617.858 370.896L221.513 9.705c-13.006-12.94-34.099-12.94-47.105 0-13.006 12.939-13.006 33.934 0 46.874l372.447 339.438-372.414 339.437c-13.006 12.94-13.006 33.935 0 46.874s34.099 12.939 47.104 0l396.346-361.191c6.932-6.898 9.904-16.043 9.441-25.087.431-9.078-2.54-18.222-9.474-25.154z"
      />
    </Svg>
  );
}

export default ArrowRight;
