export default function ({store,error,route ,redirect }) {

	 

	// console.log("中间件的中间件的中间件的中间件的中间件的中间件的"  );
	// console.log(store.state.authUser,"客户端:", process.client,"服务端:" ,process.server);
	if(process.server  & store.state.authUser == null)  {

	}

	if( process.client){
	}
	//  console.log(this)
	// console.log('目前路由:',route.fullPath  )
	//route 此处获取route路由, 限制用户登录
	if(route.fullPath  == '/cart/cart'){// 进入cart.vue 页面要求必须为登录状态
		// console.log("中间件cart/cartcart/cartcart/cart" ,store.state.authUser, process.client ,process.server )
		if (!store.state.authUser) { //未鉴权提示403
		    // error({
		    //   message: 'You are not connected,Bad credentials',
		    //   statusCode: 403
		    // })
		    // console.log(route)
		 //    route.beforeEach((to, from, next) => {
			//   // ...
			//   console.log('我是路由实力')
			//   next('/loginAndRegister/login')
			// })
// 
		     // route.push('/loginAndRegister/login') 

		    return    redirect('/loginAndRegister/login'); //重定向登录页面暂时为根目录
		}
	}else if(route.fullPath  == '/personalCenter/allOrder'){
		if (!store.state.authUser) { //未鉴权提示403
		    // error({
		    //   message: 'You are not connected,Bad credentials',
		    //   statusCode: 403
		    // })
		    return  redirect('/loginAndRegister/login');//重定向登录页面暂时为根目录
		}
	}else if(route.fullPath  == '/cart/payment'){
		if (!store.state.authUser) { //未鉴权提示403
			// console.log("没健全")
		    // error({
		    //   message: 'You are not connected,Bad credentials',
		    //   statusCode: 403
		    // })
		    return  redirect('/loginAndRegister/login');//重定向登录页面暂时为根目录
		}
	}
 

 
}