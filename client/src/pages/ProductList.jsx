import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;


const ProductList = () => {
  // location hook
  const location = useLocation() 
  // split the pathname and take category
  const category = location.pathname.split('/')[2]

  //filters and sort hooks
  const [filters,setFilters] = useState({})
  const [sort,setSort] = useState('newest')

  const filterSelected = (event) =>{
    //onChange set filter state hook
    setFilters(
      {
        ...filters,
        [event.target.name]:event.target.value
      }
    )
  }  

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>{ category }</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
        {/* define name and default selected option , on change run the function filterSelected */}
          <Select defaultValue = {'color'}  name ='color' onChange = {filterSelected}>
            <Option disabled value='color'>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select defaultValue = {'size'}  name ='size' onChange = {filterSelected}>
            <Option disabled value = 'size'>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select defaultValue = {'newest'} onChange = {event => setSort(event.target.value)}>
            <Option value = 'newest'>Newest</Option>
            <Option value = 'asc'>Price (asc)</Option>
            <Option value = 'desc'>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category = {category} filters ={filters} sort={sort}/>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;