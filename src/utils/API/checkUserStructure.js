export default function checkUserStructure(user) {
  return [
    user.user_id,
    user.actions,
    user.role,
    user.data,
    user.data?.name,
    user.data?.email,
  ].every((field) => field !== undefined);
}
