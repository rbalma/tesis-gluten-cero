import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@/components/Icons';
import { ProfileThreadsCard } from '@/components/Profile/Cards';
import { useGetThreads } from '@/services/queries/forumQueries';
import useAuthStore from '@/store/authStore';

import styles from './ProfileThreads.module.css';

export const ProfileTheardsCreatedPage = () => {
  const userProfile = useAuthStore((state) => state.userProfile);
	const { data, isLoading, isSuccess } = useGetThreads({ user: userProfile.id });
  
	return (
		<div className={styles.profileContainer}>
			<header className={styles.profileHeader}>
				<h1>Hilos Creados</h1>
				<Breadcrumb
					className={styles.profileBreadcrumb}
					separator={<IconChevronDown size={16} />}>
					<Breadcrumb.Item>
						<Link to='/'>Inicio</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<Link to='/foro'>Foro</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>Creados</Breadcrumb.Item>
				</Breadcrumb>
			</header>

			<div className={styles.threadList}>
				{isSuccess && !isLoading
					? data.data.map((thread) => (
							<ProfileThreadsCard
								key={thread._id}
								id={thread._id}
								title={thread.title}
								countReply={thread.posts.length}
								countLikes={thread.likes.length}
							/>
					  ))
					: null}
			</div>
		</div>
	);
};
