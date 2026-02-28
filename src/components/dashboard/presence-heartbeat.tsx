"use client";

import { useEffect } from "react";
import { updatePresenceAction } from "@/actions/user/presence";

export function PresenceHeartbeat() {
  useEffect(() => {
    // Initial update
    updatePresenceAction();

    // Heartbeat every 45 seconds
    const interval = setInterval(() => {
      updatePresenceAction();
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  return null; // Invisible component
}
