import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

const useKV = !!process.env.KV_REST_API_URL;
const localDataPath = path.join(process.cwd(), 'data', 'categories.json');

const defaultCategories = [
  'Refurbished Laptops',
  'New Laptops',
  'Desktop Computers',
  'Monitors',
  'Accessories',
  'Parts & Components',
  'Printers',
  'CCTV & Security',
  'Others'
];

if (!useKV && !fs.existsSync(path.dirname(localDataPath))) {
  fs.mkdirSync(path.dirname(localDataPath), { recursive: true });
}

export async function GET() {
  try {
    let categories: string[] = [];
    if (useKV) {
      categories = (await kv.get<string[]>('store_categories')) || [];
    } else {
      if (fs.existsSync(localDataPath)) {
        categories = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
      }
    }
    
    // Seed default categories if none exist
    if (categories.length === 0) {
      categories = defaultCategories;
      if (useKV) {
        await kv.set('store_categories', categories);
      } else {
        fs.writeFileSync(localDataPath, JSON.stringify(categories, null, 2));
      }
    }
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { category } = await req.json();
    if (!category || typeof category !== 'string') {
      return NextResponse.json({ error: 'Valid category string required' }, { status: 400 });
    }

    let categories: string[] = [];
    if (useKV) {
      categories = (await kv.get<string[]>('store_categories')) || defaultCategories;
      if (!categories.includes(category)) {
        categories.push(category);
        await kv.set('store_categories', categories);
      }
    } else {
      if (fs.existsSync(localDataPath)) {
        categories = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
      } else {
        categories = [...defaultCategories];
      }
      if (!categories.includes(category)) {
        categories.push(category);
        fs.writeFileSync(localDataPath, JSON.stringify(categories, null, 2));
      }
    }

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error('Error adding category:', error);
    return NextResponse.json({ error: 'Failed to add category' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    if (!category) {
      return NextResponse.json({ error: 'Category required' }, { status: 400 });
    }

    let categories: string[] = [];
    if (useKV) {
      categories = (await kv.get<string[]>('store_categories')) || defaultCategories;
      categories = categories.filter(c => c !== category);
      await kv.set('store_categories', categories);
    } else {
      if (fs.existsSync(localDataPath)) {
        categories = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
      } else {
        categories = [...defaultCategories];
      }
      categories = categories.filter(c => c !== category);
      fs.writeFileSync(localDataPath, JSON.stringify(categories, null, 2));
    }

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
