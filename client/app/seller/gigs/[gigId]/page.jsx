import SingleGigEditPage from '@/components/Landing/SingleGigEditPage.jsx';

function SingleGig({ params }) {
  return (
    <>
      <SingleGigEditPage gigId={params?.gigId} />
    </>
  );
}

export default SingleGig;
