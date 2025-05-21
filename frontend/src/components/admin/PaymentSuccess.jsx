import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import Navbar from '../shared/Navbar';

const PaymentSuccess = () => {
  const { applicationId } = useParams();

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        const res = await axios.put(`${APPLICATION_API_END_POINT}/applications/mark-paid/${applicationId}`);
        if (res.data.success) {
          toast.success("Payment successful and status updated!");
        }
      } catch (err) {
        toast.error("Failed to update payment status.");
      }
    };

    if (applicationId) {
      updatePaymentStatus();
    }
  }, [applicationId]);

  return (
    <>
    <Navbar />
      <div className="mt-20 text-center text-green-500" style={{paddingBottom:"75.8vh"}}>
        <h2 className="text-3xl font-bold">✅ Payment Successful!</h2>
        <p className="mt-4 text-lg">Thanks for your payment. Status has been updated.</p>
      </div>
    </>
  );
};

export default PaymentSuccess;
