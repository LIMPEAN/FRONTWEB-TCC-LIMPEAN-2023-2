// types/echarts-for-react.d.ts
declare module 'echarts-for-react' {
  import * as React from 'react';
  import { EChartOption } from 'echarts';

  interface EChartsProps {
    option: EChartOption;
  }

  class ReactEChartsCore extends React.Component<EChartsProps> {}

  export default ReactEChartsCore;
}
