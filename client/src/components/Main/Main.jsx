import Total from "../Total/Total";
import styles from "./styles.modules.css";


const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
				<Total/>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			
		</div>
	);
};

export default Main;
