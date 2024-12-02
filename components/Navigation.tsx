"use client";

import { Home, BarChart2, History, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Stats", icon: BarChart2, href: "/stats" },
  { name: "History", icon: History, href: "/history" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-lg">
      <div className="container max-w-md mx-auto">
        <div className="flex justify-around py-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-item ${pathname === item.href ? "active" : ""}`}
            >
              <item.icon className="w-6 h-6" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}