'use client';

import { useState } from 'react';

import CodeRenderer from '@/components/code-renderer';
import PDFExtractForm from '@/components/pdf-extract-form';
import { PDFData } from '@/lib/types';

export default function Home() {
  const [data, setData] = useState<PDFData[]>([]);

  return (
    <div className='flex p-3'>
      <PDFExtractForm onDataReceive={(e: PDFData[]) => setData(e)} />
      <CodeRenderer data={data} />
    </div>
  );
}
