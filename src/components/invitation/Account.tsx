"use client";

import { useState } from "react";
import sectionStyles from "./Section.module.css";
import styles from "./Account.module.css";
import { useToast } from "./ToastContext";
import { copyAccountNumber } from "@/lib/integrations/kakaoPay";
import type { AccountGroup, BankAccount } from "@/types/invitation";

interface AccountProps {
  accounts: AccountGroup;
  flowerWreathNote: string;
}

function AccountAccordion({
  title,
  items,
}: {
  title: string;
  items: BankAccount[];
}) {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);

  async function handleCopy(e: React.MouseEvent, value: string) {
    e.stopPropagation();
    const digitsOnly = value.replace(/[^0-9]/g, "");
    const result = await copyAccountNumber(digitsOnly);
    showToast(result.message);
  }

  return (
    <div className={`${styles.item} ${open ? styles.itemOpen : ""}`}>
      <div className={styles.head} onClick={() => setOpen(!open)}>
        {title}
        <svg
          className={styles.chevron}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      <div className={styles.body}>
        {items.map((account) => (
          <div className={styles.row} key={account.who}>
            <div>
              <div className={styles.who}>{account.who}</div>
              {account.bank} {account.number}
            </div>
            <button
              className={styles.copyBtn}
              onClick={(e) => handleCopy(e, account.number)}
            >
              복사
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Account({ accounts, flowerWreathNote }: AccountProps) {
  return (
    <section className={sectionStyles.sec}>
      <h2 className={sectionStyles.title}>마음 전하실 곳</h2>

      <div className={styles.flowerNote}>
        <span className={styles.divider} />
        {flowerWreathNote.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
        <span className={styles.divider} />
      </div>

      <AccountAccordion title="신랑측" items={accounts.groom} />
      <AccountAccordion title="신부측" items={accounts.bride} />
    </section>
  );
}
