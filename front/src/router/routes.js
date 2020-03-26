/**
 * Created by yanyue on 2020/3/15 16:41
 */
const Layout = () => import('@/views/layout/Layout');
//const NoFound = () => import('@/views/error-pages/404NoFound1');
const NoFound = () => import('@/views/error-pages/404NoFound2');
/**
 * hidden: true                   如果hidden为true则在左侧菜单栏不展示
 * name:'router-name'             路由名称，必须填写
 * meta : {
    title: 'title'               对应路由在左侧菜单栏的标题名称
    icon: 'icon-class'           对应路由在左侧菜单栏的图标样式，样式使用fontawesome图标库
    roles:[xxx,xxx]              可以访问该路由的用户权限，没有该属性的话就是谁都可以访问
  }
 **/

export const constantRoutes = [
    //重定向路由放在第一位
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect/Redirect')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/Login'),
        hidden: true
    },
    {
        path: '/register',
        component: () => import('@/views/register/Register'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/Home'),
                name: 'Home',
                meta: {title: '首页', icon: 'el-icon-s-home'}
            }
        ]
    },
    //404错误页面
    {
        path: '/404',
        name: 'noFound',
        component: NoFound,
    },
];

export const asyncRoutes = [

    {
        path: '/video',
        component: Layout,
        name: 'Video',
        redirect: '/video/videoManage',
        meta: {title: '视频', icon: 'fa fa-video-camera',roles:["editor","admin"]},
        children: [
            {
                path: '/video/videoManage',
                component: () => import('@/views/videoManage/VideoManage'),
                name: 'VideoManage',
                meta: {title: '视频管理', icon: 'fa fa-video-camera',roles:["editor","admin"]}
            },
            {
                path: '/video/videoPlay',
                component: () => import('@/views/videoManage/VideoPlay'),
                name: 'VideoPlay',
                meta: {title: '视频播放', icon: 'fa fa-video-camera',roles:["editor","admin"]}
            }
        ]
    },
    {
        path: '/book',
        component: Layout,
        name: 'Book',
        redirect: '/book/createbook',
        meta: {title: '图书管理', icon: 'el-icon-notebook-2',roles:["editor","admin"]},
        children: [
            {
                path: '/book/createbook',
                component: () => import('@/views/book/CreateBook'),
                name: 'CreateBook',
                meta: {title: '上传图书', icon: 'el-icon-edit',roles:["editor","admin"]}
            },

        ]
    },
    {
        path: '/form', name: 'form',
        redirect: '/forminput',
        meta: {title: '表单类型', icon: 'fa fa-wpforms'},
        show: true,
        component: Layout,
        children: [
            {
                path: '/form/forminput',
                name: 'forminput',
                meta: {title: '表单输入', icon: 'fa  fa-pencil-square-o'},
                component: () => import('@/views/form/FormInput'),
            },
            {
                path: '/form/formdate',
                name: 'formdate',
                meta: {title: '日期格式輸入', icon: 'fa fa-calendar'},
                component: () => import('@/views/form/FormDate'),
            },
            {
                path: '/form/formtable',
                name: 'formtable',
                meta: {title: '表格', icon: 'fa fa-table'},
                component: () => import('@/views/form/FormTable'),
            },
            {
                path: '/form/formrules',
                name: 'formrules',
                meta: {title: '表单校验', icon: 'fa fa-wpforms'},
                component: () => import('@/views/form/FormRules'),
            },

        ]
    },
    {
        path: '/user',
        component: Layout,
        name: 'User',
        redirect: '/user/userManage',
        children: [
            {
                path: '/user/userManage',
                component: () => import('@/views/userManage/UserManage'),
                name: 'UserManage',
                meta: {title: '用户管理', icon: 'el-icon-s-custom',roles:["admin"]}
            }
        ]
    },

    // 404一定要放到最后面，不然会被之前的拦截掉
    { path: '*', redirect: '/404', hidden: true }


];
