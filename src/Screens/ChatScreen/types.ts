export interface MessageReaction {
  id: number;
  emoji: string;
}

export interface Message {
  _id?: string;
  text?: string;
  createdAt?: Date;
  user?: { _id: number; name: string };
  image?: string;
  audio?: string;
}

export interface HistoryData {
  step_history?: object;
}

export interface Reactions {
  [key: string]: string[];
}
export interface IVehicle {
  vehicleInfo: IVehicleInfo;
  onPress: () => void;
  onVehicleTabPress: () => void;
}

export interface IVehicleInfo {
  vin?: string;
  model?: string;
  modelyear?: string;
  transmission?: string;
  engine?: string;
  connected?: boolean;
}

export interface IFeedbackArray {
  id: string; // create from mobile_end uuid
  forId: string; //QuestionID
  value: string;
  comment: string;
}
