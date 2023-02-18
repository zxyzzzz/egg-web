'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/post-test', controller.home.postTest);
  router.get('/get-test', controller.home.getTest);
  router.post('/login', controller.login.index);
  router.post('/register', controller.register.index);
  router.post('/user-edit', controller.userEdit.edit);
  router.post('/user-query', controller.userEdit.query);
  router.post('/add-addr', controller.addAddr.add);
  router.post('/delete-addr', controller.addAddr.delete);
  router.post('/edit-addr', controller.addAddr.edit);
  router.post('/query-addr', controller.addAddr.query);
  router.post('/add-goods', controller.goods.add);
  router.post('/delete-goods', controller.goods.delete);
  router.post('/edit-goods', controller.goods.edit);
  router.post('/search-goods', controller.goods.search);
  router.post('/add-order', controller.order.add);
  router.post('/query-order', controller.order.query);
  router.post('/upload', controller.file.upload);
  router.get('/download', controller.file.download);
};
