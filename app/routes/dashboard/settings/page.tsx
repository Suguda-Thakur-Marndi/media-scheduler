"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserProfile, useUser } from "@clerk/nextjs"
import { Layers, Palette, User } from "lucide-react"
import ChannelsTab from "@/components/settings/channels-tab"
import { useTheme } from "next-themes"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const SettingsPage = () => {
  const { user } = useUser()
  const { theme, setTheme } = useTheme()
  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto w-full h-full">
        <div className="pt-6 pb-8">
          <h1 className="text-2xl font-black tracking-tight text-foreground/90 flex items-center gap-2">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Account</span>
            <span className="text-muted-foreground/30 font-light text-xl">/</span>
            <span className="text-lg font-medium text-muted-foreground">Settings</span>
          </h1>
        </div>

        <div>
          <Tabs defaultValue="channels">
            <div className="mb-8 w-full border-b border-border/40 pb-6">
              <TabsList className="bg-muted/50 dark:bg-black/20 p-1.5 rounded-2xl border border-white/10 shadow-inner flex w-fit gap-1">
                <TabsTrigger value="profile" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-foreground text-muted-foreground hover:text-foreground/80 transition-all px-6 py-2.5 font-semibold text-sm">
                  <User className="size-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="channels" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-foreground text-muted-foreground hover:text-foreground/80 transition-all px-6 py-2.5 font-semibold text-sm">
                  <Layers className="size-4 mr-2" />
                  Channels
                </TabsTrigger>
                <TabsTrigger value="appearance" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-foreground text-muted-foreground hover:text-foreground/80 transition-all px-6 py-2.5 font-semibold text-sm">
                  <Palette className="size-4 mr-2" />
                  Appearance
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="profile" className="mt-0">
              <Card className="glass-card border-white/10 shadow-xl bg-transparent">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Your Profile</CardTitle>
                  <CardDescription>Manage your account information and preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 p-4 rounded-2xl bg-muted/20 border border-white/5 shadow-inner">
                    {user?.imageUrl ? (
                      <Image
                        src={user.imageUrl}
                        alt="Profile"
                        className="h-20 w-20 rounded-full border-4 border-background shadow-lg"
                        width={80}
                        height={80}
                      />
                    ):(
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted border-4 border-background shadow-lg">
                        <User className="size-10 text-muted-foreground" />
                      </div>
                    )}

                    <div>
                      <p className="text-xl font-bold text-foreground">{user?.fullName || "No name set"}</p>
                      <p className="text-sm font-medium text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
                    </div>
                  </div>
                   <div className="mt-6">
                    <UserProfile
                      routing="hash"
                      appearance={{
                        elements: {
                          rootBox: "w-full",
                          card: "border-0 shadow-none",
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="channels">
              <ChannelsTab  />
            </TabsContent>

            <TabsContent value="appearance" className="mt-0">
              <Card className="glass-card border-white/10 shadow-xl bg-transparent">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Appearance</CardTitle>
                  <CardDescription>Customize how the dashboard looks for you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-muted/20 border border-white/5 shadow-inner">
                    <div className="space-y-1">
                      <Label htmlFor="theme" className="text-base font-semibold">Dark mode</Label>
                      <p className="text-sm font-medium text-muted-foreground/80">
                        Toggle between light and dark theme
                      </p>
                    </div>
                    <Switch
                      id="theme"
                      checked={theme === "dark"}
                      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage