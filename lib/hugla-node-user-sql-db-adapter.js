"use strict";
const db = require('userDBadapter');
const pg = require('pg');

var knex = require('knex')({
	client: 'pg',
	connection: {
		host     : '127.0.0.1',
		user     : 'your_database_user',
		password : 'your_database_password',
		database : 'myapp_test'
	}
});


const users = [{name: "Jack"}, {name: "Ammi"}, {name: "Klara"}];


/**
 * hugla node user memory db adapter
 */
class HuglaUserSqlDBAdapter extends db {

	/**
	 * Class constructor
	 */
	constructor() {
		super();
	}

	/**
	 * Get existing user
	 *
	 * @param filter
	 */
	get(filter) {
		super.get(filter);
		return knex('users').where(filter).select("*");
	}

	/**
	 * Insert new user
	 *
	 * @param user
	 */
	insert(user) {
		super.insert(user);
		return knex('users').insert(user).returning('id');
	}

	/**
	 * Remove a user
	 *
	 * @param filter
	 */
	remove(filter) {
		super.remove(filter);
		return knex('users').where(filter).del();
	}

	/**
	 *
	 * @param filter
	 * @param user
	 */
	update(filter, user) {
		return knex('users').where(filter).update(user);
	}
}

module.exports = HuglaUserSqlDBAdapter;