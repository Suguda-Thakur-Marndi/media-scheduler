"use client"

import { Suspense, useState } from "react";
import { useQueryState } from "nuqs"
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CalendarIcon, LayoutList, Plus } from "lucide-react";
import ListView from "@/components/schedule/list-view";
import CalendarView from "@/components/schedule/calendar-view";
import CreatePostDialog from "@/components/schedule/create-post-dialog";

type ViewType = "calendar" | "list"
const SchedulePageContent = () => {
  const [activeView, setActiveView] = useQueryState("view", {
    defaultValue: "calendar",
  });
  const [_,setStatus] = useQueryState("status", {
    defaultValue: "",
  })
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false)
  return (
    <div className="flex flex-col h-full bg-transparent">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 md:px-8 pt-6 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground/90 flex items-center gap-2">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">All Channels</span>
            <span className="text-muted-foreground/30 font-light text-xl">/</span>
            <span className="text-lg font-medium text-muted-foreground">Schedule</span>
          </h1>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="bg-muted/50 dark:bg-black/20 p-1 rounded-xl border border-white/10 shadow-inner flex relative">
            {["list", "calendar"].map((view) => (
              <button
                key={view}
                onClick={() => {
                  setStatus(null);
                  setActiveView(view as ViewType);
                }}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-lg transition-colors z-10 flex items-center gap-2 ${
                  activeView === view ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
                }`}
              >
                {activeView === view && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-background dark:bg-white/10 rounded-lg shadow-md border border-white/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-20 flex items-center gap-2">
                  {view === "list" ? <LayoutList className="size-4" /> : <CalendarIcon className="size-4" />}
                  <span className="capitalize">{view}</span>
                </span>
              </button>
            ))}
          </div>
          
          <Button 
            onClick={() => setCreatePostModalOpen(true)}
            className="rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
          >
            <Plus className="size-4" />
            <span className="font-bold">Add Post</span>
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        {activeView === "list" ? (
          <ListView setCreatePostModalOpen={setCreatePostModalOpen} />
        ) : (
          <CalendarView />
        )}
      </div>

      <CreatePostDialog
        open={createPostModalOpen}
        onOpenChange={setCreatePostModalOpen}
      />
    </div>
  )
}

const SchedulePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NuqsAdapter>
        <SchedulePageContent />
      </NuqsAdapter>
    </Suspense>
  )
}

export default SchedulePage