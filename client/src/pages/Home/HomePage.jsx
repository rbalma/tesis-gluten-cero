import { Banner, ServicesSection, BackTopButton, RecipesSection, MapSection, NoticesSection } from './ui';

const HomePage = () => {
	return (
		<>
			<Banner />
			<ServicesSection />
			<NoticesSection />
			<RecipesSection />
			<MapSection />
			
			<BackTopButton />
		</>
	);
};

export default HomePage;
