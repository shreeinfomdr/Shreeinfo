import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

const useKV = !!process.env.KV_REST_API_URL;
const localDataPath = path.join(process.cwd(), 'data', 'videos.json');

if (!useKV && !fs.existsSync(path.dirname(localDataPath))) {
  fs.mkdirSync(path.dirname(localDataPath), { recursive: true });
}

export async function GET() {
  try {
    let videos: any[] = [];
    if (useKV) {
      videos = (await kv.get<any[]>('site_videos')) || [];
    } else {
      if (fs.existsSync(localDataPath)) {
        videos = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
      }
    }
    // If empty, return some default ones
    if (videos.length === 0) {
      videos = [
        { id: '1', youtubeId: 'g5o_cyku3tw', title: 'VGA Port Replacement', isFeatured: true },
        { id: '2', youtubeId: 'G5_kviQDzkk', title: 'Shree Infotech Intro', isFeatured: true },
        { id: '3', youtubeId: '3fiJAVuksVU', title: 'Shree Infotech', isFeatured: true },
      ];
    }
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.youtubeId || !data.title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newVideo = {
      id: Date.now().toString(),
      youtubeId: data.youtubeId,
      title: data.title,
      isFeatured: data.isFeatured || false,
    };

    let videos: any[] = [];
    if (useKV) {
      videos = (await kv.get<any[]>('site_videos')) || [];
      videos.unshift(newVideo);
      await kv.set('site_videos', videos);
    } else {
      if (fs.existsSync(localDataPath)) {
        videos = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
      }
      videos.unshift(newVideo);
      fs.writeFileSync(localDataPath, JSON.stringify(videos, null, 2));
    }

    return NextResponse.json({ success: true, video: newVideo });
  } catch (error) {
    console.error('Error adding video:', error);
    return NextResponse.json({ error: 'Failed to add video' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...updates } = await req.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Video ID required' }, { status: 400 });
    }

    let videos: any[] = [];
    if (useKV) {
      videos = (await kv.get<any[]>('site_videos')) || [];
      const index = videos.findIndex((v: any) => v.id === id);
      if (index !== -1) {
        videos[index] = { ...videos[index], ...updates };
        await kv.set('site_videos', videos);
      }
    } else {
      if (fs.existsSync(localDataPath)) {
        videos = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
      }
      const index = videos.findIndex((v: any) => v.id === id);
      if (index !== -1) {
        videos[index] = { ...videos[index], ...updates };
        fs.writeFileSync(localDataPath, JSON.stringify(videos, null, 2));
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating video:', error);
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Video ID required' }, { status: 400 });
    }

    let videos: any[] = [];
    if (useKV) {
      videos = (await kv.get<any[]>('site_videos')) || [];
      videos = videos.filter((v: any) => v.id !== id);
      await kv.set('site_videos', videos);
    } else {
      if (fs.existsSync(localDataPath)) {
        videos = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
      }
      videos = videos.filter((v: any) => v.id !== id);
      fs.writeFileSync(localDataPath, JSON.stringify(videos, null, 2));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting video:', error);
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
  }
}
