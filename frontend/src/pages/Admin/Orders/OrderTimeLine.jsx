import { CheckCircle, Package, Truck, XCircle } from 'lucide-react'
import React from 'react'

const OrderTimeLine = ({orderDetail}) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return (
   <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
           <h2 className="text-lg font-semibold mb-4">Order Timeline</h2>
           <div className="relative">
             <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
             
             <div className="relative mb-4 pl-10">
               <div className="flex items-center">
                 <div className="absolute left-0 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
                   <CheckCircle size={16} />
                 </div>
                 <div>
                   <p className="font-medium">Order Placed</p>
                   <p className="text-sm text-gray-600">{formatDate(orderDetail.createdAt)}</p>
                 </div>
               </div>
             </div>
             
             {(orderDetail.status === 'shipped' || orderDetail.status === 'delivered') && (
               <div className="relative mb-4 pl-10">
                 <div className="flex items-center">
                   <div className="absolute left-0 bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
                     <Truck size={16} />
                   </div>
                   <div>
                     <p className="font-medium">Order Shipped</p>
                     <p className="text-sm text-gray-600">
                       {orderDetail.trackingInfo?.carrier && `Via ${orderDetail.trackingInfo.carrier}`}
                       {orderDetail.trackingInfo?.trackingNumber && ` - Tracking #: ${orderDetail.trackingInfo.trackingNumber}`}
                     </p>
                   </div>
                 </div>
               </div>
             )}
             
             {orderDetail.status === 'delivered' && (
               <div className="relative pl-10">
                 <div className="flex items-center">
                   <div className="absolute left-0 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
                     <Package size={16} />
                   </div>
                   <div>
                     <p className="font-medium">Order Delivered</p>
                     <p className="text-sm text-gray-600">Package delivered successfully</p>
                   </div>
                 </div>
               </div>
             )}
             
             {orderDetail.status === 'cancelled' && (
               <div className="relative pl-10">
                 <div className="flex items-center">
                   <div className="absolute left-0 bg-red-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
                     <XCircle size={16} />
                   </div>
                   <div>
                     <p className="font-medium">Order Cancelled</p>
                   </div>
                 </div>
               </div>
             )}
           </div>
         </div>
  )
}

export default OrderTimeLine