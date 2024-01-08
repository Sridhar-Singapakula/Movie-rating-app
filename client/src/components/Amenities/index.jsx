import styles from "./styles.module.css";

const Amenities = ({amenities, filterAmenities, setFilterAmenities }) => {
	const onChange = (event) => {
		const inputValue = event.target.value;
	  
		if (event.target.checked) {
		  setFilterAmenities((prevFilterAmenities) => [...prevFilterAmenities, inputValue]);
		} else {
		  setFilterAmenities((prevFilterAmenities) =>
			prevFilterAmenities.filter((val) => val !== inputValue)
		  );
		}
	  };

	return (
		<div className={styles.container}>
			<h1 className={styles.heading} style={{fontSize:"20px",fontWeight:"600"}}>Filter By Amenities</h1>
			<div className={styles.genre_container}>
				{amenities.map((amenities) => (
					<div className={styles.genre} key={amenities}>
						<input
							className={styles.genre_input}
							type="checkbox"
							value={amenities}
							onChange={onChange}
						/>
						<p className={styles.genre_label}>{amenities}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Amenities;