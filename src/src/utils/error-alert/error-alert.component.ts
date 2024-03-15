// Libraries
import { notification } from 'antd';

const ErrorAlertComponent = (
  message :string ='Se ha producido un error!',
  description :string ='Intenta nuevamente más tarde o contacta al soporte técnico.'
) => {
  notification.error({
    message,
    description,
  });
}

export default ErrorAlertComponent