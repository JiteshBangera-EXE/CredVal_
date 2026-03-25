import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useDropzone } from 'react-dropzone';
import { ShieldCheck, Search, ShieldX, Scan, AlertTriangle, FileSearch, ExternalLink, UploadCloud } from 'lucide-react';
import Navbar from '../components/Navbar';
import contractAbi from '../blockchain/abi.json';
import { getIpfsUrl, uploadToIPFS } from '../utils/ipfs';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const Verify = () => {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const verifyOnChain = async (hash) => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      if (!window.ethereum) throw new Error("METAMASK_NOT_FOUND");
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, provider);

      const data = await contract.verifyCertificate(hash);
      
      if (!data[2]) { // isValid boolean
         throw new Error("INVALID_CERTIFICATE_DATA");
      }

      setResult({
        issuer: data[0],
        issueDate: new Date(data[1] * 1000).toLocaleDateString(),
        isValid: data[2],
        hash: hash
      });

    } catch (err) {
      console.error(err);
      setError("CERTIFICATE_NOT_FOUND_OR_INVALID");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const file = acceptedFiles[0];
      // Note: We upload to IPFS to get the exact hash used during minting
      // This ensures compatibility with the pinning service used by the generator
      const ipfsHash = await uploadToIPFS(file);
      setCertId(ipfsHash);
      await verifyOnChain(ipfsHash);
    } catch (err) {
      console.error(err);
      setError("FILE_PROCESSING_FAILED: " + err.message);
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  const handleManualVerify = (e) => {
    e.preventDefault();
    if (!certId) return;
    verifyOnChain(certId);
  };

  return (
    <div className="min-h-screen relative bg-[#e6e2d3]">
      <div className="scanlines"></div>
      <div className="vignette"></div>
      <Navbar />

      <div className="py-20 px-6">
        <div className="retro-container max-w-2xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-retro mb-4">VERIFY_CREDENTIALS</h1>
            <p className="font-mono text-retro-dark/80">
              DRAG & DROP A CERTIFICATE OR ENTER ITS IPFS HASH TO VALIDATE.
            </p>
          </div>

          <div className="bg-retro-paper border-2 border-retro-dark p-8 shadow-[12px_12px_0px_0px_rgba(44,26,14,1)] relative overflow-hidden">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-retro-dark"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-retro-dark"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-retro-dark"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-retro-dark"></div>

            {/* Drag and Drop Zone */}
            <div 
              {...getRootProps()} 
              className={`mb-8 border-4 border-dashed p-8 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-retro-primary bg-retro-primary/10' : 'border-retro-muted/50 hover:border-retro-primary hover:bg-white/50'}
              `}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <UploadCloud className={`w-12 h-12 ${isDragActive ? 'text-retro-primary' : 'text-retro-muted'}`} />
                <p className="font-retro text-xl text-retro-dark">
                  {isDragActive ? "DROP_FILE_HERE" : "DRAG_PDF_HERE_TO_SCAN"}
                </p>
                <p className="font-mono text-xs text-retro-muted">
                  SUPPORTS .PDF FILES ONLY
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 my-6">
              <div className="h-0.5 bg-retro-muted/30 flex-1"></div>
              <span className="font-mono text-xs text-retro-muted">OR_ENTER_HASH</span>
              <div className="h-0.5 bg-retro-muted/30 flex-1"></div>
            </div>

            <form onSubmit={handleManualVerify} className="space-y-6 relative z-10">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    placeholder="ENTER_IPFS_HASH..."
                    className="w-full bg-[#fdfbf7] border-2 border-retro-dark p-4 font-mono text-lg focus:outline-none focus:border-retro-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-retro-muted w-5 h-5" />
                </div>
                <button 
                  type="submit"
                  disabled={loading || !certId}
                  className="bg-retro-dark text-white font-retro px-8 py-4 border-2 border-transparent hover:bg-retro-primary hover:border-retro-dark hover:shadow-[4px_4px_0px_0px_rgba(44,26,14,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
                >
                  {loading ? 'SCANNING...' : 'VERIFY'}
                </button>
              </div>
            </form>

            {/* Results Display */}
            <div className="mt-12 min-h-[200px] border-t-2 border-dashed border-retro-muted pt-8">
              {loading && (
                <div className="flex flex-col items-center justify-center space-y-4 animate-pulse">
                  <Scan className="w-12 h-12 text-retro-primary" />
                  <span className="font-retro text-xl">QUERYING_BLOCKCHAIN...</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border-2 border-red-500 p-6 flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-retro text-xl text-red-700 mb-2">VERIFICATION_FAILED</h3>
                    <p className="font-mono text-sm text-red-600">{error}</p>
                  </div>
                </div>
              )}

              {result && (
                <div className="bg-green-50 border-2 border-green-600 p-6 shadow-[8px_8px_0px_0px_rgba(22,163,74,0.2)]">
                  <div className="flex items-center gap-4 mb-6 border-b-2 border-green-200 pb-4">
                    <ShieldCheck className="w-10 h-10 text-green-700" />
                    <h3 className="font-retro text-2xl text-green-800">VALID_CERTIFICATE</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 font-mono text-sm">
                    <div>
                      <span className="text-green-600 block mb-1">DOCUMENT:</span>
                      <a 
                        href={getIpfsUrl(result.hash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-retro-primary hover:underline font-bold text-lg flex items-center gap-2"
                      >
                        VIEW_PDF <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div>
                      <span className="text-green-600 block mb-1">DATE_ISSUED:</span>
                      <span className="text-green-900 font-bold text-lg">{result.issueDate}</span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-green-600 block mb-1">ISSUING_AUTHORITY:</span>
                      <span className="text-green-900 font-bold text-lg">{result.issuer}</span>
                    </div>
                  </div>
                </div>
              )}

              {!loading && !result && !error && (
                <div className="flex flex-col items-center justify-center text-retro-muted opacity-50 space-y-2 mt-8">
                  <FileSearch className="w-12 h-12" />
                  <span className="font-mono text-sm">Waiting for input...</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;

