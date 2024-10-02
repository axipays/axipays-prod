import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/404NotFound";
import './styles/global.css';

import FullScreenLoader from './components/FullScreenLoader.jsx'

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
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
