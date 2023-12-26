
//   // Controller
// export const getSwapsForUser = async (req, res) => {
//     try {
//         const userId = parseInt(req.params.userId, 10);
//         const swaps = await SwapService.getSwapsForUser(userId);
//         res.status(200).json({ swaps });
//     } catch (error) {
//         console.error('Error getting swap requests:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// // Service
// export const getSwapsForUser = async (userId) => {
//     const swaps = await prisma.swap.findMany({
//         where: {
//             OR: [{ senderId: userId }, { receiverId: userId }],
//         },
//     });
//     return swaps;
// };

// -------------------

//   // Controller
// export const getSwapDetails = async (req, res) => {
//     try {
//         const swapId = parseInt(req.params.swapId, 10);
//         const swap = await SwapService.getSwapDetails(swapId);
//         res.status(200).json({ swap });
//     } catch (error) {
//         console.error('Error getting swap details:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// // Service
// export const getSwapDetails = async (swapId) => {
//     const swap = await prisma.swap.findUnique({ where: { id: swapId } });
//     return swap;
// };


// ----------------

//   // Controller
// export const acceptSwap = async (req, res) => {
//     try {
//         const swapId = parseInt(req.params.swapId, 10);
//         const updatedSwap = await SwapService.updateSwapStatus(swapId, 'accepted');
//         res.status(200).json({ message: 'Swap request accepted successfully', updatedSwap });
//     } catch (error) {
//         console.error('Error accepting swap request:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// // Service
// export const updateSwapStatus = async (swapId, status) => {
//     const updatedSwap = await prisma.swap.update({
//         where: { id: swapId },
//         data: { status },
//     });
//     return updatedSwap;
// };


// -----------------------

//   // Controller
// export const rejectSwap = async (req, res) => {
//     try {
//         const swapId = parseInt(req.params.swapId, 10);
//         const updatedSwap = await SwapService.updateSwapStatus(swapId, 'rejected');
//         res.status(200).json({ message: 'Swap request rejected successfully', updatedSwap });
//     } catch (error) {
//         console.error('Error rejecting swap request:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// // Service
// // (Same service function as acceptSwap)
// ----------------------


//   // Controller
// export const cancelSwap = async (req, res) => {
//     try {
//         const swapId = parseInt(req.params.swapId, 10);
//         const updatedSwap = await SwapService.updateSwapStatus(swapId, 'canceled');
//         res.status(200).json({ message: 'Swap request canceled successfully', updatedSwap });
//     } catch (error) {
//         console.error('Error canceling swap request:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// // Service
// // (Same service function as acceptSwap)


// ---------------

//   // Controller
// export const completeSwap = async (req, res) => {
//     try {
//         const swapId = parseInt(req.params.swapId, 10);
//         const updatedSwap = await SwapService.updateSwapStatus(swapId, 'completed');
//         res.status(200).json({ message: 'Swap request completed successfully', updatedSwap });
//     } catch (error) {
//         console.error('Error completing swap request:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// // Service
// // (Same service function as acceptSwap)
