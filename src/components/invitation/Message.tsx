"use client";

import { useState } from "react";
import sectionStyles from "./Section.module.css";
import styles from "./Message.module.css";
import { useToast } from "./ToastContext";
import { saveGuestMessage } from "@/lib/integrations/messages";

export default function Message() {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  async function handleSubmit() {
    const result = await saveGuestMessage({ name, text });
    showToast(result.message);
    if (result.status !== "error") {
      setName("");
      setText("");
    }
  }

  return (
    <section className={sectionStyles.sec}>
      <h2 className={sectionStyles.title}>축하 메시지</h2>
      <p className={styles.privateNote}>
        남겨주신 메시지는 공개되지 않으며 신랑, 신부만 확인할 수 있습니다
      </p>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="이름을 입력해 주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="축하 메시지를 남겨 주세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className={styles.submit} onClick={handleSubmit}>
          메시지 남기기
        </button>
      </div>
    </section>
  );
}
