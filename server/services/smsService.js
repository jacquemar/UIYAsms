import axios from 'axios';

class SMSService {
  constructor() {
    this.kannelUrl = process.env.KANNEL_URL || 'http://localhost:13013/cgi-bin/sendsms';
    this.username = process.env.KANNEL_USER || 'sms';
    this.password = process.env.KANNEL_PASS || 'sms';
  }

  async sendSMS(to, text) {
    try {
      const params = new URLSearchParams({
        username: this.username,
        password: this.password,
        to,
        text,
        coding: '2', // Unicode
        charset: 'UTF-8',
        smsc: 'SMSC1'
      });

      const response = await axios.get(`${this.kannelUrl}?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  }

  async sendBulkSMS(numbers, text) {
    const promises = numbers.map(number => this.sendSMS(number, text));
    return Promise.all(promises);
  }
}

export default new SMSService();