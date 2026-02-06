import fs from 'fs';
import initSqlJs from 'sql.js';

export async function getConnection(file) {
    const fileBuffer = fs.readFileSync(file);
    const SQL = await initSqlJs();
    const db = new SQL.Database(fileBuffer);
    await runQuery(db, 'PRAGMA foreign_keys = ON;');
    return db;
}

export async function runQuery(db, sqlStatement, params) {
    const response = db.exec(sqlStatement, params);

    if (response.length) {
        const [{ columns, values }] = response;

        return values.map((record) =>
            columns.reduce((o, f, index) => {
                o[columns[index]] = record[index];
                return o;
            }, {})
        );
    } else {
        return [];
    }
}

export function getRows(stmt) {
    const rows = [];
    while (stmt.step()) {
        const row = stmt.getAsObject();
        rows.push(row);
    }
    stmt.free();
    return rows;
}

export async function commit(db) {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync("db/node_api_exercise.sqlite", buffer);
}
