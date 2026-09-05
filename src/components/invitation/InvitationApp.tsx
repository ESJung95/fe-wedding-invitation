"use client";

import { useState } from "react";
import Envelope from "./Envelope";
import RevealCard from "./RevealCard";
import Hero from "./Hero";
import Summary from "./Summary";
import Calendar from "./Calendar";
import Greeting from "./Greeting";
import Location from "./Location";
import Message from "./Message";
import Account from "./Account";
import Gallery from "./Gallery";
import Share from "./Share";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import { ToastProvider } from "./ToastContext";
import { calculateDday } from "@/lib/dday";
import type { InvitationContent } from "@/types/invitation";

interface InvitationAppProps {
  content: InvitationContent;
  guestName?: string;
}

type OpenPhase = "idle" | "flapOpen" | "cardPop" | "cardGrow" | "fadeOut";

export default function InvitationApp({ content, guestName }: InvitationAppProps) {
  const [stage, setStage] = useState<"intro" | "invitation">("intro");
  const [openPhase, setOpenPhase] = useState<OpenPhase>("idle");

  function handleOpenEnvelope() {
    if (openPhase !== "idle") return;
    setOpenPhase("flapOpen");
    setTimeout(() => {
      setOpenPhase("cardPop");
      setTimeout(() => {
        setOpenPhase("cardGrow");
        setTimeout(() => {
          setStage("invitation");
          setOpenPhase("fadeOut");
          setTimeout(() => {
            setOpenPhase("idle");
          }, 400);
        }, 650);
      }, 400);
    }, 500);
  }

  const dday = calculateDday(content.weddingDateISO);

  return (
    <ToastProvider>
      {stage === "intro" ? (
        <Envelope
          dateDisplay={content.weddingDateDisplay}
          guestName={guestName}
          isOpening={openPhase !== "idle"}
          onOpen={handleOpenEnvelope}
        />
      ) : (
        <div>
          <Hero
            groomName={content.couple.groomName}
            brideName={content.couple.brideName}
            heroImage={content.heroImage}
          />
          <Summary
            groomName={content.couple.groomName}
            brideName={content.couple.brideName}
            dateDisplay={content.weddingDateDisplay}
            timeDisplay={content.weddingTimeDisplay}
            venueName={content.venue.name}
          />
          <Greeting
            message={content.greeting.message}
            groomName={content.couple.groomName}
            brideName={content.couple.brideName}
            groomFamily={content.greeting.groomFamily}
            brideFamily={content.greeting.brideFamily}
          />
          <Calendar
            groomName={content.couple.groomName}
            brideName={content.couple.brideName}
            dateDisplay={content.weddingDateDisplay}
            timeDisplay={content.weddingTimeDisplay}
            venueName={content.venue.name}
            weddingDateISO={content.weddingDateISO}
            dday={dday}
          />
          <Location
            venue={content.venue}
            appName={content.shareLinkBase}
          />
          <Message />
          <Account
            accounts={content.accounts}
            flowerWreathNote={content.flowerWreathNote}
          />
          <Gallery images={content.galleryImages} />
          <Share shareLink={content.shareLinkBase} />
          <Footer
            groomName={content.couple.groomName}
            brideName={content.couple.brideName}
            closingImage={content.closingImage}
          />
        </div>
      )}
      {stage === "invitation" && <ScrollToTop />}
      {(openPhase === "cardPop" ||
        openPhase === "cardGrow" ||
        openPhase === "fadeOut") && (
        <RevealCard
          groomName={content.couple.groomName}
          brideName={content.couple.brideName}
          phase={openPhase}
        />
      )}
    </ToastProvider>
  );
}
