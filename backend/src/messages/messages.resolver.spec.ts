import { Test, TestingModule } from '@nestjs/testing';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';
import { NewMessageInput } from './dto/new-message.input';


describe('MessagesResolver', () => {
  let resolver: MessagesResolver;
  let service: MessagesService;

  beforeEach(async () => {
    service = { addMessage: jest.fn(), getMessages: jest.fn() } as any;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesResolver,
        { provide: MessagesService, useValue: service },
      ],
    }).compile();

    resolver = module.get<MessagesResolver>(MessagesResolver);
  });

  it('should call addMessage on service with correct value', async () => {
    const newMessageData = new NewMessageInput();
    newMessageData.content = 'Test message';
    await resolver.addMessage(newMessageData);
    expect(service.addMessage).toHaveBeenCalledWith(newMessageData);
  });

  it('should call getMessages on service', async () => {
    await resolver.getMessages();
    expect(service.getMessages).toHaveBeenCalled();
  });
});