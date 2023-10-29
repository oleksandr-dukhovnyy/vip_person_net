import useAPIClient from './getAPIClient';

const client = useAPIClient();

async function fetchActionsWithItems() {
  try {
    const { data, error } = await client.from('actions').select(`
        *,
        actions_items(action_id)
      `);

    if (error) {
      console.error('Error fetching data:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

const actionsAPI = {
  LOAD_MY_ACTIONS() {
    return fetchActionsWithItems();
  },
};

export default actionsAPI;
