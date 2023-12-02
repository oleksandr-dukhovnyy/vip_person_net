export default function checkUserStructure(user: Client.Info) {
  return [
    user.user_id,
    user.actions,
    user.role,
    user.data,
    user.data?.name,
    user.data?.email,
    user.name,
    user.email,
  ].every((field) => field !== undefined);
}
