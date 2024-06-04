import readline from "readline";
import fs from "fs";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const getUsername = async (userId) => {
    const response = await fetch(`https://users.roblox.com/v1/users/${userId}`, {
        method: "GET",
        headers: {
            'accept': 'application/json',
        },
    });
    const data = await response.json();
    return data.name;
};
const getUserGroups = async (userId) => {
    const response = await fetch(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`, {
        method: "GET",
        headers: {
            'accept': 'application/json',
        },
    });
    return response.json();
};
const main = (rl) => {
    rl.question("Input a UserID: ", async answer => {
        const userId = parseInt(answer.trim());
        try {
            const username = await getUsername(userId);
            const groups = await getUserGroups(userId);
            const filename = `${username}-groups.json`;

            fs.writeFileSync(filename, JSON.stringify(groups, null, 2));
            console.log(`File created: ${filename}`);
        } catch (err) {
            console.error(err);
        }
        rl.close();
    });
};

main(rl);
