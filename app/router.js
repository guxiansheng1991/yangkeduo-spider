'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/alibaba', controller.saveImg.alibaba);
  router.get('/saveImg', controller.saveImg.index);
};
