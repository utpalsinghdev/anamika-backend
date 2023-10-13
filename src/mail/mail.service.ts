import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import axios from 'axios';

@Injectable()
export class MailService {
  async sendSms(createMailDto: CreateMailDto) {

    try {
      // const response = await axios.request(options)
      // console.log(response.data);
      return true
    } catch (error) {
      console.error(error);
    }

  }

}

