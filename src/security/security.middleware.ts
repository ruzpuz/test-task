
export function create():Function {
    return function (req, res, next):void {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token) {
        }

        console.log('middleware')
        next();
    }
}

