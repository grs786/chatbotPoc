export interface MessageReaction {
    id: number;
    emoji: string;
  }
  
export interface Message extends IMessage {
    audio?: string; 
  }
  
 export interface Reactions {
    [key: string]: string[]; // Stores reactions for each message by message _id
  }