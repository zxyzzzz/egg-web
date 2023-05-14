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
  router.post('/logout', controller.login.logout);
  router.post('/register', controller.register.index);
  router.post('/user-edit', controller.userEdit.edit);
  router.post('/useredit', controller.user.edit);
  router.post('/user-query', controller.userEdit.query);
  router.post('/search-user', controller.user.search);
  router.post('/delete-user', controller.user.delete);
  router.post('/add-addr', controller.addAddr.add);
  router.post('/delete-addr', controller.addAddr.delete);
  router.post('/edit-addr', controller.addAddr.edit);
  router.post('/query-addr', controller.addAddr.query);
  router.post('/add-goods', controller.goods.add);
  router.post('/delete-goods', controller.goods.delete);
  router.post('/edit-goods', controller.goods.edit);
  router.post('/search-goods', controller.goods.search);
  router.post('/search-allgoods', controller.goods.searchall);
  router.post('/query-allgoods', controller.goods.queryall);
  router.post('/query-uploadgoods', controller.goods.queryupload);
  router.post('/query-soldgoods', controller.goods.querysold);
  router.post('/add-order', controller.order.add);
  router.post('/query-order', controller.order.query);
  router.post('/query-notreceive_order', controller.order.query_notreceive);
  router.post('/query-notpay_order', controller.order.query_notpay);
  router.post('/query-received_order', controller.order.query_received);
  router.post('/query-allorder', controller.order.queryall);
  router.post('/search-order', controller.order.search);
  router.post('/edit-order', controller.order.edit);
  router.post('/delete-order', controller.order.delete);
  router.post('/upload', controller.file.upload);
  router.get('/download', controller.file.download);
  router.post('/query-alluser', controller.user.query);
  router.post('/query-msg', controller.msg.query);
  router.post('/add-msg', controller.msg.add);
  router.post('/delete-msg', controller.msg.delete);
  router.post('/add-apl', controller.apl.add);
  router.post('/query-apl', controller.apl.query);
  router.post('/pass-apl', controller.apl.pass);
  router.post('/reject-apl', controller.apl.reject);
  router.post('/add-pay-apl', controller.payApl.add);
  router.post('/query-pay-apl', controller.payApl.query);
  router.post('/pass-pay-apl', controller.payApl.pass);
  router.post('/query-shoppingcart', controller.shoppingcart.query);
  router.post('/add-shoppingcart', controller.shoppingcart.add);
  router.post('/delete-shoppingcart', controller.shoppingcart.delete);
};
