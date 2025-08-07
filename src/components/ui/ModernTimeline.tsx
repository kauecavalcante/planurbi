"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import styles from '../../app/programacao/Programacao.module.css';

// ATUALIZADO: Interface para uma palestra individual dentro de um bloco
export interface Talk {
  title: string;
  speaker: string;
  image: string;
}

// ATUALIZADO: Interface para um evento da timeline
export interface TimelineEvent {
  title: string;
  speaker?: string;
  startTime: string;
  endTime: string;
  image?: string;
  status: "completed" | "current" | "upcoming";
  category: 'Abertura' | 'Bloco' | 'Debate' | 'Coffee Break' | 'Palestra Magna' | 'Confraternização';
  talks?: Talk[]; // Array de palestras para eventos de bloco
}

const statusTranslations = {
  completed: "Realizado",
  current: "Em Andamento",
  upcoming: "Próximo",
};

export function ModernTimeline({ items }: { items: TimelineEvent[] }) {
  if (!items || items.length === 0) return <p>Programação não disponível.</p>;

  // ATUALIZADO: Função para determinar o ícone com base na categoria
  const getIconForCategory = (category: TimelineEvent['category']) => {
    switch (category) {
      case 'Abertura':
        return 'bx bxs-keynote';
      case 'Bloco':
        return 'bx bxs-group';
      case 'Debate':
        return 'bx bxs-conversation';
      case 'Coffee Break':
        return 'bx bxs-coffee-bean';
      case 'Palestra Magna':
        return 'bx bxs-star';
      case 'Confraternização':
        return 'bx bxs-drink';
      default:
        return 'bx bx-calendar-event';
    }
  };

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
                           <i className={`${styles.timelineDefaultIcon} ${getIconForCategory(item.category)}`}></i>
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

                      {/* ATUALIZADO: Renderiza as palestras se existirem */}
                      {item.talks && item.talks.length > 0 && (
                        <div className={styles.talksContainer}>
                          {item.talks.map((talk, talkIndex) => (
                            <div key={talkIndex} className={styles.talkItem}>
                              <div className={styles.talkImageContainer}>
                                <Image
                                  src={talk.image}
                                  alt={talk.speaker}
                                  width={40}
                                  height={40}
                                  className={styles.talkImage}
                                />
                              </div>
                              <div className={styles.talkDetails}>
                                <p className={styles.talkTitle}>{talk.title}</p>
                                <p className={styles.talkSpeaker}>{talk.speaker}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

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