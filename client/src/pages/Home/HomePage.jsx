import ScrollToAnchor from '@/routes/ScrollToAnchor';
import { Banner, ServicesSection, RecipesSection, MapSection, NoticesSection } from './ui';
import { ContactForm } from '@/components/HomeSections/Contact/ContactForm';

const HomePage = () => {
	return (
		<>
			<ScrollToAnchor />
			<Banner />
			<ServicesSection />
			<NoticesSection />
			<RecipesSection />
			<MapSection />
			<ContactForm />
		</>
	);
};

export default HomePage;
