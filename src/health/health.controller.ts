import { Database } from "common/database/Database";

export async function checkHealth() :Promise<boolean> {
    const database = Database.get();
    try {
        await database.raw('SELECT 1=1');
        return true;
    } catch(error) {
        console.log(error);
    }
    return false;
}