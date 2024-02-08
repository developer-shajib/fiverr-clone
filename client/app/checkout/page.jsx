import CheckoutPage from '@/components/checkout/CheckoutPage.jsx';

function Checkout({ params, searchParams }) {
  return (
    <>
      <CheckoutPage
        gigId={searchParams?.gigId}
        getClientSecret={searchParams?.clientSecret}
      />
    </>
  );
}

export default Checkout;
