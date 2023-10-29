import useAPIClient from './getAPIClient';

const client = useAPIClient();

const userAPI = {
  async LOAD_USER_DATA(): Promise<API.Response<User.ActionsList | null>> {
    const res = {
      data: null,
      error: {
        name: 'unknown',
        status: 0,
        message: 'unknown',
      },
      ok: false,
      status: 0,
    };

    const actions = await client.from('actions').select('*');

    // res.data = actions[0];

    console.log('LOAD_USER_DATA', actions);

    return res;
  },
};

export default userAPI;
