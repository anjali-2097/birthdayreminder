import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
  import { useState, useEffect } from "react";
  import axios from "axios";

function Home() {
    const [Info,setInfo] = useState([]);
    useEffect(()=>{
      const getusers = async() =>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}get_details`).then((response) => {
          setInfo(response.data.data); 
        }
        )
      }
      getusers();
    },[])
  
    
    function Today(person){
      let currentDay = new Date().getDate();
      let currentMonth = new Date().getMonth()+1;
  
      let filter = person.filter(data => {
        
          let day = new Date(data.date_of_birth).getDate()+1;
          let month = new Date(data.date_of_birth).getMonth()+1;
          
          return currentDay === day && currentMonth === month;
      })
      return filter;
  }
  
  // upcoming birthdays
  function Upcoming(person, toMonth){
    let currentMonth = new Date().getMonth()+1;
    let currentDay = new Date().getDate();
  
    let filter =person.filter(data => {
        let month = new Date(data.date_of_birth).getMonth();
        let day = new Date(data.date_of_birth).getDate();
  
        if (currentDay === day) return true;
        return month >= currentMonth && month <= currentMonth + toMonth;
    })
  
    return filter;
  
  }
  
  // how old the person is
  function Old(personAge){
    let year = new Date(personAge).getFullYear();
    let currentYear = new Date().getFullYear();
  
    let age = currentYear - year;
   return age;
  }
    return (
      <>
      <div className="container mx-auto">
        <h1 className="mb-2 mt-0 text-4xl font-medium leading-tight text-primary pb-8 pt-4 text-center">Birthday Reminder</h1>
      <Tabs value="Today">
        <TabsHeader>
            <Tab key="Today" value="Today" className="font-medium">
            Today
            </Tab>
            <Tab key="Upcoming" value="Upcoming" className="font-medium">
            Upcoming
            </Tab>
          
        </TabsHeader>
        <TabsBody >
      
        <TabPanel key="Today" value="Today" className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3">
        {Today(Info).length===0 ? 'No birthday today' : Today(Info).map(person=>{
          return(
            <>
  <Card className="w-56 flex bg-green-200" key={person._id}>
        <CardHeader floated={false} className="h-40">
          <img src={`${process.env.REACT_APP_SERVER_URL}static/${person.image}`} alt=""/>
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {person.name}
          </Typography>
          <Typography color="blue" className="font-medium" textGradient>
            {Old(person.date_of_birth)} years old
          </Typography>
        </CardBody>
      </Card>
            </>
          )
        })}
      </TabPanel>
  
      <TabPanel key="Upcoming" value="Upcoming" className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3">
        {Upcoming(Info,2).length===0 ? 'No upcoming birthdays in next 2 months' : Upcoming(Info,2).map(person => {
          
          return (
            <>
            <Card className="w-56 flex bg-amber-200" key={person._id}>
          <CardHeader floated={false} className="h-40">
            <img src={`${process.env.REACT_APP_SERVER_URL}static/${person.image}`} alt=""/>
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {person.name}
            </Typography>
            <Typography color="blue" className="font-medium" textGradient>
              {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC"}).format(new Date(person.date_of_birth))}
            </Typography>
            <Typography color="blue" className="font-medium" textGradient>
              {Old(person.date_of_birth)} years old
            </Typography>
          </CardBody> 
        </Card>
            </>
          )
        })}
        
      </TabPanel>
         
        </TabsBody>
      </Tabs>
  </div>
      </>
      
     
    );
}

export default Home