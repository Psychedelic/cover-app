export interface MyActivity {
  buildStatus?: 'Success' | 'Pending' | 'Error' | 'Building';
  buildConfigStatus?: 'Save Config' | 'Delete Config';
  canisterId?: string;
  datetime?: Date;
}
