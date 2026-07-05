'use client';
import { useState, useEffect } from 'react';
import styles from './Videos.module.css';

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  isFeatured?: boolean;
}

export default function Videos({ content }: { content?: any }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  
  const videosTitle = content?.videosTitle || 'Tech Insights & Repairs';
  const videosSubtitle = content?.videosSubtitle || 'Watch our expert technicians in action and learn more about technology.';

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/admin/videos');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // Display only featured videos, up to 3
          const featured = data.filter((v: Video) => v.isFeatured).slice(0, 3);
          // If no featured videos, fallback to first 3
          setVideos(featured.length > 0 ? featured : data.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to load videos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return null;
  if (videos.length === 0) return null;

  return (
    <section className={styles.videos} id="videos">
      <div className={styles.videosInner}>
        <h2 className="section-title">{videosTitle}</h2>
        <p className="section-subtitle">{videosSubtitle}</p>
        <div className={styles.grid}>
          {videos.map((video) => (
            <div key={video.id} className={styles.card} onClick={() => setActiveVideo(video.youtubeId)}>
              <div className={styles.thumbnailWrap}>
                <img src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`} alt={video.title} loading="lazy" />
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
