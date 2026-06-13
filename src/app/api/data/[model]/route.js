import { NextResponse } from 'next/server';
import { getJsonData, saveJsonData } from '../../../../lib/data';

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const { model } = resolvedParams;
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
    const resolvedParams = await params;
    const { model } = resolvedParams;
    const body = await request.json();
    
    console.log(`[Data API POST] Received request to update ${model}.json`);
    
    await saveJsonData(model, body);
    
    console.log(`[Data API POST Success] Successfully updated ${model}.json`);
    return NextResponse.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error(`[Data API POST Error] Failed to update:`, error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
