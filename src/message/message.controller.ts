import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Message APIs")
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    try {
      const message = await this.messageService.create(createMessageDto);
      return {
        success: true,
        message: "Message Sent, We will get back to you soon",
        data: message
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null
      }
    }
  }

  @Get()
  async findAll() {
    try {
      return {
        success: true,
        message: "All Messages",
        data: await this.messageService.findAll()
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null
      }
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.messageService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
  //   return this.messageService.update(+id, updateMessageDto);
  // }

  @Delete(':id')
  async remove(@Param('id', new ValidationPipe({ transform: true })) id: number) {
    try {
      return {
        success: true,
        message: "message deleted !",
        data: await this.messageService.remove(id)
      }
    } catch (err) {

      return {
        success: false,
        message: err.message,
        data: null
      }
    }
  }
}
