export interface Activity {
  buildStatus?: 'Success' | 'Pending' | 'Error' | 'Building';
  canisterId?: string;
  datetime?: Date;
}
