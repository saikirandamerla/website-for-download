# Encryption Server

## Overview
Secure encryption server using AES-256-GCM that ensures **every message is encrypted uniquely**, even if the same message is encrypted multiple times.

## Features

✅ **Unique Encryption** - Each encryption uses a random Initialization Vector (IV), ensuring the same plaintext produces different ciphertext every time
✅ **AES-256-GCM** - Industry-standard authenticated encryption with Galois/Counter Mode
✅ **Authentication** - Built-in authentication tags prevent tampering
✅ **RESTful API** - Easy-to-use REST endpoints
✅ **Demo Endpoint** - Demonstrates unique encryption of repeated messages

## Installation

```bash
cd server
npm install
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### 1. Encrypt Message
**POST** `/api/encrypt`

**Request Body:**
```json
{
  "message": "Hello World"
}
```

**Response:**
```json
{
  "success": true,
  "encrypted": "a3f5d8c9e2b1...",
  "iv": "1a2b3c4d5e6f...",
  "authTag": "9f8e7d6c5b4a...",
  "timestamp": "2025-12-06T18:00:00.000Z"
}
```

### 2. Decrypt Message
**POST** `/api/decrypt`

**Request Body:**
```json
{
  "encrypted": "a3f5d8c9e2b1...",
  "iv": "1a2b3c4d5e6f...",
  "authTag": "9f8e7d6c5b4a..."
}
```

**Response:**
```json
{
  "success": true,
  "decrypted": "Hello World",
  "timestamp": "2025-12-06T18:00:00.000Z"
}
```

### 3. Demo (Repeated Encryption)
**POST** `/api/demo`

**Request Body:**
```json
{
  "message": "Test Message"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Same message encrypted 3 times with different results",
  "original": "Test Message",
  "encryptions": [
    {
      "encrypted": "unique_encrypted_1...",
      "iv": "random_iv_1...",
      "decrypted": "Test Message",
      "match": true
    },
    {
      "encrypted": "unique_encrypted_2...",
      "iv": "random_iv_2...",
      "decrypted": "Test Message",
      "match": true
    },
    {
      "encrypted": "unique_encrypted_3...",
      "iv": "random_iv_3...",
      "decrypted": "Test Message",
      "match": true
    }
  ],
  "note": "Notice how all 3 encrypted values are different, but all decrypt to the same original message"
}
```

### 4. Health Check
**GET** `/api/health`

**Response:**
```json
{
  "success": true,
  "status": "Server is running",
  "algorithm": "aes-256-gcm",
  "timestamp": "2025-12-06T18:00:00.000Z"
}
```

## How It Works

### Why Every Encryption is Unique

1. **Random IV Generation**: For each encryption, a new random 128-bit Initialization Vector (IV) is generated
2. **IV Affects Ciphertext**: The IV is combined with the plaintext during encryption, making the output unique
3. **IV is Public**: The IV is sent along with the encrypted message (it's not secret)
4. **Decryption Requires IV**: The same IV must be provided during decryption

### Example

```
Message: "Hello World"

Encryption 1:
  IV:        1a2b3c4d...
  Encrypted: x7k9m2n5...

Encryption 2 (same message):
  IV:        9f8e7d6c...  (different IV)
  Encrypted: q3w5e7r9...  (different encrypted output)
```

Even though the message is the same, different IVs produce completely different encrypted outputs!

## Security Notes

⚠️ **Production Deployment:**
1. Set `ENCRYPTION_KEY` environment variable with a secure 32-byte key
2. Use HTTPS in production
3. Implement rate limiting
4. Add authentication/authorization
5. Remove console.log statements
6. Store keys in a secure key management system (e.g., AWS KMS, Azure Key Vault)

## Environment Variables

Create a `.env` file in the server directory:

```env
PORT=3001
ENCRYPTION_KEY=your-32-byte-hex-key-here
```

## Testing with cURL

### Encrypt
```bash
curl -X POST http://localhost:3001/api/encrypt \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello World"}'
```

### Decrypt
```bash
curl -X POST http://localhost:3001/api/decrypt \
  -H "Content-Type: application/json" \
  -d '{
    "encrypted":"your-encrypted-data",
    "iv":"your-iv",
    "authTag":"your-auth-tag"
  }'
```

### Demo
```bash
curl -X POST http://localhost:3001/api/demo \
  -H "Content-Type: application/json" \
  -d '{"message":"Test"}'
```

## Technical Details

- **Algorithm**: AES-256-GCM (Advanced Encryption Standard, 256-bit key, Galois/Counter Mode)
- **Key Length**: 256 bits (32 bytes)
- **IV Length**: 128 bits (16 bytes)
- **Auth Tag Length**: 128 bits (16 bytes)
- **Encoding**: Hexadecimal for transmission

## License

MIT
