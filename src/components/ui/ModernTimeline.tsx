"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import styles from '../../app/programacao/Programacao.module.css';

export interface TimelineEvent {
  title: string;
  speaker?: string;
  startTime: string;
  endTime: string;
  image?: string;
  status: "completed" | "current" | "upcoming";
  category: 'Abertura' | 'Comunicação' | 'Debate' | 'Coffee Break' | 'Palestra Magna' | 'Confraternização';
}

const statusTranslations = {
  completed: "Realizado",
  current: "Em Andamento",
  upcoming: "Próximo",
};

export function ModernTimeline({ items }: { items: TimelineEvent[] }) {
  if (!items || items.length === 0) return <p>Programação não disponível.</p>;

  return (
    <section className={styles.timelineWrapper}>
      <div className={styles.timelineContainer}>
        <div className={styles.timelineLine} aria-hidden="true" />

        <div className={styles.timelineEventsContainer}>
          {items.map((item, index) => {
            const statusClass = styles[item.status];

            return (
              <motion.div
                key={index}
                className={styles.timelineEvent}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className={styles.timelineEventLayout}>
                  <div className={styles.timelineAvatarContainer}>
                     <div className={`${styles.timelineAvatar} ${statusClass}`}>
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.speaker || item.title}
                            width={48}
                            height={48}
                            className={styles.timelineAvatarImage}
                          />
                        ) : (
                           <i className={`${styles.timelineDefaultIcon} ${item.status === 'current' ? 'bx bxs-time-five' : 'bx bx-calendar-event'}`}></i>
                        )}
                      </div>
                  </div>

                  <motion.div
                    className={`${styles.timelineCard} ${statusClass}`}
                    whileHover={{ y: -3 }}
                  >
                    <div className={styles.timelineCardContent}>
                      <div className={styles.timelineCardHeader}>
                        <p className={`${styles.timelineTime} ${statusClass}`}>{item.startTime} - {item.endTime}</p>
                        <div className={`${styles.timelineStatusBadge} ${statusClass}`}>
                          {statusTranslations[item.status]}
                        </div>
                      </div>
                      <h3 className={styles.timelineTitle}>{item.title}</h3>
                      {item.speaker && (
                        <p className={styles.timelineSpeaker}>{item.speaker}</p>
                      )}
                      {/* --- ADICIONADO: Barra de Progresso --- */}
                      <div className={styles.timelineProgressBar}>
                        <motion.div
                          className={`${styles.timelineProgressIndicator} ${statusClass}`}
                          initial={{ width: 0 }}
                          animate={{ 
                            width: item.status === "completed" ? "100%" : item.status === "current" ? "50%" : "0%"
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}