import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, AlertTriangle, Users, Zap, Thermometer, Droplets, Eye, Radio, Activity } from "lucide-react";

interface SensorData {
  id: string;
  type: string;
  value: string;
  status: "normal" | "warning" | "critical";
  location: string;
}

interface Asset {
  id: string;
  type: "troop" | "drone" | "sensor";
  name: string;
  position: { lat: number; lng: number };
  status: "active" | "inactive" | "alert";
}

interface Alert {
  id: string;
  type: "movement" | "communication" | "intrusion" | "anomaly";
  message: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
}

const Dashboard = () => {
  const [assets, setAssets] = useState<Asset[]>([
    { id: "T-001", type: "troop", name: "Alpha Squad", position: { lat: 40.7128, lng: -74.0060 }, status: "active" },
    { id: "D-001", type: "drone", name: "Reaper-01", position: { lat: 40.7589, lng: -73.9851 }, status: "active" },
    { id: "S-001", type: "sensor", name: "Perimeter-N1", position: { lat: 40.7831, lng: -73.9712 }, status: "alert" },
    { id: "T-002", type: "troop", name: "Bravo Team", position: { lat: 40.7505, lng: -73.9934 }, status: "active" },
    { id: "D-002", type: "drone", name: "Raven-02", position: { lat: 40.7282, lng: -74.0776 }, status: "inactive" },
  ]);

  const [sensorData, setSensorData] = useState<SensorData[]>([
    { id: "TEMP-01", type: "Temperature", value: "24°C", status: "normal", location: "Sector A" },
    { id: "HUM-01", type: "Humidity", value: "65%", status: "normal", location: "Sector A" },
    { id: "IR-01", type: "IR Detection", value: "3 Contacts", status: "warning", location: "Perimeter" },
    { id: "TEMP-02", type: "Temperature", value: "31°C", status: "warning", location: "Sector B" },
    { id: "RAD-01", type: "Radio Activity", value: "Normal", status: "normal", location: "Base" },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    { id: "A-001", type: "movement", message: "Unidentified movement detected in Sector 7", timestamp: "14:23:45", severity: "high" },
    { id: "A-002", type: "communication", message: "Communication loss with Delta Unit", timestamp: "14:18:22", severity: "critical" },
    { id: "A-003", type: "intrusion", message: "Perimeter breach detected - Zone Alpha", timestamp: "14:15:10", severity: "critical" },
    { id: "A-004", type: "anomaly", message: "Temperature anomaly in equipment bay", timestamp: "14:12:33", severity: "medium" },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update sensor data randomly
      setSensorData(prev => prev.map(sensor => ({
        ...sensor,
        value: sensor.type === "Temperature" 
          ? `${Math.floor(Math.random() * 10) + 20}°C`
          : sensor.type === "Humidity"
          ? `${Math.floor(Math.random() * 30) + 50}%`
          : sensor.value
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "destructive";
      case "warning": case "high": return "warning";
      case "active": case "normal": case "low": return "success";
      case "medium": return "warning";
      default: return "secondary";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "movement": return <Users className="h-4 w-4" />;
      case "communication": return <Radio className="h-4 w-4" />;
      case "intrusion": return <AlertTriangle className="h-4 w-4" />;
      case "anomaly": return <Activity className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-tactical p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-mono tracking-wider text-foreground">
              TACTICAL COMMAND CENTER
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              Real-time Battlefield Intelligence Dashboard
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="font-mono">
              <Activity className="h-3 w-3 mr-1" />
              SYSTEM OPERATIONAL
            </Badge>
            <div className="text-right font-mono text-sm">
              <div className="text-foreground">{new Date().toLocaleDateString()}</div>
              <div className="text-muted-foreground">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="border-primary/30 shadow-tactical">
              <CardHeader>
                <CardTitle className="font-mono flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  BATTLEFIELD MAP
                </CardTitle>
                <CardDescription className="font-mono">
                  Real-time asset positions and tactical overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-background/30 rounded-lg p-6 h-96 border border-primary/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  
                  {/* Simulated Map Grid */}
                  <div className="grid grid-cols-8 grid-rows-6 gap-1 h-full opacity-20">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="border border-primary/20" />
                    ))}
                  </div>

                  {/* Asset Markers */}
                  {assets.map((asset, index) => (
                    <div
                      key={asset.id}
                      className={`absolute w-4 h-4 rounded-full border-2 border-background animate-pulse ${
                        asset.status === "active" ? "bg-success" :
                        asset.status === "alert" ? "bg-destructive" : "bg-muted"
                      }`}
                      style={{
                        left: `${20 + (index * 15)}%`,
                        top: `${30 + (index * 10)}%`,
                      }}
                      title={`${asset.name} - ${asset.status}`}
                    />
                  ))}

                  <div className="absolute bottom-4 left-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <div className="w-3 h-3 rounded-full bg-success" />
                      <span>Active Units</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <div className="w-3 h-3 rounded-full bg-destructive" />
                      <span>Alert Status</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <div className="w-3 h-3 rounded-full bg-muted" />
                      <span>Inactive</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts Panel */}
          <div>
            <Card className="border-destructive/30 shadow-alert">
              <CardHeader>
                <CardTitle className="font-mono flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  ACTIVE ALERTS
                </CardTitle>
                <CardDescription className="font-mono">
                  Critical system notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-md border border-l-4 ${
                      alert.severity === "critical" ? "border-l-destructive bg-destructive/10" :
                      alert.severity === "high" ? "border-l-warning bg-warning/10" :
                      alert.severity === "medium" ? "border-l-warning bg-warning/5" :
                      "border-l-info bg-info/5"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-mono font-medium">
                          {alert.message}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-mono text-muted-foreground">
                            {alert.timestamp}
                          </span>
                          <Badge variant={getStatusColor(alert.severity) as any} className="text-xs font-mono">
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Environmental Sensors */}
          <Card className="border-primary/30 shadow-tactical">
            <CardHeader>
              <CardTitle className="font-mono flex items-center gap-2 text-sm">
                <Thermometer className="h-4 w-4 text-primary" />
                ENVIRONMENTAL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sensorData.filter(s => s.type.includes("Temperature") || s.type.includes("Humidity")).map((sensor) => (
                <div key={sensor.id} className="flex items-center justify-between">
                  <span className="text-sm font-mono text-muted-foreground">{sensor.type}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold">{sensor.value}</span>
                    <Badge variant={getStatusColor(sensor.status) as any} className="text-xs">
                      {sensor.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Detection Systems */}
          <Card className="border-primary/30 shadow-tactical">
            <CardHeader>
              <CardTitle className="font-mono flex items-center gap-2 text-sm">
                <Eye className="h-4 w-4 text-primary" />
                DETECTION
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sensorData.filter(s => s.type.includes("IR") || s.type.includes("Radio")).map((sensor) => (
                <div key={sensor.id} className="flex items-center justify-between">
                  <span className="text-sm font-mono text-muted-foreground">{sensor.type}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold">{sensor.value}</span>
                    <Badge variant={getStatusColor(sensor.status) as any} className="text-xs">
                      {sensor.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Asset Status */}
          <Card className="border-primary/30 shadow-tactical">
            <CardHeader>
              <CardTitle className="font-mono flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary" />
                ASSETS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-2xl font-bold font-mono text-success">
                    {assets.filter(a => a.status === "active").length}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">ACTIVE</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-destructive">
                    {assets.filter(a => a.status === "alert").length}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">ALERT</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-muted-foreground">
                    {assets.filter(a => a.status === "inactive").length}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">OFFLINE</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="border-primary/30 shadow-tactical">
            <CardHeader>
              <CardTitle className="font-mono flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4 text-primary" />
                SYSTEM
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono text-muted-foreground">Network</span>
                  <Badge variant="success" className="text-xs font-mono">ONLINE</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono text-muted-foreground">Comms</span>
                  <Badge variant="success" className="text-xs font-mono">SECURE</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono text-muted-foreground">Power</span>
                  <Badge variant="success" className="text-xs font-mono">NOMINAL</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;