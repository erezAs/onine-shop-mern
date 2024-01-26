//importing css (attribute of elements e.g background in div) from styled component
import { css } from "styled-components";


//Mobile responsive
//passing a props -> {display : "none"}
export const mobile = (props) =>{

    return css`
    //write @media query when screen is break(shrinks)
    @media only screen and (max-width: 380px){
        ${props}
    }
    `
    }

// can add here more devices responsive such tablet
// export const tablet = (props) =>{...}