import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { load } from '@cashfreepayments/cashfree-js';

const Payment = () => {
   const [amount, setAmount] = useState('');
   const [loading, setLoading] = useState(false);
   const [paymentType, setPaymentType] = useState('');

   const payment = useSelector(state => state?.Payment?.Payment_Info);
   const student = payment?.student;

   const handleInput = e => setAmount(e.target.value);
   const handleTypeChange = e => setPaymentType(e.target.value);

   const handlePayment = async () => {
      if (!amount || Number(amount) <= 0) {
         Swal.fire(
            'Invalid Amount',
            'Please enter a valid payment amount.',
            'warning',
         );
         return;
      }

      if (!student || !payment) {
         Swal.fire('Error', 'Student info not available.', 'error');
         return;
      }

      if (!paymentType) {
         Swal.fire(
            'Error',
            'Please select a Payment Type.',
            'warning',
         );
         return;
      }

      try {
         setLoading(true);

         const payload = {
            order_amount: Number(amount),
            customer_id: student._id || payment._id,
            customer_name:
               `${student.firstName || ''} ${student.lastName || ''}`.trim(),
            customer_phone: student.contactNumber || '',
            customer_email: Array.isArray(student.email)
               ? student.email[0]
               : student.email || '',
            uniqueId: payment.uniqueId,
            studentId: payment.studentId,
            PaymentType: paymentType,
         };

         const res = await axios.post(
            '/api/v1/Student/createOrder',
            payload,
         );

         const cashfree = await load({ mode: 'SANDBOX' });

         console.log('Cashfree object:', cashfree);
         const payment_session_id =
            res?.data?.data?.payment_session_id;
         const order_id = res?.data?.data?.order_id;

         if (!cashfree || typeof cashfree.checkout !== 'function') {
            Swal.fire(
               'Error',
               'Cashfree SDK not loaded properly.',
               'error',
            );
            return;
         }

         if (!payment_session_id) {
            Swal.fire(
               'Error',
               'Payment session ID not received from server.',
               'error',
            );
            return;
         }

         cashfree.checkout({
            paymentSessionId: payment_session_id,
            redirectTarget: '_self',
            oneClickCheckout: true,
            returnUrl: `${import.meta.env.VITE_BACKEND_URL || window.location.origin}/success?order_id=${order_id}`,
            style: {
               theme: 'dark',
               buttonColor: '#28a745',
            },
            container: 'cashfree-checkout',
         });
      } catch (error) {
         console.error('Payment error:', error);
         Swal.fire(
            'Error',
            error?.response?.data?.message ||
               error.message ||
               'Failed to initiate payment',
            'error',
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className='bg-[#FAFAFA] border-x-[0.62px] border-b-[0.62px] border-[#D7D7D79E] p-8 flex flex-col md:flex-row gap-4 md:gap-[2vw] items-center'>
         <select
            className='bg-white border-[1px] border-[#D7D7D79E] rounded-lg px-4 py-3 mb-2 outline-none w-full md:w-[35%]'
            value={paymentType}
            onChange={handleTypeChange}
         >
            <option value=''>Select Payment Type</option>
            <option value='Admission Fee'>Admission Fee</option>
            <option value='Farewell Fee'>Farewell Fee</option>
            <option value='Teacher Day Fee'>Teacher Day Fee</option>
            <option value='Exam Fee'>Exam Fee</option>
            <option value='Semester Fee'>Semester Fee</option>
            <option value='Other'>Other</option>
         </select>

         <input
            className='bg-white border-[1px] border-[#D7D7D79E] rounded-lg px-4 py-3 mr-0 md:mr-4 mb-2 outline-none w-full md:w-auto'
            type='number'
            min='1'
            value={amount}
            onChange={handleInput}
            placeholder='Enter Amount'
         />

         <button
            className='bg-green-600 px-6 py-3 text-white rounded-md font-medium w-full md:w-auto'
            onClick={handlePayment}
            disabled={loading}
         >
            {loading ? (
               <span className='flex items-center gap-2'>
                  <span className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full'></span>
                  Processing...
               </span>
            ) : (
               'Pay Your Fee'
            )}
         </button>
      </div>
   );
};

export default Payment;
