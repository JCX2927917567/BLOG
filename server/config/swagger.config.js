/**
 *@author Crystal
 *@date 2023/12/8 17:00
 *@Description: 配置swagger
 */

 const options = {
    swaggerDefinition: {
        info: {
            title: 'API文档',
            version: '1.0.0',
            description: 'API文档描述'
        },
        host: `${process.env.SWA_HOST}:${process.env.SWA_PORT}`,
        basePath: '/',
        produces: ['application/json', 'application/xml'],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'authorization',
                description: 'token'
            }
        }
    },
    route: {
        url: '/swagger',//打开swagger文档页面地址
        docs: '/swagger.json' //swagger文件 api
    },
    basedir: __dirname, //app absolute path

    files: [  //在那个文件夹下面收集注释
        '../routes/**/**/*.js',
    ]
}

module.exports = options