import MessageContainer from '@/components/Messages/MessageContainer.jsx';

function BuyerMessages({ params }) {
  return <MessageContainer orderId={params.orderId} />;
}

export default BuyerMessages;
