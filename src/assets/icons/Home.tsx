import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Home({ color }: { color?: string }) {
  return (
    <Svg viewBox="0 0 306.773 306.773" width={22} height={22}>
      <Path
        fill={color || "#fff"}
        d="M302.93 149.794a14.627 14.627 0 00-1.199-20.932L164.63 8.898c-6.223-5.442-16.2-5.328-22.292.257L4.771 135.258c-6.092 5.585-6.391 14.947-.662 20.902l3.449 3.592c5.722 5.955 14.971 6.665 20.645 1.581l10.281-9.207v134.792c0 8.27 6.701 14.965 14.965 14.965h53.624c8.264 0 14.965-6.695 14.965-14.965v-94.3h68.398v94.3c-.119 8.264 5.794 14.959 14.058 14.959h56.828c8.264 0 14.965-6.695 14.965-14.965V154.024s2.84 2.488 6.343 5.567c3.497 3.073 10.842.609 16.403-5.513l3.897-4.284z"
      />
    </Svg>
  );
}

export default Home;
