import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Password } from '../model/password';

@Injectable()
export class PasswordService {
  
  algorithm: string = 'aes-256-ctr';
  secretKey: string = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
  iv: Buffer = crypto.randomBytes(16);
  
  encrypt(text: string): Password {
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    
    return {
      iv: this.iv.toString('hex'),
      content: encrypted.toString('hex')
    };
  }
  
  decrypt(hash: Password): string {
    
    const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, Buffer.from(hash.iv, 'hex'));
    
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    
    return decrpyted.toString();
  }
}
