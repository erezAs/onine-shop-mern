import styled from 'styled-components'

const Container = styled.div`
height: 100vh;
width: 100vw;
background:linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
),url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') 
center;
background-size:cover;
display:flex;
align-items: center;
justify-content: center;
`

const Wrapper = styled.div`
background: white;
width:40%;
padding: 25px;

`

const Title = styled.div`
font-size:24px;
font-weight: 300;
`

const Form = styled.form`
display: flex;
flex-wrap: wrap;

`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  padding: 10px;
  margin:10px 10px 0 5px;
`

const Agreement = styled.span`
font-size: 12px;
margin: 10px 0 0 5px;
`

const Button = styled.button`
width: 40%;
border: none;
background-color:teal;
color: white;
padding: 10px;
margin: 10px 0 0 5px; // top,right,bottom,left
cursor:pointer;
`


const Register = () =>{

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder ='name'/>
                    <Input placeholder ='last name'/>
                    <Input placeholder ='username'/>
                    <Input placeholder ='email'/>
                    <Input placeholder ='password'/>
                    <Input placeholder ='confirm password'/>
                    <Agreement>
                        By creating an account, I consent to the processing of my personal data in accordance with the PRIVACY POLICY
                    </Agreement>
                    <Button> CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )



}

export default Register