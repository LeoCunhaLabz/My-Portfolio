"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import ContactModal from "@/components/ContactModal";

// The menu's Contact item outside the home page: it opens the same contact options
// as the Contact section, without leaving the page. The modal goes to <body>,
// because the menu's blur would otherwise confine a fixed element to the menu.
const noSubscription = () => () => {};

export const ContactNavButton = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  // False on the server and during hydration, true afterwards: <body> is only there in the browser.
  const inBrowser = useSyncExternalStore(noSubscription, () => true, () => false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className={className}>
        Contact
      </button>
      {inBrowser && createPortal(<ContactModal open={open} onClose={close} />, document.body)}
    </>
  );
};
