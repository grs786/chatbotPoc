export interface MessageReaction {
    id: number;
    emoji: string;
  }
  
export interface Message  {
    audio?: string; 
  }
  
 export interface Reactions {
    [key: string]: string[]; // Stores reactions for each message by message _id
  }
//  export interface IVehicleInfo {
//   model: string;
//   vinNumber: string;
//   connected: boolean;
// }
  
 export interface IVehicleInfo {
  vin: string,
  model: string,
  modelyear: string,
  transmission: string,
  engine: string,
  connected?: boolean,       
}
  