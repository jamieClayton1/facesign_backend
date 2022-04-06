const db = require('../database');

/**
 * @author Jamie Clayton
 * Schedule model
 */
class Schedule {
    /**
     * Constructor
     * @param {int} userID 
     * @param {string hh:mm} from 
     * @param {string hh:mm} to 
     * @param {Date} date 
     */
    constructor(userID = null, from = null, to = null, date = null){
        this.userID = userID;
        
        /* If date is provided, created a from and to timestamp*/
        if (date) {
            this.from = new Date(date);
            const fromHours = from.split(':')[0];
            const fromMins = from.split(':')[1];
            this.from.setHours(fromHours);
            this.from.setMinutes(fromMins);
    
            this.to = new Date(date);
            const toHours = to.split(':')[0];
            const toMins = to.split(':')[1];
            this.to.setHours(toHours);
            this.to.setMinutes(toMins);
        }
        
    }

    /**
     * List all schedules in provided date
     * @param {Date} date 
     * @returns {array}
     */
    async list(date){
        /* Assign beginning and start of date provided */
        const dateFrom = new Date(date);
        const dateTo = new Date(dateFrom);
     
        dateTo.setDate(dateFrom.getDate() + 1);

        /* Query database */
        const sql = 'SELECT * FROM schedules WHERE time_from > $1 AND time_from < $2 ORDER BY time_from';
        const response = await db.query(sql, [dateFrom.toLocaleString(), dateTo.toLocaleString()]);
        return response.rows;
    }

    /**
     * Create a schedule
     * @returns {int}
     */
    async create(){
        const addSql = 'INSERT INTO schedules (user_id, time_from, time_to) VALUES ($1, $2, $3) RETURNING id';
        let response = await db.query(addSql, [this.userID, this.from.toLocaleString(), this.to.toLocaleString()]);
        const id = response.rows[0].id;

        return id;
    }
}

/* Export class */
module.exports = Schedule;