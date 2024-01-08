import styles from "./styles.module.css";

const Bedrooms = ({bedrooms, filterBedrooms, setFilterBedrooms }) => {
	const onChange = (event) => {
		const inputValue = event.target.value;
	  
		if (event.target.checked) {
		  setFilterBedrooms((prevFilterBedrooms) => [...prevFilterBedrooms, inputValue]);
		} else {
		  setFilterBedrooms((prevFilterBedrooms) =>
			prevFilterBedrooms.filter((val) => val !== inputValue)
		  );
		}
	  };

	return (
		<div className={styles.container}>
			<h1 className={styles.heading} style={{fontSize:"20px",fontWeight:"600"}}>Filter By Bedrooms</h1>
			<div className={styles.genre_container}>
				{bedrooms.map((bedrooms) => (
					<div className={styles.genre} key={bedrooms}>
						<input
							className={styles.genre_input}
							type="checkbox"
							value={bedrooms}
							onChange={onChange}
						/>
						<p className={styles.genre_label}>{bedrooms}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Bedrooms;