export const includeAPIRoutes = (app) =>
    Promise.all([])
        .then((routes) =>
                routes.forEach(route => { route(app); })
            );
