declare const SUPABASE_URL: string;
declare const SUPABASE_KEY: string;

declare namespace Client {
  // TODO: add types for client
  export interface ActionsList {
    data: Action[];
    id: number;
    color: string;
  }

  export interface Action {
    value: string;
    date: string;
    name: 'put' | 'withdrawal' | 'round-end' | 'open';

    //
    id?: ActionsList['id'];
    color?: ActionsList['color'];
    x?: number;
    y?: number;
  }

  export interface Info {
    id: number; // 1
    created_at: string; // '2022-01-01T16:13:33+00:00';
    data: {
      login: string; // 'Jobopopo1';
      email: string; // 'feat@vip-person.net';
      name: string; // 'script1';
    };
    user_id: string; // '07893d2d-c26e-49fb-a67f-************';
    actions: ActionsList[];
    role: string; // 'admin';
    depo: number; // 1000;
    adds: number; // 200;
    percent: string; // 12;
    name: string; // 'Jobopopo';
    email: string; // 'lebitoh943@ehstock.com';
  }

  export interface InviteCode {
    code: string;
    comment: string;
    created_at: string;
    loading: boolean;
  }
}

declare namespace Chart {
  export type Point = [number, number]; // [x, y]

  export type PointData = {
    id: number;
    color: string;
    value: number;
    x: number;
    y?: number;
  };

  export interface YearColumn {
    points: Client.Action[];
    yName: string; // '01'
    x: number;
    y?: number;
  }

  export interface DataToRender {
    base: {
      maxValue: number;
      minValue: number;
    };

    columns: YearColumn[];
  }
}
