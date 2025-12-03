class CRUD  {
    constructor(db) {
        this.db = db
    }
    show() {
        return new Promise((resolve, reject) => {
        let view = this.db.all("SELECT * FROM usuarios;", (err, rows) => {
        //console.log(rows)
         resolve(rows) 
         })
        })
    }
    create(nombre, email) {
        //console.log(`recibido en controller ${nombre}, ${email}`)
       
        const create = `INSERT INTO usuarios (nombre, email) VALUES (?, ?)`;
        const params = [nombre, email]
        
         new Promise((resolve) => {
        this.db.run(create, params, () => {
            resolve()
        })
        })
         return this.show()
    }
    ShowById(id) {
        return new Promise((resolve) => {
             const sql = `SELECT * FROM usuarios WHERE id = ?`;
             const params = [id]
             this.db.get(sql, params, (err, row) => {
                console.log(row)
                return resolve(row)
             })
        })
    }

    removeId(id) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM usuarios WHERE id = ?`;
            const params = [id]
            this.db.run(sql, params, () => {
                 resolve({
                    status: 'success',
                    id_borrado: id,
                    filas_afectadas: this.changes
                });
            })
        })
    }
}

export default CRUD