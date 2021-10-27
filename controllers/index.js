const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./landing-routes.js');
// generalized api stuff to get the routes set up
router.use('/', homeRoutes);
router.use('/landing', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;
