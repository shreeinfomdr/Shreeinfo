import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { kv } from '@vercel/kv';

const dataFilePath = path.join(process.cwd(), 'data', 'testimonials.json');

// Helper to determine if we should use Vercel KV or local file system
const useKV = !!process.env.KV_REST_API_URL;

export async function GET() {
  try {
    if (useKV) {
      console.log('Using Vercel KV for Testimonials');
      const testimonials = await kv.get('testimonials');
      return NextResponse.json(testimonials || []);
    } else {
      console.log('Using Local JSON for Testimonials');
      if (fs.existsSync(dataFilePath)) {
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        const testimonials = JSON.parse(fileContents);
        return NextResponse.json(testimonials);
      }
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error('Error reading testimonials:', error);
    return NextResponse.json({ error: 'Failed to read testimonials' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, text, rating } = await req.json();

    const newTestimonial = {
      id: Date.now().toString(),
      name,
      text,
      rating: Number(rating) || 5,
      image: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/95331757321876518.jpg",
      status: "approved"
    };

    if (useKV) {
      let testimonials: any = await kv.get('testimonials') || [];
      // If it's not an array for some reason, reset it
      if (!Array.isArray(testimonials)) testimonials = [];
      testimonials.push(newTestimonial);
      await kv.set('testimonials', testimonials);
    } else {
      let testimonials = [];
      if (fs.existsSync(dataFilePath)) {
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        testimonials = JSON.parse(fileContents);
      }
      testimonials.push(newTestimonial);
      fs.writeFileSync(dataFilePath, JSON.stringify(testimonials, null, 2));
    }

    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    console.error('Error saving testimonial:', error);
    return NextResponse.json({ success: false, error: 'Failed to save testimonial' }, { status: 500 });
  }
}
