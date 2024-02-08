import AuthWrapper from '@/components/AuthWrapper.jsx';
import Companies from '@/components/Landing/Companies.jsx';
import Everything from '@/components/Landing/Everything.jsx';
import FiverrBusiness from '@/components/Landing/FiverrBusiness.jsx';
import HeroBanner from '@/components/Landing/HeroBanner.jsx';
import JoinFiverr from '@/components/Landing/JoinFiverr.jsx';
import PopularServices from '@/components/Landing/PopularServices.jsx';
import Services from '@/components/Landing/Services.jsx';

export const metadata = {
  title: 'Fiverr - Home Page',
  description: 'Fiverr Clone Home page'
};

export default function Home() {
  return (
    <>
      <HeroBanner />
      <Companies />
      <PopularServices />
      <Everything />
      <Services />
      <FiverrBusiness />
      <JoinFiverr />
      <AuthWrapper />
    </>
  );
}
