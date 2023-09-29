"use client";

import { useEffect, useState } from "react";

import EventModal from "@/components/modals/event-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <EventModal />
    </>
  );
};
