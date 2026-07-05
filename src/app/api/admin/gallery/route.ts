import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { del } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const useKV = !!process.env.KV_REST_API_URL;
const localDataPath = path.join(process.cwd(), 'data', 'gallery.json');

if (!useKV && !fs.existsSync(path.dirname(localDataPath))) {
  fs.mkdirSync(path.dirname(localDataPath), { recursive: true });
}

export async function GET() {
  try {
    let gallery: any[] = [];
    if (useKV) {
      gallery = (await kv.get<any[]>('site_gallery')) || [];
    } else {
      if (fs.existsSync(localDataPath)) {
        gallery = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
      }
    }
    return NextResponse.json(gallery);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.image) {
      return NextResponse.json({ error: 'Missing image URL' }, { status: 400 });
    }

    const newItem = {
      id: Date.now().toString(),
      image: data.image,
      caption: data.caption || '',
    };

    let gallery: any[] = [];
    if (useKV) {
      gallery = (await kv.get<any[]>('site_gallery')) || [];
      gallery.unshift(newItem); // newest first
      await kv.set('site_gallery', gallery);
    } else {
      if (fs.existsSync(localDataPath)) {
        gallery = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
      }
      gallery.unshift(newItem);
      fs.writeFileSync(localDataPath, JSON.stringify(gallery, null, 2));
    }

    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error('Error adding gallery item:', error);
    return NextResponse.json({ error: 'Failed to add gallery item' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Item ID required' }, { status: 400 });
    }

    let gallery: any[] = [];
    let imageToDelete: string | undefined;

    if (useKV) {
      gallery = (await kv.get<any[]>('site_gallery')) || [];
      const itemToDelete = gallery.find((g: any) => g.id === id);
      if (itemToDelete) imageToDelete = itemToDelete.image;
      
      gallery = gallery.filter((g: any) => g.id !== id);
      await kv.set('site_gallery', gallery);
    } else {
      if (fs.existsSync(localDataPath)) {
        gallery = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
      }
      const itemToDelete = gallery.find((g: any) => g.id === id);
      if (itemToDelete) imageToDelete = itemToDelete.image;
      
      gallery = gallery.filter((g: any) => g.id !== id);
      fs.writeFileSync(localDataPath, JSON.stringify(gallery, null, 2));
    }

    if (imageToDelete && imageToDelete.includes('public.blob.vercel-storage.com')) {
      try {
        await del(imageToDelete);
      } catch (err) {
        console.error('Failed to delete image from blob:', err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
