/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.UserInfo | undefined }) {
  const { currentUser } = initialState || {};
  // console.log(currentUser)
  return {
    canAdmin: currentUser && currentUser.id === 4,
  };
}
