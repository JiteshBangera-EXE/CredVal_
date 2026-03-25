import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { CONTRACT_ADDRESS, SEPOLIA_CHAIN_ID } from '../blockchain/config';
import ABI from '../blockchain/abi.json';

export async function getContract() {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    return contract;
  } catch (error) {
    console.error('Get contract error:', error);
    throw error;
  }
}

export async function issueCertificate(hash) {
  try {
    if (CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
      console.warn('Contract address not set. Returning mock transaction hash.');
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return '0x' + '1'.repeat(64); // Mock transaction hash
    }

    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    const tx = await contract.issueCertificate(hash);
    const receipt = await tx.wait();
    return receipt.transactionHash;
  } catch (error) {
    console.error('Issue certificate error:', error);
    throw error;
  }
}

export async function verifyCertificate(hash) {
  try {
    if (CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
      console.warn('Contract address not set. Returning mock "Not Found" result.');
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        issuer: '0x0000000000000000000000000000000000000000',
        timestamp: 0,
        isValid: false
      };
    }

    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    const result = await contract.verifyCertificate(hash);
    return result;
  } catch (error) {
    console.error('Verify certificate error:', error);
    throw error;
  }
}

export async function connectWallet() {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    // Check if already connected
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });

    if (accounts.length > 0) {
      return accounts[0];
    }

    // Request account access
    const response = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    // Request to switch to Sepolia
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        // Chain not added, request to add it
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: SEPOLIA_CHAIN_ID,
              chainName: 'Sepolia Testnet',
              rpcUrls: [import.meta.env.VITE_SEPOLIA_RPC_URL],
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
              },
            },
          ],
        });
      } else {
        throw switchError;
      }
    }

    return response[0];
  } catch (error) {
    console.error('Connect wallet error:', error);
    throw error;
  }
}
