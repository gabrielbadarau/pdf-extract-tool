import { PDFData } from '@/lib/types';

interface CodeRendererProps {
  data: PDFData[];
}

const CodeRenderer: React.FC<CodeRendererProps> = ({ data }) => {
  return (
    <pre className='ml-4 rounded-md bg-slate-950 p-4 w-[80vw] h-[95vh] overflow-auto'>
      <code className='text-white' style={{ whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(data, null, 2)}
      </code>
    </pre>
  );
};

export default CodeRenderer;
