import extractTemplate1 from '@/actions/extract-template-1';
import { NextResponse } from 'next/server';
import { PDFExtract } from 'pdf.js-extract';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const pdfExtract = new PDFExtract();

    // transform pdf into buffer in order to extract it
    const pdfFile = formData.get('file') as File;
    const pdfArrayBuffer = await pdfFile.arrayBuffer();
    const pdfBuffer = Buffer.from(pdfArrayBuffer);

    const pdf = await pdfExtract.extractBuffer(pdfBuffer);
    const extractedJSON = extractTemplate1(pdf);

    return NextResponse.json(extractedJSON);
  } catch (error) {
    console.log('[CODE_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
