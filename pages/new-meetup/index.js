//our-domain.com/new-meetup
import { useRouter } from "next/router";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //console.log(enteredMeetupData);
    const data = await response.json();
    console.log("Coming from new-meetup.js inside new-meetup", data);
    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
