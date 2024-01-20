export default (title: string, message = '', logLevel: string = 'INFO') => {
  // const obj = {
  //   title,
  //   message,
  //   position,
  // };

  // if (!autoClose) {
  //   obj.duration = 0;
  // }

  // Notification[method](obj);
  alert(`[${logLevel}]:\n${title}\n\n${message}`);
};
