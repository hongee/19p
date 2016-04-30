Notes
===
##!! IMPORTANT !!
- Edit `./app` for Frontend
- `localhost:9000` DOES NOT have access to the Backend
- `localhost:8080` reads from `dist`, and doesn't update without running `gulp`

1. `npm install` - Install Backend/Dev Dependencies
2. `bower install` - Install Frontend Dependencies
3. `gulp serve` - Watch for changes in `/app`, and serves website `localhost:9000`
4. `gulp` - Builds the frontend to `/dist`. Does not serve anything.
5. `npm start` - Serves `/dist` AND the backend.
