import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'testimonials.json');

export async function GET() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      const testimonials = JSON.parse(fileContents);
      return NextResponse.json(testimonials);
    }
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error reading testimonials:', error);
    return NextResponse.json({ error: 'Failed to read testimonials' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, text, rating } = await req.json();

    let testimonials = [];
    if (fs.existsSync(dataFilePath)) {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      testimonials = JSON.parse(fileContents);
    }

    const newTestimonial = {
      id: Date.now().toString(),
      name,
      text,
      rating: Number(rating) || 5,
      image: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/95331757321876518.jpg", // default logo as image
      status: "approved" // In production, might want "pending" to review first
    };

    testimonials.push(newTestimonial);
    fs.writeFileSync(dataFilePath, JSON.stringify(testimonials, null, 2));

    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    console.error('Error saving testimonial:', error);
    return NextResponse.json({ success: false, error: 'Failed to save testimonial' }, { status: 500 });
  }
}
