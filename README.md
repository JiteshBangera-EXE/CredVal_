# CredVal - Blockchain Credentials Verification Platform

A modern, decentralized credentials verification platform built on blockchain technology. CredVal enables users to securely generate, issue, and verify digital credentials on the Ethereum blockchain using smart contracts and IPFS for immutable storage.

## 🎯 Overview

CredVal is a comprehensive solution for managing blockchain-based credentials. It provides a user-friendly interface to:
- **Generate** digital credentials with blockchain backing
- **Verify** credential authenticity on-chain
- **Store** credentials securely on IPFS
- **Manage** multiple credentials efficiently

This platform leverages the Sepolia testnet for development and testing, making it ideal for educational institutions, professional certifications, and digital identity management.

## ✨ Features

- **Blockchain Integration**: Built with Ethereum smart contracts for immutable credential records
- **IPFS Storage**: Decentralized storage for credential metadata via Pinata
- **User-Friendly Interface**: Intuitive React-based UI with Ant Design components
- **Real-time Verification**: Quick and reliable credential verification
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **PDF Export**: Generate downloadable credential documents
- **Canvas Support**: Advanced credential visualization with Konva
- **State Management**: Efficient state handling with Jotai

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - UI framework
- **Vite 8.0** - Build tool with HMR
- **Tailwind CSS 4.2** - Styling
- **Ant Design 6.3** - UI components
- **React Router 7.13** - Client-side routing
- **Framer Motion 12.38** - Animations

### Blockchain & Web3
- **Ethers.js 5.4.5** - Ethereum library
- **Sepolia Testnet** - Development network
- **Smart Contracts** - Credential verification logic

### Storage & Data
- **Pinata IPFS** - Distributed file storage
- **jsPDF 4.2** - PDF generation
- **React Konva 19.2** - Canvas rendering

### Developer Tools
- **ESLint 9.39** - Code quality
- **PostCSS 8.5** - CSS processing
- **Node Modules** - Dependency management

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- MetaMask or compatible Web3 wallet (for blockchain interaction)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd credval
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the following variables in `.env`:
   ```env
   VITE_PRIVATE_KEY=your_private_key_here
   VITE_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR-PROJECT-ID
   VITE_CONTRACT_ADDRESS=0x309fbACdEFCDF33e28548bc49efa05E76d1b77C8
   VITE_PINATA_API_KEY=your_api_key
   VITE_PINATA_SECRET_KEY=your_secret_key
   VITE_ETHERSCAN_API_KEY=your_etherscan_key
   ```

## 🚀 Getting Started

### Development Mode
```bash
npm run dev
```
The application will start at `http://localhost:5173` with hot module replacement enabled.

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally before deployment.

### Lint Code
```bash
npm run lint
```
Run ESLint to check code quality and consistency.

## 📋 Project Structure

```
credval/
├── src/
│   ├── blockchain/          # Smart contract ABIs and blockchain utilities
│   ├── components/          # Reusable React components
│   ├── pages/               # Page components (Home, Generate, Verify)
│   ├── utils/               # Utility functions and helpers
│   ├── App.jsx              # Main App component
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── postcss.config.js        # PostCSS configuration
├── eslint.config.js         # ESLint configuration
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
└── package.json             # Project dependencies and scripts
```

## 🔑 Key Functionalities

### 1. Generate Credentials
- Create new digital credentials
- Add metadata and credential details
- Store on IPFS via Pinata
- Record on blockchain

### 2. Verify Credentials
- Search for credentials by identifier
- Verify authenticity on blockchain
- Display credential details
- Validate credential status

### 3. Blockchain Integration
- Interact with Ethereum smart contracts
- Sign transactions with private key
- Record credentials on Sepolia testnet
- Query contract state

### 4. IPFS Storage
- Upload credential metadata
- Retrieve credential information
- Ensure data immutability
- Support distributed access

## 🔐 Security Considerations

- **Private Keys**: Never commit private keys to version control
- **Environment Variables**: Use `.env` files for sensitive configuration
- **Smart Contracts**: Deployed on Sepolia testnet for safety
- **IPFS**: Immutable storage ensures data integrity
- **Wallet Integration**: Use MetaMask for secure transactions

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_PRIVATE_KEY` | Private key for transaction signing |
| `VITE_SEPOLIA_RPC_URL` | RPC endpoint for Sepolia testnet |
| `VITE_CONTRACT_ADDRESS` | Deployed smart contract address |
| `VITE_PINATA_API_KEY` | Pinata API key for IPFS |
| `VITE_PINATA_SECRET_KEY` | Pinata secret key |
| `VITE_ETHERSCAN_API_KEY` | Etherscan API for contract verification |

## 🧪 Testing

While formal unit tests are configured via ESLint, perform these manual tests:
1. Generate a test credential
2. Verify it on the blockchain
3. Export credential as PDF
4. Test on mobile device
5. Verify IPFS storage

## 🌐 Supported Networks

- **Sepolia Testnet** - Primary development network
- Easily configurable for mainnet deployment

## 📖 API Documentation

### Smart Contract Functions
- `issueCredential()` - Issue new credential
- `verifyCredential()` - Verify credential authenticity
- `getCredential()` - Retrieve credential details
- `revokeCredential()` - Revoke a credential

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**Wallet not connecting?**
- Ensure MetaMask is installed
- Switch to Sepolia network in MetaMask
- Check browser console for errors

**IPFS upload fails?**
- Verify Pinata credentials in `.env`
- Check internet connection
- Ensure API keys are valid

**Smart contract calls failing?**
- Verify contract address is correct
- Check RPC URL is accessible
- Ensure account has sufficient test ETH

**Build errors?**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf dist`
- Check Node.js version

## 📞 Support & Contact

For support, issues, or questions:
- Open an issue on GitHub
- Check existing documentation
- Review error messages in browser console

## 🗺️ Roadmap

- [ ] Multi-chain support
- [ ] Enhanced credential templates
- [ ] Advanced analytics dashboard
- [ ] Mobile native apps
- [ ] Automated testing suite
- [ ] PostgreSQL database integration
- [ ] Advanced access control

## 🙏 Acknowledgments

- Ethereum community
- React and Vite teams
- Ant Design components
- Pinata IPFS service
- All contributors

---

Built with ❤️ for secure, decentralized credential management
