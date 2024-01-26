import styled from "styled-components";
import Product from "./Product";
import axios from  "axios"
import React,{useState,useEffect} from "react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = (props) => {

  // Take the pass props from parent
  const {category,filters,sort} = props
  // Initial Hooks
  const [products,setProducts] = useState([])
  const [filteredProducts , setFilteredProducts] = useState([])

  // Category UseEffect
  useEffect(() => {
    const getProducts = async () =>{
      try{
        const res = await axios.get(
          category
          ? `http://localhost:3000/api/products?category=${category}`
          : `http://localhost:3000/api/products`,
        )
          setProducts(res.data)
      }catch(e){
        console.log(e)
      }
    };
    getProducts();
  }, [category]);

// Filter useEffect
  useEffect(() => {
    filters &&
    setFilteredProducts(
      //filter the products to filteredProduct array
      //Object.entries(filters) --> [['color','red'],['size','XL']]
      products.filter((product) =>
        Object.entries(filters).every(([key, value]) =>
        product[key].includes(value)
        )
      )
    );
  }, [products, category, filters]) //listen to this changes

// Sort useEffect 
useEffect(() => {
 if(sort === "newest"){
  setFilteredProducts(
    [...filteredProducts].sort((a,b) => a.createdAt - b.createdAt)
  )
 }else if(sort === "asc"){
  setFilteredProducts(
    [...filteredProducts].sort((a,b) => a.price - b.price)
  )
 }else{
  setFilteredProducts(
    [...filteredProducts].sort((a,b) => b.price - a.price)
  )
 }
}, [sort])


return (
    <Container>
      {filters
      ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
      : products.slice(0, 6).map((item) => <Product item={item} key={item._id} />)
      }
    </Container>
  );
};

export default Products;