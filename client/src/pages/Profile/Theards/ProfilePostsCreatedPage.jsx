import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@/components/Icons';
import { ProfilePostsCard } from '@/components/Profile/Cards';
import { useGetPosts } from '@/services/queries/forumQueries';
import useAuthStore from '@/store/authStore';

import styles from './ProfileThreads.module.css';

export const ProfilePostsCreatedPage = () => {
  const userProfile = useAuthStore((state) => state.userProfile);
	const { data, isLoading, isSuccess } = useGetPosts({ user: userProfile.id });
  console.log(data);
	return (
		<div className={styles.profileContainer}>
			<header className={styles.profileHeader}>
				<h1>Posteos Creados</h1>
				<Breadcrumb
					className={styles.profileBreadcrumb}
					separator={<IconChevronDown size={16} />}>
					<Breadcrumb.Item>
						<Link to='/'>Inicio</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<Link to='/foro'>Foro</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>Posteos</Breadcrumb.Item>
				</Breadcrumb>
			</header>

			<div className={styles.postList}>
				{isSuccess && !isLoading
					? data.data.map((post) => (
							<ProfilePostsCard
								key={post._id}
								id={post._id}
								thread={post.thread}
                content={post.content}
							/>
					  ))
					: null}
			</div>
		</div>
	);
};
