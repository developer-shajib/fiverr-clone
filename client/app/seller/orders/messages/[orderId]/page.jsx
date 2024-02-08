import MessageContainer from '@/components/Messages/MessageContainer.jsx';

function SelllerMessage({ params }) {
  return <MessageContainer orderId={params.orderId} />;
}

export default SelllerMessage;
