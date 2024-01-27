export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  location: string;
  imageURL: string;
  userId: number;
  user?: User;
}

export interface Swap {
  id: number;
  senderId: number;
  receiverId: number;
  sentItemId: number;
  receivedItemId: number;
  status: string;
  receivedItem: Item;
  sentItem: Item;
}
