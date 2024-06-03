import { Injectable } from '@nestjs/common';
import { Message } from './models/message.model';
import { NewMessageInput } from './dto/new-message.input';
import { users } from 'src/users/users.service';

const messages: Message[] = [];

@Injectable()
export class MessagesService {
  async addMessage(data: NewMessageInput): Promise<Message> {
    const message: Message = {
      content: data.content,
      id: `message#${messages.length + 1}`,
      receiver: users.find((user) => user.id === data.receiverId),
      sender: users.find((user) => user.id === data.senderId),
      creationDate: new Date(),
    };

    messages.push(message);

    return message;
  }

  async getMessages(): Promise<Message[]> {
    return messages;
  }
}
