// EChartsComponent.tsx
import  ReactEChartsCore  from 'echarts-for-react';

interface EChartsProps {
  // option: echarts.EChartOption;
  option: any;
  
}

const EChartsComponent: React.FC<EChartsProps> = ({ option }) => {
  return <ReactEChartsCore option={option} />;
};

export default EChartsComponent;
  