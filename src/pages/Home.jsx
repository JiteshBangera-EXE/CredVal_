import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, FileCheck, Search, ArrowRight, Award, Terminal, Zap, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen relative">
      <div className="scanlines"></div>
      <div className="vignette"></div>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-6 border-b-2 border-retro-dark bg-[#e6e2d3]">
        <div className="retro-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants} className="inline-block border-2 border-retro-dark bg-retro-paper px-3 py-1 shadow-[3px_3px_0px_0px_rgba(44,26,14,1)]">
                <span className="font-retro text-xl tracking-widest text-retro-secondary">SYSTEM.ONLINE // V1.0</span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-7xl md:text-9xl font-retro leading-[0.85] text-retro-dark drop-shadow-sm">
                VERIFY <br />
                <span className="text-retro-primary">TRUST.</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl text-retro-dark/80 font-mono leading-relaxed border-l-4 border-retro-secondary pl-6 max-w-lg">
                The decentralized standard for issuing and verifying credentials. Secure. Immutable. 100% On-Chain.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 pt-4">
                <Link to="/generate" className="retro-btn group">
                  <span>START_ISSUING</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/verify" className="retro-btn retro-btn-outline group">
                  <Search className="w-5 h-5" />
                  <span>VERIFY_CERT</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Retro Graphic/Illustration Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="border-4 border-retro-dark bg-retro-dark p-2 shadow-[12px_12px_0px_0px_rgba(205,92,8,0.3)]">
                <div className="bg-[#e6e2d3] p-6 h-[400px] flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-retro-dark opacity-20 animate-pulse"></div>
                  
                  <div className="flex justify-between items-center border-b-2 border-retro-dark pb-4">
                    <div className="font-retro text-2xl">CERTIFICATE_ID_8842</div>
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                  </div>

                  <div className="space-y-4 font-mono text-sm py-8">
                    <div className="flex justify-between">
                      <span className="text-retro-muted">STATUS:</span>
                      <span className="bg-retro-secondary text-white px-2">VERIFIED</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-retro-muted">BLOCK:</span>
                      <span>#1928471</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-retro-muted">HASH:</span>
                      <span>0x7f...3a9c</span>
                    </div>
                    <div className="h-2 bg-retro-dark/10 w-full mt-4 overflow-hidden relative">
                      <div className="absolute top-0 left-0 h-full bg-retro-primary w-2/3"></div>
                    </div>
                  </div>

                  <div className="text-center font-retro text-4xl text-retro-dark/20 uppercase">
                    Blockchain<br/>Authority
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-retro-paper border-b-2 border-retro-dark">
        <div className="retro-container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-retro mb-6">ABOUT THE PROTOCOL</h2>
            <div className="w-24 h-2 bg-retro-primary mx-auto mb-8"></div>
            <p className="font-mono text-lg leading-relaxed">
              CredVal brings the physical reliability of paper certificates to the digital age using Ethereum smart contracts. We replace trust in institutions with cryptographic proof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="retro-card">
              <div className="absolute -top-4 -left-4 bg-retro-primary text-white p-2 border-2 border-retro-dark shadow-sm">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-retro mt-4 mb-4">DECENTRALIZED_LEDGER</h3>
              <p className="font-mono text-sm leading-relaxed">
                Every certificate issued is permanently recorded on the Sepolia testnet. No central server can delete or alter the records once deployed.
              </p>
            </div>
            <div className="retro-card">
              <div className="absolute -top-4 -left-4 bg-retro-secondary text-white p-2 border-2 border-retro-dark shadow-sm">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-retro mt-4 mb-4">UNIVERSAL_ACCESS</h3>
              <p className="font-mono text-sm leading-relaxed">
                Verification is open to the public. Any third party can independently verify the authenticity of a document without creating an account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Features Section */}
      <section className="py-20 px-6 bg-[#e6e2d3]">
        <div className="retro-container">
          <div className="flex items-center justify-between mb-12 border-b-2 border-retro-dark pb-4">
            <h2 className="text-4xl font-retro">SYSTEM_MODULES</h2>
            <div className="hidden md:block font-mono text-xs">MODULES_LOADED: 3/3</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: FileCheck, 
                title: "SMART_TEMPLATES", 
                desc: "Generate professional certificates instantly. Export as high-res PDF ready for print." 
              },
              { 
                icon: ShieldCheck, 
                title: "IMMUTABLE_PROOF", 
                desc: "SHA-256 hashing anchors documents to the chain. Mathematical certainty of origin." 
              },
              { 
                icon: Zap, 
                title: "INSTANT_VERIFY", 
                desc: "Drag-and-drop verification. Get results in milliseconds directly from the smart contract." 
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white border-2 border-retro-dark p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[8px_8px_0px_0px_rgba(205,92,8,1)] transition-shadow duration-300 group">
                <feature.icon className="w-10 h-10 text-retro-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-retro mb-4 border-b-2 border-retro-muted/30 pb-2 inline-block">{feature.title}</h3>
                <p className="font-mono text-sm leading-relaxed text-retro-dark/80">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
