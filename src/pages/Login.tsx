import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (username === "admin" && password === "123") {
      toast({
        title: "Access Granted",
        description: "Welcome to Tactical Command Center",
        variant: "default",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid credentials. Authorization required.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-tactical p-4">
      <div className="w-full max-w-md">
        <Card className="border-primary/30 shadow-tactical">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-primary/20 border border-primary/30">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold font-mono tracking-wider">
                TACTICAL ACCESS
              </CardTitle>
              <CardDescription className="text-muted-foreground font-mono">
                CLASSIFIED SYSTEM - AUTHORIZED PERSONNEL ONLY
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-mono font-medium">
                  USERNAME
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="font-mono bg-background/50 border-primary/30 focus:border-primary"
                  placeholder="Enter username"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-mono font-medium">
                  PASSWORD
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="font-mono bg-background/50 border-primary/30 focus:border-primary"
                  placeholder="Enter password"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="tactical"
                className="w-full font-mono font-bold tracking-wide"
                disabled={isLoading}
              >
                {isLoading ? "AUTHENTICATING..." : "ESTABLISH CONNECTION"}
              </Button>
            </form>

            <div className="mt-6 p-3 rounded-md bg-warning/10 border border-warning/30">
              <div className="flex items-center gap-2 text-warning text-xs font-mono">
                <AlertTriangle className="h-4 w-4" />
                <span>DEMO CREDENTIALS: admin / 123</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;