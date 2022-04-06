const db = require('../database');

/**
 * @author Jamie Clayton
 */
class User {

    /**
     * Constructor
     * @param {string} name 
     * @param {string} email 
     * @param {string} faceDescriptor 
     */
    constructor(name = null, email = null, faceDescriptor = null){
        this.name = name;
        this.email = email;
        this.faceDescriptor = faceDescriptor;
    }
    
    /**
     * List all users
     * @returns array
     */
    async list(){
        const sql = 'SELECT * FROM users';
        const response = await db.query(sql);;
        return response.rows;
    }

    /**
     * Get user by id
     * @param {int} id 
     * @returns array
     */
    async get(id){
        const sql = `
        SELECT users.*, user_face.description
        FROM users 
        LEFT JOIN user_face
        ON users.id = user_face.user_id
        WHERE users.id = $1`;
        const response = await db.query(sql, [id]);
      
        return response.rows;
    }

    /**
     * Create user
     * @returns {bool}
     */
    async create(){
        const usersSql = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id';
        let response = await db.query(usersSql, [this.name, this.email]);
        const id = response.rows[0].id;

        const userFaceSql = 'INSERT INTO user_face (user_id, description) VALUES ($1, $2)'
        let faceResponse = await db.query(userFaceSql, [id, this.faceDescriptor]);

        return faceResponse ? true : false;
    }

    /**
     * Update user
     */
    update(){
        //TODO
    }

    /**
     * Delete user
     */
    delete(){
        //TODO
    }

    /**
     * Log a user verification instance
     * @param {int} id 
     * @returns {bool}
     */
    async logVerification(id){
        const logSql = 'INSERT INTO user_history (user_id, timestamp) VALUES ($1, NOW())';
        const response =  await db.query(logSql, [id]);

        return response ? true : false;
    }
    

}

/* Export class */
module.exports = User;