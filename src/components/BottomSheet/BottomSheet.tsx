import React, { useMemo } from "react";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";
import BottomSheet, { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  const animatedOpacity = useMemo(
    () =>
      interpolate(animatedIndex, {
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP,
      }),
    [animatedIndex],
  );

  const animatedZIndex = useMemo(
    () =>
      interpolate(animatedIndex, {
        inputRange: [0, 1],
        outputRange: [-1, 0],
        extrapolate: Extrapolate.CLAMP,
      }),
    [animatedIndex],
  );

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "#181818",
        opacity: animatedOpacity,
        zIndex: animatedZIndex,
      },
    ],
    [style, animatedOpacity, animatedZIndex],
  );

  return <Animated.View style={containerStyle} />;
};

type Props = {
  bottomSheetRef?: React.RefObject<BottomSheetMethods>;
  onChange?: (index: number) => void;
  children: JSX.Element | JSX.Element[];
  snapPoints: React.ReactText[];
};

const BottomSheetView = ({
  children,
  bottomSheetRef,
  snapPoints,
  onChange,
}: Props) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      handleComponent={null}
      // backdropComponent={CustomBackdrop}
      onChange={onChange}>
      {children}
    </BottomSheet>
  );
};

export default BottomSheetView;
