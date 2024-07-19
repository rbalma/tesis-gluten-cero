import { Tag } from 'antd';
import { IconCircleCheck, IconCircleX } from '../Icons';

const icon = {
  'open': <IconCircleCheck size={16} />,
  'closed': <IconCircleX size={16} />,
}

const text = {
  'open': 'Abierto',
  'closed': 'Cerrado',
}

export const TagStateThread = ({ state }) => {
  return (
    <Tag
    className='iconBtn'
    icon={icon[state]}
    color={state === 'closed' ? 'warning' : 'success'}>
    {text[state]}
  </Tag>
  )
}
