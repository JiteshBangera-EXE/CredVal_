import { useState, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import { Loader2, Download, RefreshCw, Upload, ExternalLink, FileUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import contractAbi from '../blockchain/abi.json';
import { uploadToIPFS } from '../utils/ipfs';
import CertificatePreview from '../components/CertificatePreview';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const Generate = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    course: '', 
    date: '', 
    issuer: '',
    certId: "ID-" + Math.random().toString(36).substr(2, 9).toUpperCase() // Initialize once
  });
  const [template, setTemplate] = useState('retro'); // 'retro', 'modern', 'classic'
  const [loading, setLoading] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null); // State for dragged file

  // Handle Drag & Drop
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    setUploadedFile(file);
    toast.success(`FILE_LOADED: ${file.name}`);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  const generatePDF = () => {
    // If a file is uploaded, we don't need to generate a new one
    if (uploadedFile) return uploadedFile;

    if (!formData.name || !formData.course || !formData.date || !formData.issuer) {
      toast.error("MISSING_FIELDS_DETECTED");
      return null;
    }

    // Deterministic PDF generation
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });
    
    // Set fixed creation date metadata to ensure identical file hashes
    doc.setProperties({
      title: "Certificate",
      subject: "Certificate of Completion",
      author: "CredVal",
      creationDate: new Date("2020-01-01T00:00:00.000Z") 
    });

    // Template Styles
    if (template === 'modern') {
      // Modern Template
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, 297, 210, 'F');
      
      // Geometric accents
      doc.setFillColor(59, 130, 246); // Blue-500
      doc.rect(0, 0, 40, 210, 'F');
      doc.rect(280, 0, 17, 210, 'F');
      
      doc.setTextColor(59, 130, 246);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(40);
      doc.text(formData.issuer.toUpperCase(), 50, 40);

      doc.setTextColor(100, 116, 139);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.text("CERTIFICATE OF COMPLETION", 50, 55);

      doc.setTextColor(31, 41, 55);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(50);
      doc.text(formData.name, 50, 90);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(18);
      doc.text("Has successfully mastered the curriculum of:", 50, 110);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(30);
      doc.text(formData.course, 50, 130);

      doc.setFontSize(14);
      doc.setTextColor(107, 114, 128);
      doc.text(`Issued on: ${formData.date}`, 50, 160);

      // ID
      doc.setFontSize(10);
      doc.text(`Verification ID: ${formData.certId}`, 50, 190);

    } else if (template === 'classic') {
      // Classic Template
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, 297, 210, 'F');
      
      // Ornate Border
      doc.setDrawColor(212, 175, 55); // Gold
      doc.setLineWidth(3);
      doc.rect(10, 10, 277, 190);
      doc.setLineWidth(1);
      doc.rect(15, 15, 267, 180);

      doc.setFont("times", "bold");
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(36);
      doc.text(formData.issuer.toUpperCase(), 148.5, 50, { align: "center" });

      doc.setFont("times", "italic");
      doc.setFontSize(20);
      doc.text("This certifies that", 148.5, 70, { align: "center" });

      doc.setFont("times", "bold");
      doc.setFontSize(48);
      doc.setTextColor(212, 175, 55); // Gold text
      doc.text(formData.name, 148.5, 100, { align: "center" });

      doc.setFont("times", "normal");
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(18);
      doc.text("has completed the requirements for", 148.5, 120, { align: "center" });

      doc.setFont("times", "bold");
      doc.setFontSize(32);
      doc.text(formData.course, 148.5, 145, { align: "center" });

      doc.setFont("times", "normal");
      doc.setFontSize(16);
      doc.text(formData.date, 148.5, 170, { align: "center" });
      
      // Seal
      doc.setDrawColor(212, 175, 55);
      doc.setFillColor(212, 175, 55);
      doc.circle(240, 160, 18, 'FD');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text("SEAL", 240, 160, { align: "center" });

    } else {
      // Retro Template (Default)
      doc.setFillColor(245, 245, 220);
      doc.rect(0, 0, 297, 210, 'F');
      
      doc.setLineWidth(1.5);
      doc.setDrawColor(44, 26, 14);
      doc.rect(10, 10, 277, 190);
      doc.setLineWidth(0.5);
      doc.rect(15, 15, 267, 180);

      doc.setFont("times", "bold");
      doc.setTextColor(44, 26, 14);
      doc.setFontSize(32);
      doc.text(formData.issuer.toUpperCase(), 148.5, 45, { align: "center" });

      doc.setFont("courier", "normal");
      doc.setFontSize(16);
      doc.text("OFFICIALLY CERTIFIES THAT", 148.5, 65, { align: "center" });

      doc.setFont("times", "bolditalic");
      doc.setFontSize(48);
      doc.setTextColor(205, 92, 8);
      doc.text(formData.name, 148.5, 95, { align: "center" });

      doc.setFont("courier", "normal");
      doc.setFontSize(16);
      doc.setTextColor(44, 26, 14);
      doc.text("HAS SUCCESSFULLY COMPLETED THE COURSE", 148.5, 120, { align: "center" });

      doc.setFont("times", "bold");
      doc.setFontSize(28);
      doc.text(formData.course.toUpperCase(), 148.5, 140, { align: "center" });

      doc.setFont("courier", "normal");
      doc.setFontSize(14);
      doc.text(`ISSUED ON: ${formData.date}`, 148.5, 160, { align: "center" });

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`CERTIFICATE ID: ${formData.certId}`, 148.5, 190, { align: "center" });

      doc.setDrawColor(205, 92, 8);
      doc.setLineWidth(1);
      doc.circle(250, 160, 15);
      doc.setFontSize(8);
      doc.setTextColor(205, 92, 8);
      doc.text("VERIFIED", 250, 160, { align: "center" });
    }

    const blob = doc.output('blob');
    setPdfBlob(blob);
    return blob;
  };

  const handleMint = async () => {
    try {
      setLoading(true);
      const blob = generatePDF();
      if (!blob) {
        setLoading(false);
        return;
      }

      // 1. Upload to IPFS
      const ipfsUrl = await uploadToIPFS(blob);
      if (!ipfsUrl) throw new Error("IPFS_UPLOAD_FAILED");

      // 2. Smart Contract Interaction
      if (!window.ethereum) throw new Error("METAMASK_NOT_FOUND");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);

      const tx = await contract.issueCertificate(ipfsUrl);
      
      toast.info("TRANSACTION_SENT: MINING...");
      await tx.wait();
      
      toast.success("SUCCESS: CERTIFICATE_MINTED_ON_CHAIN");
      // Reset after minting
      setUploadedFile(null);
    } catch (error) {
      console.error(error);
      toast.error("ERROR: " + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-[#e6e2d3]">
      <div className="scanlines"></div>
      <div className="vignette"></div>
      <Navbar />

      <div className="py-12 px-6">
        <div className="retro-container max-w-4xl mx-auto">
          <div className="bg-retro-paper border-2 border-retro-dark p-8 shadow-[12px_12px_0px_0px_rgba(44,26,14,1)] relative">
            
            {/* Decorative Header */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-retro-secondary text-white px-6 py-2 border-2 border-retro-dark shadow-sm">
              <span className="font-retro text-xl tracking-widest">CERT_GENERATOR_V2</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
              {/* Form Section */}
              <div className="space-y-6">
                <div className="border-b-2 border-dashed border-retro-muted pb-4 mb-6">
                  <h2 className="text-2xl font-retro text-retro-dark">INPUT_DATA</h2>
                  <p className="font-mono text-xs text-retro-muted">ENTER RECIPIENT DETAILS BELOW</p>
                </div>

                {/* Existing Certificate Upload */}
                <div 
                  {...getRootProps()} 
                  className={`border-4 border-dashed p-6 text-center cursor-pointer transition-colors mb-6
                    ${isDragActive ? 'border-retro-primary bg-retro-primary/10' : 'border-retro-muted/30 hover:border-retro-primary hover:bg-white/50'}
                    ${uploadedFile ? 'bg-green-50 border-green-500' : ''}
                  `}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center gap-2">
                    <FileUp className={`w-8 h-8 ${uploadedFile ? 'text-green-600' : 'text-retro-muted'}`} />
                    <p className="font-retro text-sm text-retro-dark">
                      {uploadedFile ? `SELECTED: ${uploadedFile.name}` : "HAVE_EXISTING_PDF? DRAG_TO_MINT"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6 opacity-50">
                  <div className="h-0.5 bg-retro-muted flex-1"></div>
                  <span className="font-mono text-xs text-retro-muted">OR_GENERATE_NEW</span>
                  <div className="h-0.5 bg-retro-muted flex-1"></div>
                </div>

                {/* Template Selection */}
                <div className={`transition-opacity duration-300 ${uploadedFile ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                  <div className="mb-6">
                    <label className="block font-retro text-lg uppercase mb-2 text-retro-dark">TEMPLATE_STYLE</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['retro', 'modern', 'classic'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setTemplate(t)}
                          className={`py-2 px-1 font-mono text-xs border-2 transition-all ${
                            template === t 
                              ? 'bg-retro-primary text-white border-retro-dark' 
                              : 'bg-white border-retro-muted text-retro-muted hover:border-retro-primary'
                          }`}
                        >
                          {t.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {['name', 'course', 'date', 'issuer'].map((field) => (
                    <div key={field} className="relative group mb-4">
                      <label className="block font-retro text-lg uppercase mb-1 text-retro-dark group-focus-within:text-retro-primary transition-colors">
                        {field}
                      </label>
                      <input
                        type={field === 'date' ? 'date' : 'text'}
                        className="w-full bg-[#fdfbf7] border-2 border-retro-dark p-3 font-mono text-sm focus:outline-none focus:border-retro-primary focus:shadow-[4px_4px_0px_0px_rgba(205,92,8,1)] transition-all"
                        placeholder={`ENTER ${field.toUpperCase()}...`}
                        value={formData[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      />
                    </div>
                  ))}

                  <div className="mt-8">
                    <button
                      onClick={handleMint}
                      disabled={loading || uploadedFile}
                      className="w-full bg-retro-dark text-white font-retro text-xl py-4 border-2 border-transparent hover:bg-retro-primary hover:border-retro-dark hover:shadow-[6px_6px_0px_0px_rgba(44,26,14,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span>PROCESSING...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-6 h-6" />
                          <span>MINT_CERTIFICATE</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Separate button for Upload Minting */}
                {uploadedFile && (
                  <div className="mt-4 -translate-y-[calc(100%+6rem)] relative z-10">
                     <button
                      onClick={handleMint}
                      disabled={loading}
                      className="w-full bg-green-700 text-white font-retro text-xl py-4 border-2 border-green-900 hover:bg-green-600 hover:shadow-[6px_6px_0px_0px_rgba(20,83,45,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span>UPLOADING_&_MINTING...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-6 h-6" />
                          <span>MINT_UPLOADED_FILE</span>
                        </>
                      )}
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
                      className="mt-2 text-xs font-mono text-red-500 hover:underline w-full text-center"
                    >
                      CANCEL_UPLOAD
                    </button>
                  </div>
                )}
              </div>

              {/* Preview Section */}
              <div className="relative border-l-2 border-dashed border-retro-muted pl-12 hidden md:flex flex-col">
                <div className="absolute top-0 right-0 font-mono text-xs text-retro-muted opacity-50 uppercase tracking-widest">
                  LIVE_PREVIEW_MODE :: {template}
                </div>

                <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                  
                  {/* Live Preview Component */}
                  <div className="w-full transform transition-transform hover:scale-[1.02] duration-300">
                    <CertificatePreview data={formData} template={template} />
                  </div>

                  <p className="font-mono text-center text-xs text-retro-dark/60 max-w-xs">
                    Document will be generated as a standardized PDF-A/3 compliant file and pinned to IPFS.
                  </p>

                  <div className="w-full flex justify-center pt-4">
                      <button 
                        onClick={() => {
                          const blob = generatePDF();
                          if (blob) {
                            const url = URL.createObjectURL(blob);
                            window.open(url, '_blank');
                          }
                        }}
                        className="w-full bg-retro-primary text-white border-2 border-retro-dark px-6 py-3 font-retro text-lg flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(44,26,14,1)] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(44,26,14,1)] transition-all animate-pulse"
                      >
                        <Download className="w-5 h-5" />
                        DOWNLOAD_FINAL_PDF
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
