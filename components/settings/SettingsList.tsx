"use client";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  Moon, 
  Languages, 
  HelpCircle, 
  LogOut 
} from "lucide-react";

const settings = [
  { name: "Notifications", icon: Bell, type: "switch" },
  { name: "Dark Mode", icon: Moon, type: "switch" },
  { name: "Language", icon: Languages, type: "select" },
  { name: "Help & Support", icon: HelpCircle, type: "link" },
  { name: "Logout", icon: LogOut, type: "button", variant: "destructive" },
];

export function SettingsList() {
  return (
    <Card className="divide-y divide-border glass-card">
      {settings.map((setting) => (
        <div
          key={setting.name}
          className="flex items-center justify-between p-4"
        >
          <div className="flex items-center gap-3">
            <setting.icon className="w-5 h-5 text-muted-foreground" />
            <span>{setting.name}</span>
          </div>
          {setting.type === "switch" && <Switch />}
        </div>
      ))}
    </Card>
  );
}