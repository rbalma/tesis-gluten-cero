import { Tag } from 'antd';
import { IconCircleCheck, IconCircleX, IconExclamationCircle } from '../Icons';

const icon = {
  'success': <IconCircleCheck size={16} />,
  'pending': <IconExclamationCircle size={16} />,
  'error': <IconCircleX size={16} />,
}

const text = {
  'success': 'Aprobada',
  'pending': 'Pendiente',
  'error': 'Rechazada',
}


export const TagStateRecipe = ({ state }) => {
  return (
    <Tag
    className='iconBtn'
    icon={icon[state]}
    color={state === 'pending' ? 'warning' : state}>
    {text[state]}
  </Tag>
  )
}
