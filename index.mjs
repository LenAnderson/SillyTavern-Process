import { Router } from 'express';
import { jsonParser } from '../../src/express-common.js';
import { createRequire } from 'module';
import { spawn } from 'child_process';
const require  = createRequire(import.meta.url);
const path = require('path');
const sanitize = require('sanitize-filename');
const fs = require('fs');



/**
 *
 * @param {Router} router
 */
export async function init(router) {
	router.get('/', jsonParser, (req, res)=>{
		res.send('nothing to see here');
	});
	router.get('/exit', jsonParser, (req, res)=>{
		process.emit('SIGINT');
		res.send('shutting down SillyTavern WebServer');
	});
	router.get('/restart', jsonParser, (req, res)=>{
		spawn(process.argv0, process.argv.slice(1), {
			stdio: 'ignore',
			detached: true,
			shell: true,
		}).unref();
		process.emit('SIGINT');
		res.send('restarting SillyTavern WebServer');
	});
}

export async function exit() {}

const module = {
    init,
    exit,
    info: {
        id: 'process',
        name: 'process',
        description: 'Endpoints to help manage SillyTavern processes.',
    },
};
export default module;
