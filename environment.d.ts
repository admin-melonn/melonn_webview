declare namespace NodeJS {
  export interface ProcessEnv {
    readonly SUPABASE_URL: string;
    readonly SUPABASE_ANON: string;
  }
}
