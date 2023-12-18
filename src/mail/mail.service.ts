import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import axios from 'axios';
import mailEnums from 'src/utils/mailEnumbs';



@Injectable()
export class MailService {
  async sendSms(createMailDto: CreateMailDto) {

    let message: string;
    const company = "Mahadev financial Services Pvt. Ltd.";
    const company_full = "Mahadev financial services private limited Dalgreen";
    switch (createMailDto.type) {
      // case mailEnums.WELCOME.toString():
      //   message = `Congratulations ${createMailDto.value?.split("|")[0]} Your Documents has Been Approved By Company ${company} Download your Welcome latter.Your File No is ${createMailDto.value?.split("|")[1]} pass- ${createMailDto.value?.split("|")[2]} Thanks for Choose Us. ${company_full}& templateid=1607100000000293168`;
      //   break;
      case mailEnums.WELCOME.toString():
        message = `Congratulations ${createMailDto.value?.split("|")[0]} Your Documents has Been Approved By Company Mahadev financial Services Pvt. Ltd. your Welcome latter has been generated .Your File No. is ${createMailDto.value?.split("|")[1]} Thanks for Choose Us. Mahadev financial Services Private Limited Dalgreen&templateid=1607100000000293168`;
        break;
      case mailEnums.JOINING.toString():
        message = `Congratulations! ${createMailDto.value?.split("|")[0]} Welcome to ${company} Your Joining has been Accepted By Company.Your Login ID And Password is ${createMailDto.value?.split("|")[1]}, pass - ${createMailDto.value?.split("|")[2]} Thank You. Dalgreen&templateid=1607100000000293167`;
        break;
      // case mailEnums.LOAN_APPLICATION.toString():
      //   message = `Congratulations ${createMailDto.value?.split("|")[0]} Welcome to Caslon Business Services Pvt Ltd.We have received your Application.Your application No.is ${createMailDto.value?.split("|")[1]}. Team will Call You soon Thank you for Choose us.Caslon business Services Private Limited &templateid=1707169995602526224`;
      //   break;b
      case mailEnums.LOAN_APPROVED.toString():
        message = `Congratulations! ${createMailDto.value?.split("|")[0]} Your Documents Has Been Approved and generated your Approval Latter Loan Amount ${createMailDto.value?.split("|")[1]} Rs Sanction by Company ${company} Thanks for Choose Us. ${company_full}& templateid=1607100000000293169`;
        break;
      case mailEnums.INVOICE.toString():
        message = `Dear Customer ${createMailDto.value?.split("|")[0]} Your Processing Fee RS ${createMailDto.value?.split("|")[1]} has be received your Application in process thank you for Choose us.${company_full}& templateid=1607100000000293861`;
        break;
      case mailEnums.WELCOME_INVOICE.toString():
        message = `Dear Customer ${createMailDto.value?.split("|")[0]} Your file charge Payment RS ${createMailDto.value?.split("|")[1]} has be received your Case File in process thank you for Choose us. ${company_full}& templateid=1607100000000293860`;
        break;
    }
    try {
      await axios.get(`http://sms.smsindori.com/http-api.php?username=Mahadevt&password=123456&authentic-key=37364d616861646576743130301702819698&senderid=DALFOD&route=06&number=${createMailDto.numbers}&message=${message}`);
      console.log({
        message,
        value: createMailDto.value,
        numbers: createMailDto.numbers,
        date: new Date().toISOString()
      })
    } catch (error) {
      return true;
    }

  }

}
