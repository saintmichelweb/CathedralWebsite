export interface ServiceSchedule {
    id: number;
    tabTitle: string;
    content: {
      subTitle: string;
      subContent: {
        subSubContents: Array<{
          title: string;
          sunday: [string][];
          monday_friday: [string][];
          tuesday_friday?: [string][];
          saturday: [string][];
        }>;
      };
    };
  }
  