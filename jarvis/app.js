const readline = require('readline');
const open = require('open').default;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Welcome to Jarvis, your personal assistant!');
console.log('How can I assist you today?');

const sites = {
        'google': {'base': 'https://www.google.com', 'search': '/search?q='},
        'youtube': {'base': 'https://www.youtube.com', 'search': '/results?search_query='},
        'github': {'base': 'https://www.github.com', 'search': '/search?q='},
        'linkedin': {'base': 'https://www.linkedin.com', 'search': '/search/results/all/?keywords='}
    };

rl.on('line', (input) => {
    const cmd = input.toLowerCase().trim();

    const spl = cmd.split(' ');
    const action = spl[0];
    const target = spl[1];
    const query = spl.slice(2).join('+');

    if(action === 'open'){ 
        if(sites[target] && query){
            const url =sites[target].base + sites[target].search + query;
            console.log("Opening...");
            open(url);
        } 
        else if(sites[target]){ 
            console.log("Opening...");
            open(sites[target].base);
        } else {
            console.log(`Sorry, I don't know how to open ${target}`);
        }
    }

    if(cmd.includes('time')){
        const now = new Date().toLocaleTimeString();
        console.log(`The current time is: ${now}`);
    }


});