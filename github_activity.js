const command = process.argv[2];

const url = 'api.github.com';


async function GetUserInfo(username){
    try {
        const response = await fetch(`https://${url}/users/${username}`);
        const data = await response.json();
        console.log(data);
    }    catch (error) {
        console.error('Error fetching user info:', error);
    }
}

async function GetUserActivity(username){
    try {
        const response = await fetch(`https://${url}/users/${username}/events`);
        const data = await response.json();

        data.forEach(event => {
            console.log(`Event Type: ${event.type}, Repo: ${event.repo.name}, Created At: ${event.created_at}`);
        });
    }    catch (error) {
        console.error('Error fetching user activity:', error);
    }
}


async function GetRepos(username){
    try {
        const response = await fetch(`https://${url}/users/${username}/repos`);
        const data = await response.json();

        data.forEach(repo => {
            console.log(`Repository Name: ${repo.name}, URL: ${repo.html_url}`);
        });
    }    catch (error) {
        console.error('Error fetching user repositories:', error);
    }
}

switch(command){
    case 'GetUserInfo':
        const usernameInfo = process.argv[3];
        const info =  GetUserInfo(usernameInfo);
        break;
    case 'GetUserActivity':
        const usernameActivity = process.argv[3];
        GetUserActivity(usernameActivity);
        break;
    case 'GetRepos':
        const usernameRepos = process.argv[3];
        GetRepos(usernameRepos);
        break;
    default:
        console.log('Unknown command. Use "GetUserInfo <username>" or "GetUserActivy <username>".');
}