import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

const useKV = !!process.env.KV_REST_API_URL;
const localDataPath = path.join(process.cwd(), 'data', 'content.json');

export async function GET() {
  try {
    let content = {};
    if (useKV) {
      content = await kv.get('site_content') || {};
    } else {
      if (fs.existsSync(localDataPath)) {
        content = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
      }
    }
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (useKV) {
      await kv.set('site_content', data);
    } else {
      if (!fs.existsSync(path.dirname(localDataPath))) {
        fs.mkdirSync(path.dirname(localDataPath), { recursive: true });
      }
      fs.writeFileSync(localDataPath, JSON.stringify(data, null, 2));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
