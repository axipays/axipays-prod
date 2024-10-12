import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// css
import './styles/global.css';

// components
import FullScreenLoader from './components/FullScreenLoader.jsx';
import NotFound from "./components/404NotFound";

// pages
import Auth from './pages/Auth.jsx';
import Website from './pages/website/Landing.jsx';

import Dashboard from "./pages/Dashboard.jsx";
import ManageMerchant from "./pages/ManageMerchant.jsx";
import ViewMerchant from "./pages/ViewMerchant.jsx";
import TransactionMonitoring from "./pages/TransactionMonitoring.jsx";

import AddAcquirer from "./pages/AddAcquirer.jsx";

// lazy loading
const ComingSoon = React.lazy(() => import("./pages/website/comingSoon/ComingSoon"));

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route 
						path="/" 
						element={
							<Suspense fallback={< FullScreenLoader />}>
								<ComingSoon />
							</Suspense>
						} 
					/>
					<Route 
						path="/web" 
						element={
							<Suspense fallback={< FullScreenLoader />}>
								<Website />
							</Suspense>
						} 
					/>
					<Route path="/auth" element={<Auth />} />
					<Route path="/home" element={<Dashboard />} />
					<Route path="/addacquirer" element={<AddAcquirer />} />
					<Route path="/managemerchant" element={<ManageMerchant />} />
					<Route path="/viewmerchant" element={<ViewMerchant />} />
					<Route path="/transactionmonitoring" element={<TransactionMonitoring />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
