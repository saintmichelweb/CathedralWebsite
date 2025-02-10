export interface MassTime{
    id: number;
    tabTitle: string;
    content: {
    Sunday: [string, string][]; 
    Monday_Friday: [string, string][]; 
    Saturday: [string, string][];
  };
}