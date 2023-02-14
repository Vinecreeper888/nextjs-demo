import { MongoClient } from "mongodb";
//dont create react components
//instead, this contains functions that run on the server as it contains server
//side code. Since this code is run only on the server and never exposed
//to clientside, these functions are triggered whenever a request is sent to 
//this route

//api/new-meetup
//POST api/new-meetup
async function handler(req,res) {
    if(req.method === "POST") {
        const data = req.body;
    
        const client = await MongoClient.connect("mongodb+srv://siddhanth:12345@cluster0.n1ehjhy.mongodb.net/meetups?retryWrites=true&w=majority")
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message: "Meetup inserted!"}); //insert success
    }
}

export default handler;







// try {
// }
// catch(e) {
//     console.log(e.message);
// }
//username:siddhanth
//password:12345