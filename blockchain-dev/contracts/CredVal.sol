// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CredVal {
    struct Certificate {
        string hash;
        address issuer;
        uint256 issueDate;
        bool isValid;
    }

    mapping(string => Certificate) public certificates;

    event CertificateIssued(string indexed hash, address indexed issuer, uint256 timestamp);
    event CertificateRevoked(string indexed hash, address indexed issuer);

    function issueCertificate(string memory _hash) public {
        require(certificates[_hash].issueDate == 0, "Certificate already exists");

        certificates[_hash] = Certificate({
            hash: _hash,
            issuer: msg.sender,
            issueDate: block.timestamp,
            isValid: true
        });

        emit CertificateIssued(_hash, msg.sender, block.timestamp);
    }

    function verifyCertificate(string memory _hash) public view returns (address issuer, uint256 timestamp, bool isValid) {
        Certificate memory cert = certificates[_hash];
        return (cert.issuer, cert.issueDate, cert.isValid);
    }
    
    function revokeCertificate(string memory _hash) public {
        require(certificates[_hash].issuer == msg.sender, "Only issuer can revoke");
        require(certificates[_hash].isValid, "Certificate already revoked or does not exist");
        
        certificates[_hash].isValid = false;
        emit CertificateRevoked(_hash, msg.sender);
    }
}
