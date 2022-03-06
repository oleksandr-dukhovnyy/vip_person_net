import Notification from 'element-ui/lib/notification';

export default (
	title,
	message,
	method = 'success',
	position = 'bottom-right'
) => {
	Notification[method]({
		title,
		message,
		position,
	});
};
