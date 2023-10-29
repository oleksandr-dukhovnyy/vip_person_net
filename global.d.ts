import { User as _APIClientUser } from '@supabase/supabase-js';

declare global {
  export const SUPABASE_URL: string;
  export const SUPABASE_KEY: string;

  export type Nullable<T> = T | null;

  export namespace API {
    export interface Response<
      D = void,
      E = { name: string; status: number; message: string },
    > {
      data: D | null;
      error: E;
      ok: boolean;
      status: number;
    }
  }

  export namespace User {
    export type APIClientUser = _APIClientUser;

    export interface User {
      apiClient: Nullable<APIClientUser>;
      name: Nullable<string>;
      email: Nullable<string>;
      deposit: Nullable<Deposit>;

      actions: Nullable<ActionsList>;
    }

    export interface Deposit {
      capital: number;
      adds: number;
      percents: number;
    }

    export type ActionsList = Actions[];

    export interface Actions {
      id: number; // 1
      color: string; // '#5e59ff'
      data: ActionItem[];
    }

    export interface ActionItem {
      date: string; // '2020-01-02T20:07:01.000Z';
      value: string; // '3.00';
      name: 'put';
    }

    export namespace Store {
      export type State = User;

      export interface Mutations {
        SET_NAME(state: State, name: string): void;
        SET_EMAIL(state: State, email: string): void;
        SET_DEPOSIT(state: State, deposit: Deposit): void;
        SET_ACTIONS(state: State, actions: ActionsList): void;
      }

      interface ActionAPI {
        [key: string]: any;
        commit(mutationName: keyof Mutations, payload: any): void;
      }

      export interface Actions {
        AUTO_AUTHENTICATE(api: ActionAPI): Promise<boolean>;
        LOGIN(
          api: ActionAPI,
          email: string,
          password: string
        ): Promise<boolean>;
      }

      export interface Getters {
        AUTHENTICATED(state: State, getters: Getters): boolean;
        NAME(state: State, getters: Getters): Nullable<string>;
        EMAIL(state: State, getters: Getters): Nullable<string>;
        DEPOSIT(state: State, getters: Getters): Nullable<Deposit>;
        ACTIONS(state: State, getters: Getters): Nullable<ActionsList>;
      }
    }
  }
}
