import useCrud from '@/hooks/useCrud'
import { Dropdown, Menu } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notificationsCounter } from '@/appRedux/actions';
import { MoreOutlined } from '@ant-design/icons';
import Traductor from '@/utils/Traductor';

const NotificationReadAll = () => {
  const { id } = useSelector(({ auth }) => auth)

	const { 2: updateAllRead } = useCrud(`/mark-all-read`)

	const dispatch = useDispatch()

  const handleReadClick = async () => {
		await updateAllRead(id)
		dispatch(notificationsCounter(0))
	}
	const markReadOptions = (
		<Menu
			items={[
				{
					key: '1',
					label: (
						<div
							style={{ cursor: 'pointer' }}
							onClick={handleReadClick}
						>
							{Traductor("home.userTopbar.notifications.clean")}
						</div>
					),
				}
			]}
		/>
	);

  return (
    <Dropdown
      trigger={['click']}
      className='gx-mb-0'
      overlay={markReadOptions}
      placement='bottomRight'
    >
      <MoreOutlined style={{ cursor: 'pointer', fontSize: '20px', color: '#5681F0' }} />
    </Dropdown>
  )
}

export default NotificationReadAll