import styles from "./styles.module.css";

const Property = ({property, filterProperty, setFilterProperty }) => {
	const onChange = (event) => {
		const inputValue = event.target.value;
	  
		if (event.target.checked) {
		  setFilterProperty((prevFilterProperty) => [...prevFilterProperty, inputValue]);
		} else {
		  setFilterProperty((prevFilterProperty) =>
			prevFilterProperty.filter((val) => val !== inputValue)
		  );
		}
	  };

	return (
		<div className={styles.container}>
			<h1 className={styles.heading} style={{fontSize:"20px",fontWeight:"600"}}>Filter By Property</h1>
			<div className={styles.genre_container}>
				{property.map((property) => (
					<div className={styles.genre} key={property}>
						<input
							className={styles.genre_input}
							type="checkbox"
							value={property}
							onChange={onChange}
						/>
						<p className={styles.genre_label}>{property}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Property;