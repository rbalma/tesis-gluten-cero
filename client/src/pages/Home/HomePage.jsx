import { Banner, ServicesSection, RecipesSection, MapSection, NoticesSection } from './ui';

const HomePage = () => {
	return (
		<>
			<Banner />
			<ServicesSection />
			<NoticesSection />
			<RecipesSection />
			<MapSection />
		</>
	);
};

export default HomePage;
