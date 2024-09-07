export interface AuthState {
  isAuthenticated: boolean;
  user: any;
  users: any[];
}

export interface AppState {
  app: AuthState;
}
