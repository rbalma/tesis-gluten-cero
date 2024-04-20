import ScrollToAnchor from '@/routes/ScrollToAnchor';
import { Banner, ServicesSection, RecipesSection, MapSection, NoticesSection } from './ui';
import { ContactForm } from '@/components/HomeSections/Contact/ContactForm';
import Footer from '../../layout/home/ui/Footer';

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
			<Footer />
		</>
	);
};

export default HomePage;
