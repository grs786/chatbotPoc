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
 export interface IVehicleInfo {
    vehicle: {
        document_ids: []
        wsm_pair: [],
        vehicle_info: {
            vin: string,
            model: string,
            modelyear: string,
            transmission: string,
            engine: string
        }
    },
    session_id:string
}
  