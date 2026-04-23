import EventEmitter from 'events';

export type Message = { username: string; text: string; time: Date; roomId: string };
export type Room = { name: string; messages: Message[] };

export const rooms: Record<string, Room> = {
  general: { name: 'General', messages: [] },
  random: { name: 'Random', messages: [] },
};

export const users: string[] = [];
export const emitter = new EventEmitter();
