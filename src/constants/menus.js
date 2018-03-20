export const menus = [
    { key: '/reportCenter/index', title: '首页', icon: 'rocket' },
    {
        key: '/reportCenter/report', title: '报表管理', icon: 'scan',
        sub: [
            { key: '/reportCenter/report/reportManager', title: '报表配置表', icon: ''},
            { key: '/reportCenter/report/reportSubscibe', title: '报表订阅队列审核', icon: ''}
        ]
    },
    {
        key: '/sub', title: '页面', icon: 'switcher',
        sub: [
            { key: '/register', title: '注册', icon: '' },
            { key: '/404', title: '404', icon: '' }
        ]
    },
];