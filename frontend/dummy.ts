export const users = [
  {
    id: "user#1",
    name: "Paul-Henry",
  },
  {
    id: "user#2",
    name: "Pavone",
  },
  {
    id: "user#3",
    name: "Elizabeth Smith",
  },
  {
    id: "user#4",
    name: "John Smith",
  },
];

export const conversations = [
  {
    id: "conversation#1",
    users: [users[0], users[1]],
    messages: [
      {
        id: "message#1",
        sender: users[0],
        receiver: users[1],
        content: "Bonjour !",
      },
      {
        id: "message#2",
        sender: users[1],
        receiver: users[0],
        content: "Salut, ça va ?",
      },
    ],
  },
  {
    id: "conversation#2",
    users: [users[0], users[2]],
    messages: [
      {
        id: "message#3",
        sender: users[0],
        receiver: users[2],
        content: "Yooooo",
      },
      {
        id: "message#4",
        sender: users[2],
        receiver: users[0],
        content: "Yo, ça va ?",
      },
    ],
  },
];
