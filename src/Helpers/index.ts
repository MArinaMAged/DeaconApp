// src/utils/responsive.js
import { Dimensions } from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { ScaledSheet, moderateScale } from "react-native-size-matters";

const { width } = Dimensions.get("window");

const scaleFontSize = (size: number) => moderateScale(size);

const scale = (size: number) => (width / 375) * size;

export const responsiveStyles = {
  width: (percentage: number) => responsiveWidth(percentage),
  height: (percentage: number) => responsiveHeight(percentage),
  fontSize: (size: number) => scaleFontSize(size),
  scaleSize: (size: number) => scale(size),
};

export const scaledStyles = ScaledSheet.create({
  // Example style
  box: {
    width: "80%", // 80% of the screen width
    height: "10@vs", // Vertical scaling based on height
    backgroundColor: "lightblue",
    fontSize: "14@ms", // Scaling font size
  },
});
