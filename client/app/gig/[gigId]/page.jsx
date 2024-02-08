import SingleGigPage from '@/components/Landing/SingleGigPage.jsx';

export const metadata = {
  title: 'Fiverr - Single Gig',
  description: 'Fiverr Single gig page'
};

function Gig({ params }) {
  return (
    <>
      <SingleGigPage gigId={params.gigId} />
    </>
  );
}

export default Gig;
