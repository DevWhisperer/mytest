"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CheckSquare, User, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const MENU_ITEMS = [
  { name: "대시보드", href: "/", icon: LayoutDashboard },
  { name: "할 일", href: "/task", icon: CheckSquare },
];

const Sidebar = () => {
  const pathname = usePathname();

  const { userId, isLoggedIn } = useAuth();

  return (
    <aside className="w-64 border-r bg-white h-screen sticky top-0 flex flex-col p-4 font-pretendard">
      <nav className="flex-1 space-y-2">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
              pathname === item.href
                ? "bg-primary text-white"
                : "hover:bg-gray-100",
            )}
          >
            <item.icon size={20} />
            <span className="font-sans">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t pt-4">
        {isLoggedIn ? (
          <Link
            href="/user"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
              pathname === "/user"
                ? "bg-primary text-white"
                : "hover:bg-gray-100",
            )}
          >
            <User size={20} />
            <span className="truncate flex-1">회원정보 ({userId})</span>
          </Link>
        ) : (
          <Link
            href="/sign-in"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
              pathname === "/sign-in"
                ? "bg-primary text-white"
                : "hover:bg-gray-100",
            )}
          >
            <LogIn size={20} />
            <span>로그인</span>
          </Link>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
