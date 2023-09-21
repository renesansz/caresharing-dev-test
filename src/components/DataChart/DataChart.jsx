import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import { useContext, useMemo } from 'react';
import UserContext from '@/contexts/UserContext';
import { labels, BG_COLORS } from "@/constants/DataChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CHART_CONFIG = {
  plugins: {
    title: {
      display: true,
      text: 'User Quarterly Data',
    },
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}

export default function DataChart() {
  const { filteredUsers, getUserDataset } = useContext(UserContext);

  const datasets = useMemo(
    // NOTE: There's a race condition on component mount and calling the `getUserDataset` method, let's add fallback value if the method isn't available.
    () => typeof getUserDataset === "function" ? getUserDataset(filteredUsers) : [],
    [getUserDataset, filteredUsers]
  );
  const data = {
    labels,
    datasetIdKey: 'id',
    datasets: datasets.map((dataset, idx) => ({
      ...dataset,
      backgroundColor: BG_COLORS[idx]
    }))
  };

  return <Bar options={CHART_CONFIG} data={data} />
}
