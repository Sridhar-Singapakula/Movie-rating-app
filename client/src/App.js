import { Route, Routes, Navigate } from "react-router-dom";

import Main from "./Pages/Main";


function App() {

	return (
		<Routes>
			 <Route path="/" exact element={<Main />} />
		</Routes>
	);
}

export default App;
