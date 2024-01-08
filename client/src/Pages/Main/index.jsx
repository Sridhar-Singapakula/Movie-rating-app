import {React,useEffect,useState } from "react";
import { Link,useHistory} from "react-router-dom";
import Navbar from "../../components/Navbar";
import Select from "../../components/Inputs/Select";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css'
import { toast } from "react-toastify";
// import 'boxicons/css/boxicons.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './style.css';
import test from "../../img/test.jpg";
import AOS from 'aos';
import Property from "../../components/Property"
import Amenities from "../../components/Amenities";
import Bedrooms from "../../components/Bedrooms";

const Main = () => {
  const [fetchedTests,setFetchedTests]=useState({})
  const [cityDa,setCityDa]=useState({})
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterProperty, setFilterProperty] = useState([]);
  const [filterAmenities, setFilterAmenities] = useState([]);
  const [filterBedrooms, setFilterBedrooms] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [startDate, setStartDate] = useState(new Date());

  const handleInputState = (name, value) => {
    if (name === "tests") {
      setSelectedCityId(value.id);
    }
  };
  const fetchOptions = async () => {
    try {
      const url = process.env.REACT_URL;
      const response = await axios.get("https://b8rhomes.onrender.com/api/cities");
      const responseData = response.data;
  
      if (response.status === 200) {
        const transformedTests = responseData.map((test) => ({
          name: test.name,
          id:test._id,
        }));
        setFetchedTests(transformedTests);
      } else {
        console.error('Failed to fetch cities');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const sliderSettings = {
    dots: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000, // Set the interval between slides (in milliseconds)
  };
  useEffect(() => {
    fetchOptions();
    AOS.init({
      duration: 1200,
      });
  }, []);
  


  const handleSubmit = async (e) => {
 
    
    if (selectedCityId) {
      try {
        const response = await axios.get(`https://b8rhomes.onrender.com/api/cities/${selectedCityId}/houses?propertyType=${filterProperty.toString()}&amenities=${filterAmenities.toString()}&bedrooms=${filterBedrooms.toString()}`);
        const cityData = response.data; // This should contain the data for the selected city
        setCityDa(cityData);
      } catch (error) {
        console.error('Failed to fetch data for the selected city:', error);
      }
    }
  };
  useEffect(() => {
    handleSubmit();
  }, [filterProperty,filterAmenities,filterBedrooms]);

  return (
    <div>
        <Navbar/>
    <section id="hero" className="d-flex align-items-center">
      <div className="container" data-aos="zoom-out" data-aos-delay="100">
        <div className="row">
          <div className="col-xl-7">
            <h1>Welcome:<br/><span style={{color:"white"}}>"B8R Homes",<span style={{color:"black"}}>India</span></span></h1>
            <h2>"Discover the perfect blend of comfort, elegance, and exceptional service for your dream getaway."</h2>
            <Link to="/login" className="btn-get-started">About Us</Link>
            <Link to="/Patient" className="btn-buy">Book Your Home</Link>
          </div>
        </div>
      </div>
    </section>
    <section>
              <div className="selection">
                <Select
								name="tests"
                handleInputState={(name, value) => handleInputState("tests", value)}
								label=" Select a City"
								placeholder="City"
								options={fetchedTests}
								value={selectedCityId}
								required={true}
							  />
                 <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="date_"/>
                 <button class="button-5" role="button" style={{marginTop:"50px",background:"#104a46b9",padding:"18px 65px",fontSize:"20px"}}  onClick={handleSubmit}>Search <i class="bi bi-search"></i></button>
              </div>
    </section>
    <h4 className="heading_prop">Properties For Rent</h4>
    <div className="underline">
    </div>
    <section className="houses_section">
     
      <div className="filters">
        {cityDa.propertyTypeOptions ?
        <>
          <Property
							filterProperty={filterProperty}
							property={cityDa.propertyTypeOptions ? cityDa.propertyTypeOptions  : []}
							setFilterProperty={(property) => setFilterProperty(property)}
						/>
      <Amenities
      filterAmenities={filterAmenities}
      amenities={cityDa.amenitiesOptions ? cityDa.amenitiesOptions  : []}
      setFilterAmenities={(amenities) => setFilterAmenities(amenities)}
      />
      <Bedrooms
      filterBedrooms={filterBedrooms}
      bedrooms={cityDa.bedroomsOptions ? cityDa.bedroomsOptions  : []}
      setFilterBedrooms={(bedrooms) => setFilterBedrooms(bedrooms)}
      />
        </>
      
            :(<p>Choose City before applying filters</p>)}
      </div>
    <div  style={{display:"block"}}>
      {cityDa.houses ? (
        cityDa.houses.map((house) => (
      
      <div key={house._id} className="houses">
      <div className="house_img">
        <Slider className="house_img" {...sliderSettings}>
        {house.img.map((image, index) => (
                <img key={index} src={image} alt={`House Image ${index + 1}`} className="gallery_" />
              ))}
        </Slider>
        
      </div>
        <div className="details">
          <h5>{house.name}</h5>
          <p className="subhead">{house.sub}</p>
          <div className="right_">
            <div className="price_">
              <h5>{house.price}<span className="span_">/month</span></h5>
              <p style={{fontSize:"15px"}}>+ Deposit {house.Deposit} months rent</p>
            </div>
            <div className="area_">
              <h5>{house.Area}</h5>
              <p style={{fontSize:"15px"}}>{house.AreaSub}</p>
            </div>
            <div className="area_">
              <h5>{house.bedrooms} <span className="span_"></span></h5>
              <p style={{fontSize:"15px"}}>{house.NoOfBathrooms} Bath</p>
            </div>
          </div>
          <div >
            <p className="high"><span style={{fontWeight:"550",color:"black"}}>Highlights:</span> Park ,Gym,PlayGround</p>
          </div>
          <div className="desc_div">
            <p className="desc">Find this 3 bhk house for rent in doopanahalli, bangalore east. This 3 bhk house comes with 4 bathrooms.</p>
          </div>
          <div className="last">
            <div>
              <p className="last_p">
                1 week Ago
              </p>
              <button class="button-87" role="button">FEATURED DEALER</button>
              <p style={{color:"grey",marginBottom:"-4px"}}>Benaka Enterprises</p>
            </div>
            <div className="last_div">
              <div>
              <button class="button-4" role="button">View Number</button>
              </div>
              <div>
              <button class="button-5" role="button">Contact <i class="bi bi-telephone-fill"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
     
        ))
  ): (
    <h4 style={{textAlign:"center"}}>Choose your city above to get homes </h4>
  )}
  </div>
    </section>
    </div>
  )
}

export default Main
