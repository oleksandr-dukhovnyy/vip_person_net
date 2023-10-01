// import Notification from 'element-ui/lib/notification';

export default (
  title,
  message,
  // method = 'success',
  autoClose = true,
  position = 'bottom-right'
) => {
  const obj = {
    title,
    message,
    position,
  };

  if (!autoClose) {
    obj.duration = 0;
  }

  // Notification[method](obj);
  alert(obj.title);
};
