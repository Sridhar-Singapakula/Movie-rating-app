import "./search.css"
import React from 'react'

const Search = ({setSearch}) => {
  return (
        <input 
          type="text"
          placeholder="Search for a movie"
          onChange={({currentTarget:input})=>{setSearch(input.value)}}
          className="search"
        />
  )
}

export default Search