import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import axios from 'axios';

@Injectable()
export class MailService {
  async sendSms(createMailDto: CreateMailDto) {
    const api = process.env.SMSAPIKEY

    const options = {
      method: 'POST',
      url: 'https://www.fast2sms.com/dev/bulkV2',
      headers: {
            'Content-Type': 'application/json',
        'User-Agent': 'insomnia/2023.5.8',
        Authorization: 'mk4UMJXesxFQ8fOhgT3wWcB1LG9bZu5oPpaVijH7nz2rAvYR0DItlfV6SWMbck0CPTNi7RD18EQhJsu3'
      },
      data: {
        route: 'q',
        message: createMailDto.message,
        flash: 0,
        numbers: createMailDto.numbers
      }
    };
    try {
      const response = await axios.request(options)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  }

}

