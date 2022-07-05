import React from "react";
import { Text, View } from "react-native";
import { COLORS, SIZES } from "../constants";
import moment from "moment";
import { ChartPath, ChartPathProvider, monotoneCubicInterpolation } from "@rainbow-me/animated-charts";

const Chart = ({containerStyle, chartPrices}) => {
  let startUnixTimestamp = moment().subtract(7, 'day').unix()
  let data = chartPrices ? chartPrices?.map((item, index) => {
        return {
      x: startUnixTimestamp + (index + 1) * 3600,
      y: item
    }
  }) : []

  let points = monotoneCubicInterpolation({data, range: 40})

  return (
    <View
      style={{...containerStyle}}
    >
      {
        data.length > 0 &&
        <ChartPathProvider
          data={{
            points,
            smoothingStrategy: 'bezier'
          }}
        >
          <ChartPath
            height={150}
            width={SIZES.width}
            stroke={COLORS.lightGreen}
            strokeWidth={2}
          />
        </ChartPathProvider>

      }
    </View>
  );
};

export default Chart;
