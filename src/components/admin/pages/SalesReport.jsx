import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
// import { PDFDownloadLink, PDFViewer, Document, Page, Text } from '@react-pdf/renderer';
import LayoutAdmin from '../LayoutAdmin'
import { adminUrl } from '../../../API/Api';
import axios from 'axios';

function SalesReport() {
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState([])
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    const filteredOrders = order.filter((order) => {
        const orderDate = new Date(order.date).getTime();
        const start = startDate ? new Date(startDate).getTime() : 0;
        const end = endDate ? new Date(endDate).getTime() : new Date().getTime();
        return orderDate >= start && orderDate <= end;
    });

    useEffect(() => {
        const sales = async () => {
            console.log('Hi');
            // try {
            await axios.post(`${adminUrl}sales-report`).then((response) => {
                console.log(response);
                const orderDetails = response.data
                console.log('orders', orderDetails);
                setOrder(orderDetails)
                // const userId = bookings.user_id
                // const id = bookings._id
                // console.log('userId', id);
                // setUser(userId)
                // setBookingId(id)
                // const details = bookings.orderDetails
                // setOrderDetails(details)
            })
            // } catch (error) {
            //     console.log(error);
            // }
        }
        sales()
    }, [])

    // const MyDocument = ({ data }) => (
    //     <Document>
    //       <Page>
    //         <Text>Order Report</Text>
    //         <Table>
    //           <TableHeader>
    //             <TableCell>Order Id</TableCell>
    //             <TableCell>Customer Name</TableCell>
    //             <TableCell>Place</TableCell>
    //             <TableCell>Mobile</TableCell>
    //             <TableCell>Status</TableCell>
    //             <TableCell>Date</TableCell>
    //             <TableCell>Amount</TableCell>
    //           </TableHeader>
    //           <TableBody>
    //             {data.map((order) => (
    //               <TableRow key={order._id}>
    //                 <TableCell>{order._id}</TableCell>
    //                 <TableCell>{order.formName}</TableCell>
    //                 <TableCell>{order.place}</TableCell>
    //                 <TableCell>{order.formMobile}</TableCell>
    //                 <TableCell>Success</TableCell>
    //                 <TableCell>{order.date}</TableCell>
    //                 <TableCell>{order.totalPrice}</TableCell>
    //               </TableRow>
    //             ))}
    //           </TableBody>
    //         </Table>
    //       </Page>
    //     </Document>
    //   );
      


    return (
        <div>
            <LayoutAdmin>
                {
                    loading ? (
                        <div className='mt-[18rem] ms-64' ><CircularProgress variant="soft" color="info" /></div>
                    ) : (
                        <>
                            <body className='mt-[7rem]'>
                                <div class="overflow-x-auto">
                                    <div class="inline-block min-w-full">
                                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            {/* <PDFDownloadLink document={<MyDocument data={order} />} fileName="sales-report.pdf">
                                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
                                            </PDFDownloadLink> */}

                                            <h1 className='font-bold text-xl mb-5'>Sales Report</h1>
                                            <div className='flex justify-end mr-5 mb-4'>
                                                <input
                                                    type="date"
                                                    value={startDate}
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                />
                                                <input
                                                    type="date"
                                                    value={endDate}
                                                    onChange={(e) => setEndDate(e.target.value)}
                                                />
                                                <button onClick={() => (filteredOrders)}>Apply</button>
                                            </div>
                                            <table class="min-w-full divide-y divide-gray-200">
                                                <thead class="bg-slate-300">
                                                    <tr>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Order Id
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Customer Name
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Place
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Mobile
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Status
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Date
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Amount
                                                        </th>
                                                    </tr>
                                                </thead>
                                                {order.map((eachOrder) => (
                                                    <tbody class="bg-slate-400 divide-y divide-gray-200">
                                                        {eachOrder.form.map((data) => (
                                                            <tr class="hover:bg-slate-200 transition duration-300">
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="flex items-center">
                                                                        <div class="ml-4">
                                                                            <div class="text-sm font-medium text-gray-900">
                                                                                {data._id}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">{data.formName}</div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">{data.place}</div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">{data.formMobile}</div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">Success</div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">{data.date}</div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">{data.totalPrice}</div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                ))}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </body>
                        </>
                    )
                }
            </LayoutAdmin>
        </div>
    )
}

export default SalesReport
