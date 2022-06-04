const { ObjectId } = require("mongodb");

async function main() {
    const MongoClient = require("mongodb").MongoClient;
    let uri ="mongodb://localhost:27017";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        await listOfDatabases(client);
        // await insertProjectDetails(client, "Platform Development", "CreateNewWorld", "1.01.2025");
        // await findProject(client, "Study");
        // await updateTypeOfProject(client, ["Professor Klyan", "Professor Shin"], ["Professor Sh", "Professor Sh2"] );
        // await removeErrorById(client, {_id:ObjectId("629b655e54a7248d5ffefef3")});
        // await insertNewErrorToTypeOfProject(client,{_id:ObjectId("629a683189a9a037ca17a453")},[{_id:ObjectId("629b677154a7248d5ffeff04")}, {_id:ObjectId("629b83cc54a7248d5ffeff38")}]);
       
       
        console.log("I am connected to the database");
    } catch(error) {
        console.log("Error" +error);
    } finally {
        client.close();
        console.log("The connection was closed");
    }
}
async function listOfDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    databasesList.databases.forEach(db=> {
        console.log("DB Name: " +db.name);
    });
}
async function insertProjectDetails(client,ProjectName,Customer,Presentation) {
    const Project = {
        "Project": ProjectName,
        "Customer": Customer,
        "Presentation": Presentation
    };
    const result = await client.db("PMS").collection("Projects").insertOne(Project);
    console.log(result);
}
async function findProject(client, projectName) {
    const dataProject = await client.db("PMS").collection("Projects").findOne({"name":projectName});
    console.log(dataProject);
}

async function removeErrorById(client,query) {
    const error = await client.db("PMS").collection("Errors").deleteOne(query);
    console.log(error);
}
async function updateTypeOfProject(client, oldTeachers, newTeachers) {
    const result = await client.db("PMS").collection("TypeOfProject").updateOne({_id:ObjectId('6293ca40fa22254e6af40ed0')}, {$set:{'Teachers':newTeachers}});
    console.log(result);
};

async function insertNewErrorToTypeOfProject(client,errors, newError){
    const result = await client.db("PMS").collection("Projects").updateOne({_id:ObjectId("629a683189a9a037ca17a453")}, {$set:{"Errors":newError}},{'upsert':true});
    console.log(result);
}



main();