import { notification } from 'antd';

const SuccessAlertComponent = (
  message: string = 'Operación exitosa',
  description: string = 'La operación se ha completado con éxito.'
) => {
  notification.success({
    message,
    description,
  });
}

export default SuccessAlertComponent;
