// import { SUPABASE_URL, SUPABASE_KEY } from '~/types/global.d';
import { createClient } from '@supabase/supabase-js';

const client = createClient(SUPABASE_URL, SUPABASE_KEY);

const useAPIClient = () => client;

export default useAPIClient;
