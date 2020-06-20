import request from "./request"

// 封装常用得业务接口
//封装登录接口
export function login(info) {
    return request({
        url: "/login",
        method: 'post',
        data: info
    })
}

/**
 * 用户列表接口
 */

export function getUser(params) {
    return request({
        url: 'users',
        method: 'get',
        params
    })
}

/**
 * 修改用户状态接口
 */

export function modifyUserStaus(user) {
    return request({
        url: `users/${user.id}/state/${user.mg_state}`,
        method: 'put'
    })
}

/**
 * 编辑用户信息
 */
export function editUserInfo(userid, data) {
    return request({
        url: `users/${userid}`,
        method: 'put',
        data
    })
}

// 添加用户
export function adduserData(data) {
    return request({
        url: `users`,
        method: 'post',
        data
    })
}

/**
 * 删除单个用户
 */
export function deleteUser(userid) {
    console.log('要删除的用户id:', userid);
    return request({
        url: `users/${userid}`,
        method: 'delete'
    })
}
/**
 * 获取用户角色名的思路：
 * 1.通过用户id查询到角色id
 * 2.再通过角色id查询到角色名
 */

/**
 * 通过用户id查询到角色id
 * @param {number} userid 
 */
export function getUserInfo(userid) {
    return request({
        url: `users/${userid}`,
        method: 'get'
    })
}


/**
 * 通过角色id查询到角色名
 * @param {number} roleId 
 */
export function getUserRoleInfo(roleId) {
    return request({
        url: `roles/${roleId}`,
        method: 'get'
    })
}


/**
 * 分配用户角色   用户名（张三）--用户角色（董事长，总经理）--用户权限（ 财务，添加用户，管理订单）
 * users/:id/role
 */
export function setUserRole(userId, data) {
    return request({
        url: `users/${userId}/role`,
        method: 'put',
        data
    })
}

/**
 * 获取角色列表
 */
export function getRoleList() {
    return request({
        url: `roles`,
        method: 'get'
    })
}

//获取用户权限列表
export function getRightList(userid) {
    return request({
        url: `rights/list`,
        method: 'get'
    })
}

// 树形结构的数据
export function getRightTree(userid) {
    return request({
        url: `rights/tree`,
        method: 'get'
    })
}

/**
 * 分配权限给某个角色
 * @params { number } roleId 角色id
 * @params {string} data 是全部或部分选中的id  '1,2,2,3,5,6,7,7,8'
 */
export function setRightToRole(roleId, data) {
    console.log(roleId)
    console.log(data)
    return request({
        url: `roles/${roleId}/rights`,
        method: 'post',
        data
    })
}

//商品列表接口
export function goodsList(params) {
    return request({
        url: `goods`,
        method: 'get',
        params
    })
}

// 获取商品分类得接口
export function getGoodCate(type=3) {
    return request({
        url: `categories`,
        method: 'get',
        params:{type}  // 默认为三级分类，通过type来进行更改
    })
}

// 商品指定得三级分类id来确定商品得参数（动态参数，静态参数）
// 动态参数：一次可以配置多个值 many 静态只能设置一个 only
// 请求方式 get 参数sel
export function getCateAttribute(cat_id,type='many') {
    return request({
        url: `categories/${cat_id}/attributes`,
        method: 'get',
        params:{sel:type}  // 默认指定得动态参数，也可由用户传递only来指定静态参数
    })
}

// 获取商品接口
export function addGood(data) {
    return request({
        url: `goods`,
        method: 'post',
        data
    })
}

// 数据统计图的接口
export function getReportChart(data) {
    return request({
        url: `reports/type/1`,
        method: 'get',
        data
    })
}
