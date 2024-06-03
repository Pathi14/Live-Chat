import { Injectable } from '@nestjs/common';
import { Message } from './models/message.model';
import { NewMessageInput } from './dto/new-message.input';



const messages: Message[] = [];


@Injectable()
export class MessagesService {
    async addMessage(data: NewMessageInput): Promise<Message> {
        const message: Message = {
          ...data,
          id: `message#${messages.length + 1}`,
          creationDate: new Date(),
        };
    
        messages.push(message);
    
        return message;
      }
    
      async getMessages(): Promise<Message[]> {
        return messages;
      }
}
