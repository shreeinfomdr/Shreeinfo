'use client';
import { useState } from 'react';
import styles from './Videos.module.css';

const videos = [
  { id: 'g5o_cyku3tw', title: 'VGA Port Replacement' },
  { id: 'G5_kviQDzkk', title: 'Shree Infotech Intro' },
  { id: '3fiJAVuksVU', title: 'Shree Infotech' },
];

export default function Videos({ content }: { content?: any }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videosTitle = content?.videosTitle || 'Tech Insights & Repairs';
  const videosSubtitle = content?.videosSubtitle || 'Watch our expert technicians in action and learn more about technology.';

  return (
    <section className={styles.videos} id="videos">
      <div className={styles.videosInner}>
        <h2 className="section-title">{videosTitle}</h2>
        <p className="section-subtitle">{videosSubtitle}</p>
        <div className={styles.grid}>
          {videos.map((video) => (
            <div key={video.id} className={styles.card} onClick={() => setActiveVideo(video.id)}>
              <div className={styles.thumbnailWrap}>
                <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={video.title} loading="lazy" />
                <div className={styles.playBtn}>
                  <div className={styles.playIcon} />
                </div>
              </div>
              <div className={styles.videoTitle}>{video.title}</div>
            </div>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div className={styles.modal} onClick={() => setActiveVideo(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setActiveVideo(null)}>✕</button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video Player"
            />
          </div>
        </div>
      )}
    </section>
  );
}
