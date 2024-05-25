import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import axios from 'axios';
import mailEnums from 'src/utils/mailEnumbs';


@Injectable()
export class MailService {
  async sendSms(createMailDto: CreateMailDto) {

    let message: string;

    switch (createMailDto.type) {

      case mailEnums.JOINING.toString():
        message = `Congratulations! ${createMailDto.value?.split("|")[0]} Welcome to Fundwisor Finance Business Services Pvt. Ltd. Your Joining has been Accepted By Company. Your EMP ID ${createMailDto.value?.split("|")[1]}, pass-${createMailDto.value?.split("|")[2]} caslon &templateid=1707169985689943172`;
        break;

    }


    try {
      // await axios.get(`http://sms.smsindori.com/http-api.php?username=Caslon&password=123456&authentic-key=33304361736c6f6e3130301700970207&senderid=CASBUS&route=12&number=${createMailDto.numbers}&message=${message}`);
      // console.log({
      //   message,
      //   value: createMailDto.value,
      //   numbers: createMailDto.numbers,
      //   date: new Date().toISOString()
      // })
      return true
    } catch (error) {
      return true;
    }

  }

}
