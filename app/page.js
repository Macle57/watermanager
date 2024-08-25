"use client";

 
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  AlertTriangle,
  Droplet,
  Activity,
  Thermometer,
  Calendar,
  TrendingUp,
  Settings,
  AlertOctagon,
  PhoneCall,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const generateMockData = () => {
  const nodes = ["Main Tank", "Node A", "Node B", "Node C", "Node D", "Node E"];
  return nodes.map((node) => ({
    name: node,
    flowRate: Math.floor(Math.random() * 100),
    pressure: Math.floor(Math.random() * 100),
    leakStatus:
      Math.random() > 0.8
        ? "Critical"
        : Math.random() > 0.6
        ? "Warning"
        : "Normal",
    temperature: Math.floor(Math.random() * 30) + 10,
    pH: Math.random() * 4 + 5,
    turbidity: Math.floor(Math.random() * 5),
    maintenanceScore: Math.floor(Math.random() * 100),
    waterLevel: Math.floor(Math.random() * 100),
    demandForecast: Math.floor(Math.random() * 1000) + 500,
  }));
};

const generateConsumptionData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i],
    consumption: Math.floor(Math.random() * 1000) + 500,
    forecast: Math.floor(Math.random() * 1000) + 600,
  }));
};

const LeakAlert = ({ status }) => {
  const alertType =
    status === "Critical"
      ? "destructive"
      : status === "Warning"
      ? "warning"
      : "success";
  const title =
    status === "Normal" ? "No Leaks Detected" : `${status} Leak Detected`;

  return (
    <Alert variant={alertType}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {status === "Normal"
          ? "The water distribution system is functioning normally."
          : `A ${status.toLowerCase()} leak has been detected. Please check the system.`}
      </AlertDescription>
    </Alert>
  );
};

const WaterQualityCard = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Water Quality: {data.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Temperature</span>
          <span>{data.temperature}°C</span>
        </div>
        <div className="flex items-center justify-between">
          <span>pH Level</span>
          <span>{data.pH.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Turbidity</span>
          <span>{data.turbidity} NTU</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const MaintenanceCard = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Maintenance: {data.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center">
        <span className="text-2xl font-bold">{data.maintenanceScore}%</span>
        <Progress value={data.maintenanceScore} className="mt-2" />
      </div>
      <p className="mt-2 text-sm text-gray-500">
        {data.maintenanceScore > 80
          ? "System is in good condition"
          : data.maintenanceScore > 50
          ? "Maintenance may be required soon"
          : "Urgent maintenance required"}
      </p>
      {data.maintenanceScore <= 50 && (
        <Button
          className="mt-2 w-full"
          onClick={() =>
            alert(`Maintenance request escalated for ${data.name}`)
          }
        >
          <PhoneCall className="mr-2 h-4 w-4" /> Escalate for Repair
        </Button>
      )}
    </CardContent>
  </Card>
);

const ConsumptionTrendChart = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Weekly Water Consumption and Forecast</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="consumption"
            stroke="#3b82f6"
            name="Actual Consumption"
          />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#10b981"
            name="Forecasted Consumption"
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const SystemTopology = ({ data }) => {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82ca9d",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Topology and Water Levels</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="waterLevel"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const WaterScarcityPrediction = ({ data }) => {
  const scarcityRisk =
    data.reduce((acc, node) => acc + node.waterLevel, 0) / data.length;
  const riskLevel =
    scarcityRisk < 30 ? "High" : scarcityRisk < 60 ? "Medium" : "Low";
  const riskColor =
    riskLevel === "High"
      ? "text-red-600"
      : riskLevel === "Medium"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Scarcity Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <span className={`text-2xl font-bold ${riskColor}`}>
            {riskLevel} Risk
          </span>
          <Progress value={scarcityRisk} className="mt-2" />
        </div>
        <p className="mt-2 text-sm">
          Based on current water levels and demand forecasts, the risk of water
          scarcity in the near future is {riskLevel.toLowerCase()}.
        </p>
        {riskLevel !== "Low" && (
          <Button
            className="mt-2 w-full"
            onClick={() => alert("Water conservation measures activated")}
          >
            <AlertOctagon className="mr-2 h-4 w-4" /> Activate Conservation
            Measures
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const DroughtManagement = ({ data }) => {
  const totalDemand = data.reduce((acc, node) => acc + node.demandForecast, 0);
  const totalSupply = data.reduce((acc, node) => acc + node.waterLevel, 0);
  const supplyDemandRatio = (totalSupply / totalDemand) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Drought Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Total Forecasted Demand</span>
            <span>{totalDemand.toFixed(0)} units</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total Available Supply</span>
            <span>{totalSupply.toFixed(0)} units</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Supply/Demand Ratio</span>
            <span
              className={
                supplyDemandRatio < 80 ? "text-red-600" : "text-green-600"
              }
            >
              {supplyDemandRatio.toFixed(1)}%
            </span>
          </div>
        </div>
        {supplyDemandRatio < 80 && (
          <Button
            className="mt-4 w-full"
            onClick={() => alert("Drought management plan activated")}
          >
            <AlertOctagon className="mr-2 h-4 w-4" /> Activate Drought
            Management Plan
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const WaterManagementDashboard = () => {  // This is the main component
  const [data, setData] = useState([]);
  const [consumptionData, setConsumptionData] = useState([]);

  useEffect(() => {
    setData(generateMockData());
    setConsumptionData(generateConsumptionData());

    const interval = setInterval(() => {
      setData(generateMockData());
      setConsumptionData(generateConsumptionData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const overallStatus = data.some((node) => node.leakStatus === "Critical")
    ? "Critical"
    : data.some((node) => node.leakStatus === "Warning")
    ? "Warning"
    : "Normal";

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        IoT Water Management Dashboard
      </h1>

      <LeakAlert status={overallStatus} />

      <Tabs defaultValue="overview" className="mt-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quality">Water Quality</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="consumption">Consumption</TabsTrigger>
          <TabsTrigger value="drought">Drought Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <SystemTopology data={data} />
            <WaterScarcityPrediction data={data} />
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.map((node, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{node.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Droplet className="h-4 w-4 mr-2" />
                      <span>Flow: {node.flowRate}</span>
                    </div>
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 mr-2" />
                      <span>Pressure: {node.pressure}</span>
                    </div>
                  </div>
                  <div
                    className={`mt-2 p-2 rounded-md text-center ${
                      node.leakStatus === "Critical"
                        ? "bg-red-100 text-red-800"
                        : node.leakStatus === "Warning"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {node.leakStatus}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quality">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {data.map((node, index) => (
              <WaterQualityCard key={index} data={node} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {data.map((node, index) => (
              <MaintenanceCard key={index} data={node} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="consumption">
          <ConsumptionTrendChart data={consumptionData} />
        </TabsContent>

        <TabsContent value="drought">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <DroughtManagement data={data} />
            <WaterScarcityPrediction data={data} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WaterManagementDashboard;
