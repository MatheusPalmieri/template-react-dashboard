import ReactECharts from 'echarts-for-react';
import { Activity, DollarSign, TrendingUp, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardPage = () => {
  const lineChartOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#10b981',
        },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: { lineStyle: { color: '#525252' } },
        axisLabel: { color: '#a3a3a3' },
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: { lineStyle: { color: '#262626' } },
        axisLabel: { color: '#a3a3a3' },
      },
    ],
    series: [
      {
        name: 'Active Users',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: { width: 0 },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(16, 185, 129, 0.5)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.01)' },
            ],
          },
        },
        emphasis: { focus: 'series' },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
    ],
  };

  const barChartOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        axisLine: { lineStyle: { color: '#525252' } },
        axisLabel: { color: '#a3a3a3' },
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: { lineStyle: { color: '#262626' } },
        axisLabel: { color: '#a3a3a3' },
      },
    ],
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#10b981' },
              { offset: 1, color: '#059669' },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
        data: [10, 52, 200, 334, 390, 330],
      },
    ],
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      icon: DollarSign,
      change: '+20.1%',
    },
    { title: 'Subscriptions', value: '+2350', icon: Users, change: '+180.1%' },
    { title: 'Active Now', value: '+573', icon: Activity, change: '+201' },
    { title: 'Growth', value: '+12.5%', icon: TrendingUp, change: '+4.5%' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h2>
        <p className="text-neutral-400">Overview of your system performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-neutral-800 bg-neutral-900/50 backdrop-blur-sm"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neutral-200">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-neutral-400">
                <span className="text-emerald-500">{stat.change}</span> from
                last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ReactECharts
              option={lineChartOption}
              style={{ height: '350px' }}
            />
          </CardContent>
        </Card>
        <Card className="col-span-3 border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactECharts option={barChartOption} style={{ height: '350px' }} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
