import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./App.css";
import Search from "../Search/Search";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";
import Genre from "../Genre/Genre";
import Sort from "../Sort/Sort";

function Total() {
  const [obj, setObj] = useState({})
  const [filterGenre, setFilterGenre] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ sort: "rating", order: "asc" });

  const base_url = "http://localhost:8000/api/movies";
  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const url=`${base_url}?page=${page}&genre=${filterGenre.toString()}&sort=${sort.sort},${sort.order}&search=${search}`
        const { data } = await axios.get(url);
        setObj(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllMovies();
  }, [sort, filterGenre, page, search]);

  return (
    <div className="App">
      <div className="container">
        <div className="head">
          <img src="./images/1.png" alt=""></img>
          <Search setSearch={(search)=>setSearch(search)}/>
        </div>
        <div className="body">    
          <div className="table" >
            <Table movies={obj.movies ? obj.movies : []}/>
            <Pagination
							page={page}
							limit={obj.limit ? obj.limit : 0}
							total={obj.total ? obj.total : 0}
							setPage={(page) => setPage(page)}
						/>
          </div>
          <div className="filter">
          <Sort sort={sort} setSort={(sort) => setSort(sort)} />
						<Genre
							filterGenre={filterGenre}
							genres={obj.genres ? obj.genres : []}
							setFilterGenre={(genre) => setFilterGenre(genre)}
						/>
          </div>
        </div>
      </div>

    </div>
    
  );
}

export default Total;