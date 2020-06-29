'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.saveImg.alibaba);
  router.get('/alibaba', controller.saveImg.alibaba);
  router.get('/pinduoduo', controller.home.pinduoduo);
  router.get('/saveImg', controller.saveImg.index);
};
