import {Client} from "pg"


const pgClient2 = new Client("psql 'postgresql://neondb_owner:npg_iPRL4I5VXyvY@ep-odd-cherry-a13dagei-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'")



// const pgClient2 = new Client({
//    user: "neondb_owner",
//    password: "npg_iPRL4I5VXyvY",
//    port: 5432,
//    host: "p-odd-cherry-a13dagei-pooler.ap-southeast-1.aws.neon.tech",
//    database:"neondb",
//    ssl: true
// })


async function main(){

    await pgClient2.connect();
    // Example values for username and id
    const newUsername = "TEST2";
    const userId = ""; // Replace with the actual user id

    const response = await pgClient2.query(
        "UPDATE user SET username = $1 WHERE id = $2",
        [newUsername, userId]
    );
    console.log(response.rows);
}

main()