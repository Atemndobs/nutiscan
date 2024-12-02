import { SettingsList } from "@/components/settings/SettingsList";

export default function SettingsPage() {
  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <SettingsList />
    </div>
  );
}