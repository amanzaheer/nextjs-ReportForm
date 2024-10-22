// pages/report.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import html2pdf from 'html2pdf.js';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function Report() {
  const router = useRouter();
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    if (router.query) {
      const data = router.query;
      const estimatedSavings = calculateEstimatedSavings(data);
      const roi = calculateROI(data, estimatedSavings);
      setReportData({
        ...data,
        estimatedSavings,
        roi,
      });
    }
  }, [router.query]);

  const calculateEstimatedSavings = (data) => {
    const savings = data.electricityBill * 0.2; // Placeholder calculation
    return savings.toFixed(2);
  };

  const calculateROI = (data, savings) => {
    const installationCost = 5000; // Placeholder for average installation cost
    const roi = installationCost / (savings * 12);
    return roi.toFixed(1);
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('report-content');
    html2pdf().from(element).save('EnergyReport.pdf');
  };

  const chartData = {
    labels: ['Electricity', 'Gas', 'Propane', 'Savings'],
    datasets: [
      {
        label: 'Monthly Cost ($)',
        data: [
          reportData?.electricityBill || 0,
          reportData?.gasBill || 0,
          reportData?.propaneUsage || 0,
          reportData?.estimatedSavings || 0,
        ],
        backgroundColor: ['#4CAF50', '#FF9800', '#9C27B0', '#00BCD4'],
      },
    ],
  };

  return reportData ? (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Energy Report</h1>
      <div id="report-content" className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>
        <table className="w-full mb-4 text-left border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Detail</th>
              <th className="p-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-t">Average Monthly Electricity Bill</td>
              <td className="p-2 border-t">${reportData.electricityBill}</td>
            </tr>
            <tr>
              <td className="p-2 border-t">Estimated Monthly Savings</td>
              <td className="p-2 border-t">${reportData.estimatedSavings}</td>
            </tr>
            <tr>
              <td className="p-2 border-t">ROI for Suggested Improvements</td>
              <td className="p-2 border-t">{reportData.roi} years</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Monthly Cost Comparison</h2>
          <div className="w-1/2  h-2/3 mx-auto">
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } }, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
      <button
        onClick={handleDownloadPDF}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md mx-auto block"
      >
        Download PDF
      </button>
    </div>
  ) : (
    <p className="text-center">Loading...</p>
  );
}
