import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

const useKV = !!process.env.KV_REST_API_URL;
const localDataPath = path.join(process.cwd(), 'data', 'products.json');

// Ensure local data directory exists if not using KV
if (!useKV && !fs.existsSync(path.dirname(localDataPath))) {
  fs.mkdirSync(path.dirname(localDataPath), { recursive: true });
}

export async function GET() {
  try {
    let products = [];
    if (useKV) {
      products = await kv.get('refurbished_products') || [];
    } else {
      if (fs.existsSync(localDataPath)) {
        products = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
      }
    }
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validate required fields
    if (!data.title || !data.image || !data.specs) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newProduct = {
      id: Date.now().toString(),
      title: data.title,
      image: data.image,
      specs: data.specs,
      status: data.status || 'available', // 'available' or 'sold'
    };

    let products: any[] = [];
    if (useKV) {
      products = await kv.get('refurbished_products') || [];
      if (!Array.isArray(products)) products = [];
      products.unshift(newProduct); // Add to beginning
      await kv.set('refurbished_products', products);
    } else {
      if (fs.existsSync(localDataPath)) {
        products = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
      }
      products.unshift(newProduct);
      fs.writeFileSync(localDataPath, JSON.stringify(products, null, 2));
    }

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...updates } = await req.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    let products: any[] = [];
    if (useKV) {
      products = await kv.get('refurbished_products') || [];
      const index = products.findIndex((p: any) => p.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updates };
        await kv.set('refurbished_products', products);
      }
    } else {
      if (fs.existsSync(localDataPath)) {
        products = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
      }
      const index = products.findIndex((p: any) => p.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updates };
        fs.writeFileSync(localDataPath, JSON.stringify(products, null, 2));
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    let products: any[] = [];
    if (useKV) {
      products = await kv.get('refurbished_products') || [];
      products = products.filter((p: any) => p.id !== id);
      await kv.set('refurbished_products', products);
    } else {
      if (fs.existsSync(localDataPath)) {
        products = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
      }
      products = products.filter((p: any) => p.id !== id);
      fs.writeFileSync(localDataPath, JSON.stringify(products, null, 2));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
