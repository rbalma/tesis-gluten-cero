import ScrollToAnchor from '@/routes/ScrollToAnchor';
import { Banner, ServicesSection, RecipesSection, MapSection, NoticesSection, IntroductionSection, InformationSection } from './ui';
import { ContactForm } from '@/components/HomeSections/Contact/ContactForm';

const HomePage = () => {
	return (
		<>
			<ScrollToAnchor />
			<Banner />
			<IntroductionSection />
			<InformationSection />
			<ServicesSection />
			<NoticesSection />
			<RecipesSection />
			<MapSection />
			<ContactForm />
		</>
	);
};

export default HomePage;
