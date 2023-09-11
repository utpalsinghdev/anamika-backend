import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import axios from 'axios';

@Injectable()
export class MailService {
  async sendSms(createMailDto: CreateMailDto) {
    const api = process.env.SMSAPIKEY

   
    try {
      const response = await axios.post(process.env.FASTSMS_API,{

        "route" : "q",
        "message" : createMailDto.message,
        "flash" : 0,
        "numbers" : createMailDto.numbers,
        }, {
          headers:{
            Authorization:api
          }
        });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  }

}

