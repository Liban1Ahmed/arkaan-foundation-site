import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Lock, LogOut, User, Shield } from "lucide-react";
import { toast } from "sonner";

export function AdminLogin() {
  const { user, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(credentials.email, credentials.password);
    if (success) {
      toast.success("Welcome, Admin!");
      setIsOpen(false);
      setCredentials({ email: "", password: "" });
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  if (user?.isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm">
          <Shield className="h-4 w-4" />
          <span className="font-medium">{user.email}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-1" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Lock className="h-4 w-4 mr-2" />
          Admin Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Admin Login
          </DialogTitle>
          <DialogDescription>
            Sign in to manage activities and posters.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials((prev) => ({ ...prev, email: e.target.value }))
                }
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials((prev) => ({ ...prev, password: e.target.value }))
                }
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}