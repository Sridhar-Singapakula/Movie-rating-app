import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";

const Select = ({ label, options, handleInputState, placeholder, ...rest }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = ({ currentTarget: input }) => {
    const selectedValue = input.value;
    const selectedName = input.name;

    // Check if the option is already selected
    const isOptionSelected = selectedOption && selectedOption.id === selectedValue;

    let updatedOption;

    if (isOptionSelected) {
      // If already selected, set to null (deselect)
      updatedOption = null;
    } else {
      // If not selected, set the selected option
      updatedOption = { id: selectedValue, name: selectedName };
    }

    // Update the state with the new option
    setSelectedOption(updatedOption);

    // Call the handleInputState function with the updated option
    handleInputState(input.name, updatedOption);
  };

  const handleOutsideClick = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Build the placeholder text based on the selected option
  let updatedPlaceholder = placeholder;

  if (selectedOption) {
    updatedPlaceholder = selectedOption.name;
  }

  return (
    <div className={styles.container} ref={selectRef}>
      <p className={styles.label}>{label}</p>
      <div
        className={`${styles.select} ${isOpen ? styles.open : ""}`}
        onClick={toggleDropdown}
      >
        <div className={styles.placeholder}>{updatedPlaceholder}</div>
        {isOpen && (
          <div className={styles.options}>
            {options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${
                  selectedOption && selectedOption.id === option.id ? styles.selected : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange({ currentTarget: { value: option.id, name: option.name } });
                }}
              ><h6><i class="bi bi-geo-alt" style={{marginRight:"5px",color:"green"}}></i>
              {option.name}</h6>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedOption && (
        <div className={styles.selectedOptions}>
        </div>
      )}
    </div>
  );
};

export default Select;
