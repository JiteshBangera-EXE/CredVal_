import { Award, ShieldCheck } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// Fixed resolution for the templates to ensure consistent look
const BASE_WIDTH = 800;
const BASE_HEIGHT = 566; // approx A4 landscape ratio (1.414)

const RetroTemplate = ({ data }) => (
  <div className="w-[800px] h-[566px] bg-[#f5f5dc] p-8 flex flex-col items-center justify-between text-[#2c1a0e] relative border-[12px] border-[#2c1a0e]">
    <div className="absolute inset-4 border border-[#2c1a0e] pointer-events-none"></div>
    
    <div className="text-center mt-8 z-10">
      <h2 className="text-3xl font-serif font-bold tracking-wider mb-2 uppercase">{data.issuer || 'ISSUER NAME'}</h2>
      <p className="font-mono text-sm tracking-widest">OFFICIALLY CERTIFIES THAT</p>
    </div>

    <div className="text-center z-10">
      <h1 className="text-6xl font-serif italic text-[#cd5c08] mb-4">{data.name || 'RECIPIENT NAME'}</h1>
      <p className="font-mono text-sm">HAS SUCCESSFULLY COMPLETED THE COURSE</p>
    </div>

    <div className="text-center z-10">
      <h3 className="text-3xl font-serif font-bold uppercase border-b-2 border-[#2c1a0e] pb-2 inline-block">
        {data.course || 'COURSE TITLE'}
      </h3>
    </div>

    <div className="w-full flex justify-between items-end z-10 mt-8 px-8">
      <div className="text-center">
        <p className="font-mono text-xs mb-1">ISSUED ON:</p>
        <p className="font-serif font-bold text-lg border-b border-[#2c1a0e] min-w-[120px]">
          {data.date || 'YYYY-MM-DD'}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full border-2 border-[#cd5c08] flex items-center justify-center text-[#cd5c08] mb-1">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <span className="text-[10px] text-[#cd5c08] font-mono tracking-widest">VERIFIED</span>
      </div>
    </div>
  </div>
);

const ModernTemplate = ({ data }) => (
  <div className="w-[800px] h-[566px] bg-white flex relative overflow-hidden">
    {/* Sidebar */}
    <div className="w-1/4 h-full bg-blue-600 flex flex-col justify-end p-6 text-white">
       <div className="mt-auto">
         <p className="text-xs opacity-70 uppercase tracking-widest mb-1">Date</p>
         <p className="text-lg font-bold">{data.date || 'YYYY-MM-DD'}</p>
       </div>
    </div>
    
    {/* Content */}
    <div className="flex-1 p-10 flex flex-col justify-center">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-blue-600 uppercase tracking-tight leading-none mb-2">
          {data.issuer || 'ISSUER'}
        </h2>
        <p className="text-slate-500 uppercase tracking-widest text-sm">Certificate of Completion</p>
      </div>

      <div className="mb-12">
        <h1 className="text-6xl font-bold text-slate-800 mb-4">{data.name || 'Recipient Name'}</h1>
        <p className="text-lg text-slate-600">
          Has successfully mastered the curriculum of:
        </p>
        <h3 className="text-3xl font-bold text-blue-600 mt-2">
          {data.course || 'Course Title'}
        </h3>
      </div>

      <div className="flex items-center gap-4 text-slate-400 text-xs uppercase tracking-widest">
        <div className="h-px bg-slate-200 flex-1"></div>
        <span>Verified Credential</span>
        <div className="h-px bg-slate-200 flex-1"></div>
      </div>
    </div>

    {/* Decorative Accent */}
    <div className="absolute top-0 right-0 w-4 h-full bg-blue-600/10"></div>
  </div>
);

const ClassicTemplate = ({ data }) => (
  <div className="w-[800px] h-[566px] bg-white p-6 relative flex flex-col items-center justify-center text-center">
    {/* Borders */}
    <div className="absolute inset-4 border-[3px] border-[#d4af37]"></div>
    <div className="absolute inset-6 border border-[#d4af37]"></div>

    <div className="z-10 space-y-8 max-w-[80%]">
      <div className="mb-8">
        <h2 className="text-4xl font-serif font-bold text-black uppercase tracking-wide">
          {data.issuer || 'ISSUER NAME'}
        </h2>
      </div>

      <div className="space-y-4">
        <p className="font-serif italic text-2xl text-gray-600">This certifies that</p>
        <h1 className="text-6xl font-serif font-bold text-[#d4af37]">
          {data.name || 'Recipient Name'}
        </h1>
        <p className="font-serif text-xl text-gray-800">
          has completed the requirements for
        </p>
        <h3 className="text-4xl font-serif font-bold text-black border-b border-gray-300 pb-4">
          {data.course || 'Course Title'}
        </h3>
      </div>

      <div className="flex justify-between items-end pt-8 w-full px-8">
        <div>
           <p className="font-serif text-2xl border-b border-black min-w-[150px] pb-1">
             {data.date || 'Date'}
           </p>
           <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Date Issued</p>
        </div>
        
        <div className="relative">
          <div className="w-24 h-24 bg-[#d4af37] rounded-full flex items-center justify-center text-white shadow-md">
            <Award className="w-12 h-12" />
          </div>
          <p className="text-[10px] text-[#d4af37] font-bold mt-2 uppercase tracking-widest">Official Seal</p>
        </div>
      </div>
    </div>
  </div>
);

const CertificatePreview = ({ data, template }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        // Calculate scale to fit the parent width
        const newScale = parentWidth / BASE_WIDTH;
        setScale(newScale);
      }
    };

    // Initial calculation
    updateScale();

    // Observe resizing
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full aspect-[1.414] shadow-2xl relative overflow-hidden bg-gray-100"
    >
      <div 
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top left',
          width: `${BASE_WIDTH}px`,
          height: `${BASE_HEIGHT}px`
        }}
      >
        {template === 'retro' && <RetroTemplate data={data} />}
        {template === 'modern' && <ModernTemplate data={data} />}
        {template === 'classic' && <ClassicTemplate data={data} />}
      </div>
    </div>
  );
};

export default CertificatePreview;
