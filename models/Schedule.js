const db = require('../database');

class Schedule {
    constructor(userID = null, from = null, to = null, date = null){
        this.userID = userID;
        this.from = new Date(date);

        if (date) {
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

    async list(date){
        const dateFrom = new Date(date);
        const dateTo = new Date(dateFrom);
        console.log(dateFrom)
        dateTo.setDate(dateFrom.getDate() + 1);

        const sql = 'SELECT * FROM schedules WHERE time_from > $1 AND time_from < $2 ORDER BY time_from';
        const response = await db.query(sql, [dateFrom.toLocaleString(), dateTo.toLocaleString()]);
        return response.rows;
    }

    async create(){
        const addSql = 'INSERT INTO schedules (user_id, time_from, time_to) VALUES ($1, $2, $3) RETURNING id';
        let response = await db.query(addSql, [this.userID, this.from.toLocaleString(), this.to.toLocaleString()]);
        const id = response.rows[0].id;
    }
}

module.exports = Schedule;