import useAPIClient from './getAPIClient';

const client = useAPIClient();

const authAPI = {
  async AUTO_AUTH(): Promise<API.Response<User.APIClientUser | null>> {
    const session = await client.auth.refreshSession();

    return {
      data: session.data.user,
      error: {
        name: session.error?.name || 'unknown',
        status: session.error?.status || 0,
        message: session.error?.message || 'unknown',
      },
      ok: session.data.user !== null,
      status: session.error?.status || 200,
    };
  },

  async LOGIN(email: string, password: string) {
    return await client.auth.signInWithPassword({
      email,
      password,
    });
  },
};

export default authAPI;
