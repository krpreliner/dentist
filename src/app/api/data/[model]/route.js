import { NextResponse } from 'next/server';
import { getJsonData, saveJsonData } from '../../../../lib/data';

export async function GET(request, { params }) {
  try {
    const { model } = params;
    const data = getJsonData(model);
    
    if (data === null) {
      return NextResponse.json({ error: 'File not found or invalid JSON' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request, { params }) {
  try {
    const { model } = params;
    const body = await request.json();
    
    await saveJsonData(model, body);
    
    return NextResponse.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
