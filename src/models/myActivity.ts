export interface MyActivity {
  buildStatus?: 'Success' | 'Pending' | 'Error' | 'Building';
  buildConfigStatus?: 'Save' | 'Delete';
  canisterId?: string;
  datetime?: Date;
}
