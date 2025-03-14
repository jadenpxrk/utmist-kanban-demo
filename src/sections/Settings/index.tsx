"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, BellOff, UploadCloud } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  role: string;
  avatarUrl: string;
}

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export function Settings() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Jaden Park",
    email: "jadenpark@utmist.com",
    bio: "placeholder",
    role: "Admin",
    avatarUrl: "/avatars/",
  });

  const [isEditing, setIsEditing] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSetting[]
  >([
    {
      id: "in-app",
      title: "In-app notifications",
      description:
        "Receive notifications about tasks and updates within the application",
      enabled: true,
    },
    {
      id: "task-assigned",
      title: "Task assignments",
      description: "Get notified when you're assigned to a new task",
      enabled: true,
    },
    {
      id: "mentions",
      title: "Mentions",
      description: "Get notified when someone mentions you in comments",
      enabled: false,
    },
  ]);

  const toggleNotification = (id: string) => {
    setNotificationSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setProfile((prev) => ({ ...prev, role: value }));
  };

  const handleSave = () => {
    // here would be the API call to save the profile data
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and profile information
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal details and public profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex flex-col items-center space-y-4">
                <Avatar>
                  <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="gap-2">
                  <UploadCloud className="h-4 w-4" />
                  <span>Upload</span>
                </Button>
              </div>
              <div className="flex-1 space-y-5 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="resize-none min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Access Level</Label>
                  <Select
                    disabled={!isEditing}
                    value={profile.role}
                    onValueChange={handleRoleChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Developer">Developer</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </CardFooter>
        </Card>

        {/* Account Security Card */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Update your password and security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Update Password</Button>
          </CardFooter>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure your notification settings
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  const allEnabled = notificationSettings.every(
                    (setting) => setting.enabled
                  );
                  setNotificationSettings((prev) =>
                    prev.map((setting) => ({
                      ...setting,
                      enabled: !allEnabled,
                    }))
                  );
                }}
              >
                {notificationSettings.every((setting) => setting.enabled) ? (
                  <>
                    <BellOff className="h-4 w-4" />
                    <span>Disable All</span>
                  </>
                ) : (
                  <>
                    <Bell className="h-4 w-4" />
                    <span>Enable All</span>
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              {notificationSettings.map((setting, index) => (
                <React.Fragment key={setting.id}>
                  {index > 0 && <Separator className="my-6" />}
                  <div className="flex items-center justify-between py-6 first:pt-0 last:pb-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium text-base">
                          {setting.title}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-7">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      checked={setting.enabled}
                      onCheckedChange={() => toggleNotification(setting.id)}
                      aria-label={`Toggle ${setting.title}`}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
