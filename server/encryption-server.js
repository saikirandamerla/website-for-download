const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Encryption configuration
const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32; // 256 bits
const IV_LENGTH = 16; // 128 bits for GCM
const AUTH_TAG_LENGTH = 16; // 128 bits

// Generate or use a secret key (in production, store this securely in environment variables)
const SECRET_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(KEY_LENGTH);

/**
 * Encrypts a message with AES-256-GCM
 * Each encryption produces a unique output due to random IV
 * @param {string} plaintext - Message to encrypt
 * @returns {object} - Contains encrypted data, IV, and auth tag
 */
function encryptMessage(plaintext) {
    try {
        // Generate a random IV for this encryption
        // This ensures the same message produces different ciphertext each time
        const iv = crypto.randomBytes(IV_LENGTH);

        // Create cipher
        const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);

        // Encrypt the message
        let encrypted = cipher.update(plaintext, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // Get authentication tag
        const authTag = cipher.getAuthTag();

        // Return encrypted data with IV and auth tag
        // These are needed for decryption
        return {
            success: true,
            encrypted: encrypted,
            iv: iv.toString('hex'),
            authTag: authTag.toString('hex'),
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Encryption failed');
    }
}

/**
 * Decrypts a message encrypted with AES-256-GCM
 * @param {string} encrypted - Encrypted message (hex)
 * @param {string} ivHex - Initialization vector (hex)
 * @param {string} authTagHex - Authentication tag (hex)
 * @returns {object} - Contains decrypted message
 */
function decryptMessage(encrypted, ivHex, authTagHex) {
    try {
        // Convert hex strings back to buffers
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');

        // Create decipher
        const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
        decipher.setAuthTag(authTag);

        // Decrypt the message
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return {
            success: true,
            decrypted: decrypted,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Decryption failed - invalid data or corrupted message');
    }
}

// API Routes

/**
 * POST /api/encrypt
 * Encrypts a message
 * Body: { message: string }
 */
app.post('/api/encrypt', (req, res) => {
    try {
        const { message } = req.body;

        // Validation
        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Message is required and must be a string'
            });
        }

        if (message.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Message cannot be empty'
            });
        }

        // Encrypt the message
        const result = encryptMessage(message);

        // Log for demonstration (remove in production)
        console.log(`[${result.timestamp}] Encrypted message`);
        console.log(`Original: "${message}"`);
        console.log(`Encrypted: ${result.encrypted.substring(0, 50)}...`);

        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * POST /api/decrypt
 * Decrypts a message
 * Body: { encrypted: string, iv: string, authTag: string }
 */
app.post('/api/decrypt', (req, res) => {
    try {
        const { encrypted, iv, authTag } = req.body;

        // Validation
        if (!encrypted || !iv || !authTag) {
            return res.status(400).json({
                success: false,
                error: 'Encrypted message, IV, and auth tag are all required'
            });
        }

        // Decrypt the message
        const result = decryptMessage(encrypted, iv, authTag);

        // Log for demonstration (remove in production)
        console.log(`[${result.timestamp}] Decrypted message successfully`);

        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'Server is running',
        algorithm: ALGORITHM,
        timestamp: new Date().toISOString()
    });
});

/**
 * POST /api/demo
 * Demonstrates that the same message produces different encrypted outputs
 */
app.post('/api/demo', (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                error: 'Message is required'
            });
        }

        // Encrypt the same message 3 times
        const encryption1 = encryptMessage(message);
        const encryption2 = encryptMessage(message);
        const encryption3 = encryptMessage(message);

        // Decrypt all to verify
        const decryption1 = decryptMessage(encryption1.encrypted, encryption1.iv, encryption1.authTag);
        const decryption2 = decryptMessage(encryption2.encrypted, encryption2.iv, encryption2.authTag);
        const decryption3 = decryptMessage(encryption3.encrypted, encryption3.iv, encryption3.authTag);

        res.json({
            success: true,
            message: 'Same message encrypted 3 times with different results',
            original: message,
            encryptions: [
                {
                    encrypted: encryption1.encrypted,
                    iv: encryption1.iv,
                    decrypted: decryption1.decrypted,
                    match: decryption1.decrypted === message
                },
                {
                    encrypted: encryption2.encrypted,
                    iv: encryption2.iv,
                    decrypted: decryption2.decrypted,
                    match: decryption2.decrypted === message
                },
                {
                    encrypted: encryption3.encrypted,
                    iv: encryption3.iv,
                    decrypted: decryption3.decrypted,
                    match: decryption3.decrypted === message
                }
            ],
            note: 'Notice how all 3 encrypted values are different, but all decrypt to the same original message'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log('\n╔══════════════════════════════════════════════════════╗');
    console.log('║     🔐 Encryption Server Started Successfully 🔐     ║');
    console.log('╚══════════════════════════════════════════════════════╝\n');
    console.log(`🌐 Server running on: http://localhost:${PORT}`);
    console.log(`🔒 Algorithm: ${ALGORITHM}`);
    console.log(`📅 Started at: ${new Date().toISOString()}\n`);
    console.log('Available endpoints:');
    console.log(`  ✓ POST http://localhost:${PORT}/api/encrypt`);
    console.log(`  ✓ POST http://localhost:${PORT}/api/decrypt`);
    console.log(`  ✓ POST http://localhost:${PORT}/api/demo`);
    console.log(`  ✓ GET  http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
