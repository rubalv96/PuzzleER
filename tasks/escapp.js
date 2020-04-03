console.log("Init task: Update Escapp library");

const {resolve} = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');

const app_path = resolve(__dirname, '../app');
const escapp_library_path = resolve(__dirname, '../../escapp_client');

if(!fs.existsSync(escapp_library_path)){
  //Abort
  console.log("Escapp library not found");
  return;
}

let commands = [];
commands.push('cd ' + escapp_library_path + ' && npm run production');
commands.push('cp ' + escapp_library_path + '/dist/escapp.js ' + app_path + '/vendors/escapp.js');
commands.push('cp ' + escapp_library_path + '/dist/escapp.css ' + app_path + '/vendors/css/escapp.css');
commands.push('cp ' + escapp_library_path + '/dist/images/* ' + app_path + '/assets/images/');

for(let i=0; i<commands.length; i++){
	console.log("Executing command");
	console.log(commands[i]);
	let stdout = execSync(commands[i]);
	console.log(`${stdout}`);
}

console.log("Task finished");