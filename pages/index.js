import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import React from "react";

// const DUMMY_MEETUPS = [
//     {
//         id: "m1",
//         title: "A first meetup",
//         image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//         address: "Some address 5, 12345 Some City",
//         dsecription: "This is the first meetup"
//     },
//     {
//         id: "m2",
//         title: "A second meetup",
//         image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//         address: "Some address 5, 123456789-047574365348 Some City",
//         dsecription: "This is the second meetup"
//     }
// ];

function HomePage(props) {
  //const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //     //send http request
  //     setLoadedMeetups(DUMMY_MEETUPS);
  // },[]);

  return (
    <div>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </div>
  );
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     //will not run during build, but always on the server after deployment
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://siddhanth:12345@cluster0.n1ehjhy.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups.meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  // const req = context.req;
  // const res = context.res;

  //always on the server, never on the client
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;

//useEffect works such a way that it executes after the component function executes
//the array will be empty and then the useEffect executs which then sets the array
//which then rerenders the component

//why?
//if it fetched from backend, users might see a loadingSPinner which may not be the
//UI exp we wanted. Here the component is rendered twice which impacts the performance

//nextJs does not wait for the data to be fetched to then return the
//fully rendered page. It returns the first compoennt render cycle which could be
//an empty page.

//PAGE PRE-RENDERING
