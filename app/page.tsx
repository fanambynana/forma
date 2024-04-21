'use client'

import { useEffect, useState } from "react";
import { ContactSchema } from "../pages/api/contactType";
import "./style.css"

const Home = () => {
    const [contact, setContact] = useState<ContactSchema[]>([]);
    const [loaded, setLoaded] = useState<Boolean>(false);

    useEffect(() => {
        async function fetchContacts() {
            try {
                const response = await fetch("/api/read-contact");
                const data = await response.json();
                setContact(JSON.parse(data));
                setLoaded(true);
            } catch (error) {
                console.log(error);
            } 
        }
        fetchContacts();
    }, []);

    let showContacts;
    
    if (contact.length == 0) {
        showContacts = <div>No contacts ...</div>
    } else {
        showContacts = contact.map((e) => {
            return (
                <div key={e.email}>
                    <div>
                        <p>{">"} {e.name} -- {e.email} -- {e.telNumber}</p>
                        <p>Message : {e.message}</p>
                    </div>
                </div>
            );
        });
    }
    

    return (
        <>
            <div id="contain-contacts">
                {
                    !loaded ? <h1>Loading ...</h1> : 
                    <>  
                        <h1>List of all contacts :</h1>
                        {showContacts}
                    </>
                }
                
            </div>
        </>
    );
}

export default Home;