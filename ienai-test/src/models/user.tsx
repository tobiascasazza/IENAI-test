export type User = {
    id: number;
    name: string;
    created_on: Date;
    modified_on: Date;
    status: 'online' | 'offline' | 'banned';
  };
